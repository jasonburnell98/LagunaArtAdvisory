import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase";

// ── Stripe ────────────────────────────────────────────────────────────────────
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
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

    if (!artworkId) {
      console.warn("[Webhook] checkout.session.completed has no artwork_id in metadata.");
      return NextResponse.json({ received: true });
    }

    try {
      const supabase = createServerSupabaseClient();

      const { error } = await supabase
        .from("artworks")
        .update({
          sold: true,
          sold_at: new Date().toISOString(),
          sold_session_id: session.id,
          sold_amount: session.amount_total,
          sold_customer_email: session.customer_details?.email ?? null,
        })
        .eq("id", artworkId);

      if (error) throw error;

      console.log(`[Webhook] ✓ Artwork "${artworkId}" marked as sold in Supabase.`);
    } catch (err) {
      console.error(`[Webhook] Failed to mark artwork "${artworkId}" as sold:`, err);
      // Return 500 so Stripe retries the webhook
      return NextResponse.json({ error: "Database update failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
