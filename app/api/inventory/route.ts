import { NextRequest, NextResponse } from "next/server";

// Deprecated — superseded by /api/artworks which now includes sold status.
// Kept for backwards compatibility: redirects any caller to the canonical route.
// Uses the incoming request's origin so this works in dev, preview, and prod
// without relying on NEXT_PUBLIC_APP_URL being set.
export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/api/artworks", req.url));
}
