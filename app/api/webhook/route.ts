import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { createServerSupabaseClient } from "@/lib/supabase";

// ── Stripe ────────────────────────────────────────────────────────────────────
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// ── Resend ────────────────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAILS = ["Info@lagartadvisory.com", "jasonburnell98@gmail.com"];

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
    // Re-fetch the session with shipping_details + customer_details expanded so
    // we always get the latest, fully-populated address even if the webhook
    // arrives before Stripe attaches everything to the original event payload.
    const sessionStub = event.data.object as Stripe.Checkout.Session;
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionStub.id, {
        expand: ["customer_details", "shipping_details", "payment_intent"],
      });
    } catch (err) {
      console.error("[Webhook] Failed to retrieve session:", err);
      session = sessionStub;
    }

    const artworkId = session.metadata?.artwork_id;

    if (!artworkId) {
      console.warn("[Webhook] checkout.session.completed has no artwork_id in metadata.");
      return NextResponse.json({ received: true });
    }

    try {
      const supabase = createServerSupabaseClient();

      // ── Pull shipping + customer info ────────────────────────────────────
      // Stripe has moved shipping into two places depending on API version:
      //   • session.shipping_details (legacy)
      //   • session.collected_information.shipping_details (newer Checkout)
      // We check both for forward/backward compat.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const collected = (session as any).collected_information?.shipping_details;
      const shipping =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session as any).shipping_details ?? collected ?? null;
      const shippingAddress = shipping?.address ?? null;

      const customer = session.customer_details;
      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null;

      // ── Mark the artwork sold (so the gallery hides it immediately) ──────
      const { error: artworkUpdateError } = await supabase
        .from("artworks")
        .update({
          sold: true,
          sold_at: new Date().toISOString(),
          sold_session_id: session.id,
          sold_amount: session.amount_total,
          sold_customer_email: customer?.email ?? null,
        })
        .eq("id", artworkId);

      if (artworkUpdateError) {
        // Don't bail — the artwork might have been deleted/renamed, but we
        // still want to record the sale in the `sales` table below.
        console.warn(
          `[Webhook] Could not update artworks row for "${artworkId}":`,
          artworkUpdateError.message
        );
      }

      // ── Snapshot the artwork so the sale record stands on its own ────────
      const { data: artwork } = await supabase
        .from("artworks")
        .select("id, title, artist, year, medium, dimensions, sn, image, price")
        .eq("id", artworkId)
        .maybeSingle();

      // ── Insert into sales (idempotent via UNIQUE on stripe_session_id) ───
      const saleRow = {
        artwork_id: artworkId,
        stripe_session_id: session.id,
        stripe_payment_intent_id: paymentIntentId,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: customer?.email ?? null,
        customer_name: customer?.name ?? null,
        customer_phone: customer?.phone ?? null,
        shipping_name: shipping?.name ?? customer?.name ?? null,
        shipping_line1: shippingAddress?.line1 ?? null,
        shipping_line2: shippingAddress?.line2 ?? null,
        shipping_city: shippingAddress?.city ?? null,
        shipping_state: shippingAddress?.state ?? null,
        shipping_postal_code: shippingAddress?.postal_code ?? null,
        shipping_country: shippingAddress?.country ?? null,
        artwork_snapshot: artwork ?? null,
      };

      const { error: saleInsertError } = await supabase
        .from("sales")
        .upsert(saleRow, { onConflict: "stripe_session_id" });

      if (saleInsertError) throw saleInsertError;

      console.log(`[Webhook] ✓ Sale recorded for artwork "${artworkId}" (${session.id}).`);

      // ── Build & send the sale notification email ─────────────────────────
      const artworkLabel = artwork?.title
        ? `"${artwork.title}" by ${artwork.artist}`
        : `${artwork?.artist ?? session.metadata?.artist ?? "Unknown artist"} — ${artwork?.medium ?? ""}`;

      const saleAmount = session.amount_total
        ? `$${(session.amount_total / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
        : "N/A";

      const addressLines = [
        shipping?.name ?? customer?.name,
        shippingAddress?.line1,
        shippingAddress?.line2,
        [shippingAddress?.city, shippingAddress?.state, shippingAddress?.postal_code]
          .filter(Boolean)
          .join(", "),
        shippingAddress?.country,
      ].filter(Boolean);

      const shippingHtml = addressLines.length
        ? addressLines.map((l) => `<div>${l}</div>`).join("")
        : `<div style="color:#b00;">⚠️ No shipping address captured — follow up with the buyer.</div>`;

      await resend.emails.send({
        from: "Laguna Art Advisory <Info@lagartadvisory.com>",
        to: NOTIFY_EMAILS,
        subject: `🎨 Sale Complete: ${artworkLabel}`,
        html: `
          <h2>🎉 A Sale Just Completed</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;">
            <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Artwork</td><td style="padding:6px 12px;">${artworkLabel}</td></tr>
            ${artwork?.dimensions ? `<tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Dimensions</td><td style="padding:6px 12px;">${artwork.dimensions}</td></tr>` : ""}
            ${artwork?.medium ? `<tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Medium</td><td style="padding:6px 12px;">${artwork.medium}</td></tr>` : ""}
            <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Sale Amount</td><td style="padding:6px 12px;">${saleAmount}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Customer Name</td><td style="padding:6px 12px;">${customer?.name ?? "N/A"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Customer Email</td><td style="padding:6px 12px;">${customer?.email ?? "N/A"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Customer Phone</td><td style="padding:6px 12px;">${customer?.phone ?? "N/A"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Ship To</td><td style="padding:6px 12px;">${shippingHtml}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">Stripe Session</td><td style="padding:6px 12px;"><code>${session.id}</code></td></tr>
          </table>
        `,
      });

      console.log(`[Webhook] ✓ Sale notification email sent for artwork "${artworkId}".`);
    } catch (err) {
      console.error(`[Webhook] Failed to record sale for "${artworkId}":`, err);
      // Return 500 so Stripe retries the webhook
      return NextResponse.json({ error: "Sale recording failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
