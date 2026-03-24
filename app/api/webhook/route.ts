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

      // ── Fetch artwork details for the notification email ──────────────────
      const { data: artwork } = await supabase
        .from("artworks")
        .select("title, artist, medium, dimensions, price")
        .eq("id", artworkId)
        .single();

      const artworkLabel = artwork?.title
        ? `"${artwork.title}" by ${artwork.artist}`
        : `${artwork?.artist ?? "Unknown artist"} — ${artwork?.medium ?? ""}`;

      const saleAmount = session.amount_total
        ? `$${(session.amount_total / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
        : "N/A";

      const customerEmail = session.customer_details?.email ?? "N/A";
      const customerName = session.customer_details?.name ?? "N/A";

      // ── Send sale notification email ──────────────────────────────────────
      await resend.emails.send({
        from: "Laguna Art Advisory <Info@lagartadvisory.com>",
        to: NOTIFY_EMAILS,
        subject: `🎨 Sale Complete: ${artworkLabel}`,
        html: `
          <h2>🎉 A Sale Just Completed</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;">
            <tr><td style="padding:6px 12px;font-weight:bold;">Artwork</td><td style="padding:6px 12px;">${artworkLabel}</td></tr>
            ${artwork?.dimensions ? `<tr><td style="padding:6px 12px;font-weight:bold;">Dimensions</td><td style="padding:6px 12px;">${artwork.dimensions}</td></tr>` : ""}
            ${artwork?.medium ? `<tr><td style="padding:6px 12px;font-weight:bold;">Medium</td><td style="padding:6px 12px;">${artwork.medium}</td></tr>` : ""}
            <tr><td style="padding:6px 12px;font-weight:bold;">Sale Amount</td><td style="padding:6px 12px;">${saleAmount}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Customer Name</td><td style="padding:6px 12px;">${customerName}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Customer Email</td><td style="padding:6px 12px;">${customerEmail}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Stripe Session</td><td style="padding:6px 12px;">${session.id}</td></tr>
          </table>
        `,
      });

      console.log(`[Webhook] ✓ Sale notification email sent for artwork "${artworkId}".`);
    } catch (err) {
      console.error(`[Webhook] Failed to mark artwork "${artworkId}" as sold:`, err);
      // Return 500 so Stripe retries the webhook
      return NextResponse.json({ error: "Database update failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
