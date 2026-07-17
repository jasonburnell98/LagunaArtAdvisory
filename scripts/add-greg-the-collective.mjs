#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// One-off: add a new Greg Urquhart piece to the artworks table.
//   • gu-13 — "Flock Mentality — The Collective"  (48x48, $4,200)
//
// Run with:  node scripts/add-greg-the-collective.mjs
// Uses NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Minimal .env.local parser so we don't need to install dotenv.
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

const rows = [
  {
    id: "gu-13",
    title: "Flock Mentality — The Collective",
    artist: "Greg Urquhart",
    year: 2026,
    medium: "Resin on Wood Panel",
    dimensions: "48x48",
    sn: null,
    image: "/artists/greg_urquhart/the_collective.jpeg",
    price: 420000,
    display_order: 57,
  },
];

const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/artworks?on_conflict=id`;
const res = await fetch(url, {
  method: "POST",
  headers: {
    apikey: SERVICE_ROLE,
    Authorization: `Bearer ${SERVICE_ROLE}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  },
  body: JSON.stringify(rows),
});

const text = await res.text();
if (!res.ok) {
  console.error(`❌  Upsert failed (HTTP ${res.status}):`, text);
  process.exit(1);
}

let returned = [];
try { returned = JSON.parse(text); } catch { /* ignore */ }

console.log(`✅  Upserted ${returned.length || rows.length} row(s):`);
for (const row of returned) {
  console.log(`   - ${row.id}  "${row.title}"  ${row.dimensions}  $${(row.price / 100).toFixed(2)}`);
}
