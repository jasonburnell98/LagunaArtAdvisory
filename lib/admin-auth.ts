import { createHmac, timingSafeEqual } from "node:crypto";

// ── Admin credentials ─────────────────────────────────────────────────────────
// Hardcoded defaults; override with ADMIN_USERNAME / ADMIN_PASSWORD env vars
// (recommended in production — set them in Vercel project settings).
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "LagunaGold!2026";

export const SESSION_COOKIE = "laguna_admin_session";

// Deterministic session token derived from the credentials. Stateless — no
// session store needed. Rotating the password invalidates existing sessions.
export function sessionToken(): string {
  return createHmac("sha256", `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`)
    .update("laguna-admin-session-v1")
    .digest("hex");
}

export function verifyCredentials(username: string, password: string): boolean {
  return safeEqual(username, ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD);
}

export function verifySessionToken(token: string | undefined): boolean {
  return typeof token === "string" && safeEqual(token, sessionToken());
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
