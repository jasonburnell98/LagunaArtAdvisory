#!/usr/bin/env node
// Deletes one or more artworks from the Supabase `artworks` table by id.
// Usage:  node scripts/remove-artwork.mjs <id> [<id> ...]
// Example: node scripts/remove-artwork.mjs gu-5
// Uses NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local.

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

// Default to gu-5 ("Chew On This — Pink") if no args provided.
const ids = process.argv.slice(2);
if (ids.length === 0) {
  console.error("Usage: node scripts/remove-artwork.mjs <id> [<id> ...]");
  process.exit(1);
}

const inList = ids.map((id) => `"${id}"`).join(",");
const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/artworks?id=in.(${inList})`;

const res = await fetch(url, {
  method: "DELETE",
  headers: {
    apikey: SERVICE_ROLE,
    Authorization: `Bearer ${SERVICE_ROLE}`,
    Prefer: "return=representation",
  },
});

const text = await res.text();
if (!res.ok) {
  console.error(`❌  Delete failed (HTTP ${res.status}):`, text);
  process.exit(1);
}

let returned = [];
try {
  returned = JSON.parse(text);
} catch {
  /* ignore */
}

if (!returned.length) {
  console.log(`⚠️   No rows matched ids: ${ids.join(", ")} (already removed?)`);
} else {
  console.log(`✅  Deleted ${returned.length} row(s):`);
  for (const row of returned) {
    console.log(`   - ${row.id}  ${row.artist}  "${row.title ?? "(no title)"}"`);
  }
}
