import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

// Returns all artworks ordered by display_order.
// The gallery page fetches this on mount to get live data + sold status.
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("artworks")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(
      { artworks: data ?? [] },
      {
        headers: {
          // 30s cache, stale-while-revalidate keeps it snappy
          "Cache-Control": "public, max-age=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("[Artworks API] Error fetching artworks:", err);
    return NextResponse.json({ artworks: [] }, { status: 500 });
  }
}
