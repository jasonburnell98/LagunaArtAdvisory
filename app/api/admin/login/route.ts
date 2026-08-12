import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  sessionToken,
  verifyCredentials,
  verifySessionToken,
} from "@/lib/admin-auth";

// POST /api/admin/login — check credentials, set the session cookie.
export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!verifyCredentials(body.username ?? "", body.password ?? "")) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
  return res;
}

// GET /api/admin/login — report whether the current session is valid.
export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifySessionToken(token) });
}

// DELETE /api/admin/login — log out.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
