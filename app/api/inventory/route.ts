import { NextResponse } from "next/server";

// This endpoint is superseded by /api/artworks which now includes sold status.
// Kept for backwards compatibility — redirects to the canonical route.
export async function GET() {
  return NextResponse.redirect(new URL("/api/artworks", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
}
