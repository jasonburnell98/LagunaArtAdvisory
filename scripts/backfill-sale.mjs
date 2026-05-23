#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Backfill a sale that wasn't captured by the webhook.
//
// Usage:   node scripts/backfill-sale.mjs <stripe_session_id>
// Example: node scripts/backfill-sale.mjs cs_live_a1oE9kt0rCTkRC4eIHx8UwzIQXPHQdWX10Pnd1Gj2F9aTdZDsVqy9g5IPk
//
// What it does:
//   1. Pulls the full Stripe Checkout Session (with customer + shipping)
//   2. Looks up the artwork (from session.metadata.artwork_id)
//   3. Re-inserts the artwork row if it was deleted (so the gallery sale flag
//      survives in `artworks`), with sold=true
//   4. Upserts a row in the `sales` table — idempotent via stripe_session_id
//
// Reads STRIPE_SECRET_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// from .env.local.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Minimal .env.local parser (no dotenv dependency)
const envPath = resolve(process.cwd(), ".env.local");
try {
  const envText = readFileSync(envPath, "utf8");
  for (const line of envText.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
} catch (err) {
  console.error(`Could not read .env.local at ${envPath}:`, err.message);
  process.exit(1);
}

const SESSION_ID = process.argv[2];
if (!SESSION_ID) {
  console.error(
    "Usage: node scripts/backfill-sale.mjs <stripe_session_id>\n" +
      "Example: node scripts/backfill-sale.mjs cs_live_a1oE9kt0..."
  );
  process.exit(1);
}

// ── Optional manual artwork override (used when the artwork row was deleted
// from the DB and we need to recreate it so it shows up as "sold" again).
// Keyed by artwork_id (matches Stripe session metadata.artwork_id).
const MANUAL_ARTWORK_BACKFILLS = {
  "gu-4": {
    id: "gu-4",
    title: "Flock Mentality — White",
    artist: "Greg Urquhart",
    year: 2025,
    medium: "Resin on Wood Panel",
    dimensions: null,
    sn: null,
    image: "/artists/greg_urquhart/C_white_duck.jpeg",
    price: 45000, // $450 — matches Stripe amount_total
    display_order: 26,
  },
};

const Stripe = (await import("stripe")).default;

// Polyfill global WebSocket for older Node 20 environments so Supabase Realtime doesn't crash
if (typeof globalThis.WebSocket === "undefined") {
  globalThis.WebSocket = class {};
}

const { createClient } = await import("@supabase/supabase-js");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

console.log(`[backfill] fetching Stripe session ${SESSION_ID}…`);
// NB: `shipping_details` is no longer expandable on newer Stripe API versions
// (it's auto-included via `collected_information`). Only expand fields that
// Stripe still allows.
const session = await stripe.checkout.sessions.retrieve(SESSION_ID, {
  expand: ["customer_details", "payment_intent"],
});

if (session.payment_status !== "paid") {
  console.error(
    `[backfill] session is not paid (status: ${session.payment_status}). Aborting.`
  );
  process.exit(1);
}

const artworkId = session.metadata?.artwork_id;
if (!artworkId) {
  console.error("[backfill] session has no metadata.artwork_id. Aborting.");
  process.exit(1);
}

// ── Step 1: ensure the artwork row exists (recreate if deleted) ──────────────
let { data: artwork } = await supabase
  .from("artworks")
  .select("*")
  .eq("id", artworkId)
  .maybeSingle();

if (!artwork) {
  const manual = MANUAL_ARTWORK_BACKFILLS[artworkId];
  if (!manual) {
    console.error(
      `[backfill] artwork "${artworkId}" not in DB and no MANUAL_ARTWORK_BACKFILLS entry. ` +
        `Add one to scripts/backfill-sale.mjs and re-run.`
    );
    process.exit(1);
  }
  console.log(`[backfill] artwork "${artworkId}" missing — recreating from manual override…`);
  const { error: insertErr } = await supabase.from("artworks").insert(manual);
  if (insertErr) {
    console.error(`[backfill] failed to recreate artwork:`, insertErr);
    process.exit(1);
  }
  artwork = manual;
}

// ── Step 2: mark the artwork sold ────────────────────────────────────────────
const { error: updateErr } = await supabase
  .from("artworks")
  .update({
    sold: true,
    sold_at: new Date(session.created * 1000).toISOString(),
    sold_session_id: session.id,
    sold_amount: session.amount_total,
    sold_customer_email: session.customer_details?.email ?? null,
  })
  .eq("id", artworkId);

if (updateErr) {
  console.error(`[backfill] failed to mark artwork sold:`, updateErr);
  process.exit(1);
}
console.log(`[backfill] ✓ artwork "${artworkId}" marked sold.`);

// ── Step 3: upsert into `sales` ──────────────────────────────────────────────
const collected = session.collected_information?.shipping_details;
const shipping = session.shipping_details ?? collected ?? null;
const address = shipping?.address ?? null;
const customer = session.customer_details;
const paymentIntentId =
  typeof session.payment_intent === "string"
    ? session.payment_intent
    : session.payment_intent?.id ?? null;

const { error: saleErr } = await supabase.from("sales").upsert(
  {
    artwork_id: artworkId,
    stripe_session_id: session.id,
    stripe_payment_intent_id: paymentIntentId,
    amount_total: session.amount_total,
    currency: session.currency,
    customer_email: customer?.email ?? null,
    customer_name: customer?.name ?? null,
    customer_phone: customer?.phone ?? null,
    shipping_name: shipping?.name ?? customer?.name ?? null,
    shipping_line1: address?.line1 ?? null,
    shipping_line2: address?.line2 ?? null,
    shipping_city: address?.city ?? null,
    shipping_state: address?.state ?? null,
    shipping_postal_code: address?.postal_code ?? null,
    shipping_country: address?.country ?? null,
    artwork_snapshot: artwork,
    created_at: new Date(session.created * 1000).toISOString(),
  },
  { onConflict: "stripe_session_id" }
);

if (saleErr) {
  console.error(`[backfill] failed to upsert sale:`, saleErr);
  process.exit(1);
}

console.log(`[backfill] ✓ sale recorded.`);
console.log(`           customer: ${customer?.name ?? "(unknown)"} <${customer?.email ?? "?"}>`);
console.log(`           amount:   $${((session.amount_total ?? 0) / 100).toFixed(2)}`);
console.log(
  `           shipping: ${address?.line1 ? `${address.line1}, ${address.city}, ${address.state} ${address.postal_code}` : "(none captured — Stripe didn't ask)"}`
);
console.log(`\nDone.`);
