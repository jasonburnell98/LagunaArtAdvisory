import { createClient } from "@supabase/supabase-js";

// ── Server-side client ────────────────────────────────────────────────────────
// Uses the service role key — full DB access, bypasses RLS.
// Only use in API routes / server actions. Never expose this to the browser.
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Check your .env.local file."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// ── Database types ────────────────────────────────────────────────────────────
export type ArtworkRow = {
  id: string;
  title: string | null;
  artist: string;
  year: number | null;
  medium: string;
  dimensions: string | null;
  sn: string | null;
  image: string;
  price: number | null; // USD cents; null = inquire to purchase
  sold: boolean;
  sold_at: string | null;
  sold_session_id: string | null;
  sold_amount: number | null;
  sold_customer_email: string | null;
  display_order: number;
  created_at: string;
};
