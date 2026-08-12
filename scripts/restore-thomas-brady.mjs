#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// One-off: restore the 12 Thomas Brady works removed from the artworks table
// in May 2026 (commit bcc6cd7). Display orders re-assigned to 58–69 so he
// appears after the current roster.
//
// Run with:  node scripts/restore-thomas-brady.mjs
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
  { id: "tb-1",  title: "Curve in the Road",             artist: "Thomas Brady", year: 2020, medium: "Oil/Panel", dimensions: "34x53",   sn: null, image: "/artists/thomas_brady/curve_in_the_road_34x53_2020.jpg",          price: 730000, display_order: 58 },
  { id: "tb-2",  title: "BV by Hardee's",                artist: "Thomas Brady", year: 2025, medium: "Oil/Panel", dimensions: "35x47",   sn: null, image: "/artists/thomas_brady/bv_by_hardees_35x47.jpg",                   price: 686000, display_order: 59 },
  { id: "tb-3",  title: "Lady at Hardees",               artist: "Thomas Brady", year: 2025, medium: "Oil/Panel", dimensions: "42x32",   sn: null, image: "/artists/thomas_brady/lady_at_hardees_42x32.jpg",                 price: 630000, display_order: 60 },
  { id: "tb-4",  title: "Landscape with Telephone Pole", artist: "Thomas Brady", year: 2017, medium: "Oil/Panel", dimensions: "30x43.5", sn: null, image: "/artists/thomas_brady/landscape_with_telephone_pole_30x43.5.jpg", price: 630000, display_order: 61 },
  { id: "tb-5",  title: "Olney Couple",                  artist: "Thomas Brady", year: 2023, medium: "Oil/Panel", dimensions: "44x50.5", sn: null, image: "/artists/thomas_brady/olney_couple_44x50.5.jpg",                  price: 770000, display_order: 62 },
  { id: "tb-6",  title: "Rita's",                        artist: "Thomas Brady", year: 2024, medium: "Oil/Panel", dimensions: "39x45",   sn: null, image: "/artists/thomas_brady/ritas_by_walgreens_39x45.jpg",              price: 700000, display_order: 63 },
  { id: "tb-7",  title: "Stewardburg Road",              artist: "Thomas Brady", year: 2025, medium: "Oil/Panel", dimensions: "31x47",   sn: null, image: "/artists/thomas_brady/stewardburg_road_31x47.jpg",                price: 660000, display_order: 64 },
  { id: "tb-8",  title: "Striped Fields",                artist: "Thomas Brady", year: 2019, medium: "Oil/Panel", dimensions: "38x51",   sn: null, image: "/artists/thomas_brady/striped_fields_19_38x51.jpg",               price: null,   display_order: 65 },
  { id: "tb-9",  title: "The DC Highway",                artist: "Thomas Brady", year: 2016, medium: "Oil/Panel", dimensions: "31x42.5", sn: null, image: "/artists/thomas_brady/the_dc_highway_31x42.5.jpg",                price: 620000, display_order: 66 },
  { id: "tb-10", title: "The Lexington Restaurant",      artist: "Thomas Brady", year: 2023, medium: "Oil/Panel", dimensions: "42x40",   sn: null, image: "/artists/thomas_brady/the_lexington_restaurant_42x40_23.jpg",     price: 680000, display_order: 67 },
  { id: "tb-11", title: "The Train Station",             artist: "Thomas Brady", year: 2024, medium: "Oil/Panel", dimensions: "35x47",   sn: null, image: "/artists/thomas_brady/the_train_station_35x47.jpg",               price: 686000, display_order: 68 },
  { id: "tb-12", title: "VMI",                           artist: "Thomas Brady", year: 2023, medium: "Oil/Panel", dimensions: "35x45",   sn: null, image: "/artists/thomas_brady/vmi_35x45_23.jpg",                          price: 670000, display_order: 69 },
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
  const price = row.price === null ? "POA" : `$${(row.price / 100).toFixed(2)}`;
  console.log(`   - ${row.id}  "${row.title}"  ${row.dimensions}  ${price}`);
}
