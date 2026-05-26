#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// One-off patch:
//   • gu-9 (white piece): title  → "Flock Mentality — White Edition"
//   • gu-7 (acid green):  dimensions → "16x20"
//
// Run with:  node scripts/patch-greg-edits.mjs
// Uses NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Minimal .env.local parser (no dotenv dependency).
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

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const base = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/artworks`;

const patches = [
  { id: "gu-9", body: { title: "Flock Mentality — White Edition" } },
  { id: "gu-7", body: { dimensions: "16x20" } },
];

for (const { id, body } of patches) {
  const res = await fetch(`${base}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: SERVICE_ROLE,
      Authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`❌  PATCH ${id} failed (HTTP ${res.status}):`, text);
    process.exit(1);
  }

  let returned = [];
  try { returned = JSON.parse(text); } catch { /* ignore */ }

  if (!returned.length) {
    console.error(`⚠️   PATCH ${id} matched 0 rows — is the id correct?`);
    process.exit(1);
  }

  const row = returned[0];
  console.log(`✅  ${id} updated → title="${row.title}", dimensions="${row.dimensions}"`);
}

console.log("\nDone.");
