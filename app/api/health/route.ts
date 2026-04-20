import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Health / keepalive endpoint.
//
// Purpose:
//   • Supabase pauses free-tier projects after ~7 days of inactivity.
//   • A Vercel cron (see vercel.json) pings this route once a day, which runs a
//     tiny query against the `artworks` table. That single query is enough to
//     register as "activity" and keep the project warm indefinitely.
//   • Doubles as a real health check — you can curl it to confirm that the
//     frontend ↔ Supabase connection is alive in production.
//
// Response:
//   200 { ok: true,  supabase: "up",   count: <n>, ts: <iso> }
//   500 { ok: false, supabase: "down", error: <msg>, ts: <iso> }
// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic"; // never cache — we want every hit to reach Supabase

export async function GET() {
  const ts = new Date().toISOString();

  try {
    const supabase = createServerSupabaseClient();

    // HEAD + exact count is the cheapest possible round-trip that still
    // touches the table (so Supabase counts it as real activity).
    const { count, error } = await supabase
      .from("artworks")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json(
      { ok: true, supabase: "up", count: count ?? 0, ts },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Health] Supabase check failed:", message);
    return NextResponse.json(
      { ok: false, supabase: "down", error: message, ts },
      { status: 500 }
    );
  }
}
