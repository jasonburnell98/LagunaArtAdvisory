import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Redis } from "@upstash/redis";

// ── Stripe ────────────────────────────────────────────────────────────────────
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// ── Upstash Redis ─────────────────────────────────────────────────────────────
// Env vars are auto-populated when you connect Upstash from the Vercel dashboard.
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Stripe sends the raw body — we MUST NOT parse it as JSON before verifying.
export async function POST(req: NextRequest) {
  if (!stripe) {
    console.error("[Webhook] Stripe not configured.");
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error("[Webhook] Missing stripe-signature header or STRIPE_WEBHOOK_SECRET.");
    return NextResponse.json({ error: "Missing signature or secret." }, { status: 400 });
  }

  // Read raw body as text for signature verification
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("[Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // ── Handle checkout.session.completed ────────────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const artworkId = session.metadata?.artwork_id;

    if (artworkId) {
      if (redis) {
        // Store sold record in Redis hash: { artworkId → JSON blob }
        await redis.hset("sold_artworks", {
          [artworkId]: JSON.stringify({
            soldAt: new Date().toISOString(),
            sessionId: session.id,
            amountTotal: session.amount_total,
            customerEmail: session.customer_details?.email ?? null,
          }),
        });
        console.log(`[Webhook] ✓ Marked ${artworkId} as sold in inventory.`);
      } else {
        // Redis not configured — log the sale but don't crash
        console.warn(
          `[Webhook] Redis not configured. Artwork ${artworkId} sold but NOT marked in inventory. ` +
            "Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to env vars."
        );
      }
    } else {
      console.warn("[Webhook] checkout.session.completed has no artwork_id in metadata.");
    }
  }

  return NextResponse.json({ received: true });
}
