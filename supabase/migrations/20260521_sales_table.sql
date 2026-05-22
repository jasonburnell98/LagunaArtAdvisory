-- ─────────────────────────────────────────────────────────────────────────────
-- Laguna Art Advisory — Sales table
-- Persistent record of every completed Stripe checkout.
--
-- Why a separate table (and not just columns on `artworks`)?
--   • If an artwork row is ever deleted/edited, the sale history survives.
--   • Lets us record multiple sales against the same conceptual artwork
--     (e.g. editions / re-listings) without overwriting prior sales.
--   • `artwork_snapshot` stores a JSON copy of the artwork at sale time so we
--     always know exactly what was sold even if the listing later changes.
--
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sales (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Reference (no FK — we want sales to survive artwork deletion)
  artwork_id                TEXT,

  -- Stripe linkage
  stripe_session_id         TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id  TEXT,

  -- Amounts (USD cents)
  amount_total              INTEGER,
  currency                  TEXT,

  -- Customer
  customer_email            TEXT,
  customer_name             TEXT,
  customer_phone            TEXT,

  -- Shipping address
  shipping_name             TEXT,
  shipping_line1            TEXT,
  shipping_line2            TEXT,
  shipping_city             TEXT,
  shipping_state            TEXT,
  shipping_postal_code      TEXT,
  shipping_country          TEXT,

  -- Snapshot of the artwork at time of sale (title/artist/medium/etc.)
  artwork_snapshot          JSONB,

  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS sales_artwork_id_idx       ON sales (artwork_id);
CREATE INDEX IF NOT EXISTS sales_customer_email_idx   ON sales (customer_email);
CREATE INDEX IF NOT EXISTS sales_created_at_idx       ON sales (created_at DESC);

-- Lock it down: only the service role (webhooks / scripts) can read/write.
-- The gallery never needs sales data client-side.
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
-- (No policies defined → anon role has zero access. Service role bypasses RLS.)
