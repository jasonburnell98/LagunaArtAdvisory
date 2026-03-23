import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Returns the list of sold artwork IDs so the gallery can mark them.
// If Redis isn't configured yet, returns an empty sold list (gallery shows all as available).
export async function GET() {
  if (!redis) {
    return NextResponse.json(
      { sold: [] },
      {
        headers: {
          // Short cache so sold state updates quickly after a sale
          "Cache-Control": "public, max-age=30, stale-while-revalidate=60",
        },
      }
    );
  }

  try {
    const soldMap = (await redis.hgetall("sold_artworks")) ?? {};
    const soldIds = Object.keys(soldMap);

    return NextResponse.json(
      { sold: soldIds },
      {
        headers: {
          "Cache-Control": "public, max-age=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("[Inventory] Redis error:", err);
    // Fail gracefully — return empty so gallery still works
    return NextResponse.json({ sold: [] });
  }
}
