#!/usr/bin/env node
// Inserts (upserts) the Scott Troxel + Thomas Brady rows into Supabase.
// Run with:  node scripts/sync-new-artists.mjs
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

// ── New rows ────────────────────────────────────────────────────────────────
// Dimensions are H x W x D (inches) for sculptures, H x W for paintings.
// price is in USD cents. NULL => inquire to purchase.
const rows = [
  // ── Scott Troxel (11 works) ───────────────────────────────────────────────
  { id: "st-1",  title: "Two Two",     artist: "Scott Troxel", year: 2026, medium: "Pigmented lacquer and enamel on solid birch",              dimensions: "20x11x1.75",    sn: null, image: "/artists/scott_troxel/two_two.jpg",        price: 180000, display_order: 28 },
  { id: "st-2",  title: "Flowmeter",   artist: "Scott Troxel", year: 2024, medium: "Pigmented satin lacquer on solid maple",                    dimensions: "14.5x9.75x2",   sn: null, image: "/artists/scott_troxel/flowmetermain.jpg",  price: 210000, display_order: 29 },
  { id: "st-3",  title: "Lomi",        artist: "Scott Troxel", year: 2026, medium: "Epoxy resin and mica powder on poplar",                     dimensions: "23x12x2",       sn: null, image: "/artists/scott_troxel/lomi_main.jpg",      price: 270000, display_order: 30 },
  { id: "st-4",  title: "Metro",       artist: "Scott Troxel", year: 2026, medium: "Pigmented lacquer on poplar",                               dimensions: "11.25x12x2",    sn: null, image: "/artists/scott_troxel/metro.jpg",          price: 160000, display_order: 31 },
  { id: "st-5",  title: "Sungate II",  artist: "Scott Troxel", year: 2026, medium: "Pigmented lacquer on poplar",                               dimensions: "13x8x2",        sn: null, image: "/artists/scott_troxel/sungateii_main.jpg", price: 160000, display_order: 32 },
  { id: "st-6",  title: "Hope",        artist: "Scott Troxel", year: 2026, medium: "Epoxy resin and mica powder on poplar",                     dimensions: "15.25x14.5x2",  sn: null, image: "/artists/scott_troxel/hopemain.jpg",       price: 260000, display_order: 33 },
  { id: "st-7",  title: "Lucky",       artist: "Scott Troxel", year: 2025, medium: "Pigmented lacquer on MDF and poplar with metallic enamel",  dimensions: "14x13.5x2",     sn: null, image: "/artists/scott_troxel/luckymain.jpeg",     price: 220000, display_order: 34 },
  { id: "st-8",  title: "Refresher",   artist: "Scott Troxel", year: 2023, medium: "Acrylic and texture on solid maple, matte clear coat",      dimensions: "15.5x14x2.25",  sn: null, image: "/artists/scott_troxel/refreshermain.jpg",  price: 190000, display_order: 35 },
  { id: "st-9",  title: "TwoBlues",    artist: "Scott Troxel", year: 2024, medium: "Pigmented satin lacquer on solid maple",                    dimensions: "13.25x9x2",     sn: null, image: "/artists/scott_troxel/twoblues.jpg",       price: 200000, display_order: 36 },
  { id: "st-10", title: "Penna",       artist: "Scott Troxel", year: 2024, medium: "Pigmented satin lacquer on solid poplar",                   dimensions: "9x15.5x2",      sn: null, image: "/artists/scott_troxel/pennamain.jpeg",     price: 220000, display_order: 37 },
  { id: "st-11", title: "Waikiki",     artist: "Scott Troxel", year: 2024, medium: "Acrylic and texture on solid maple with mahogany",          dimensions: "14x11x5",       sn: null, image: "/artists/scott_troxel/waikikimain.jpg",    price: 195000, display_order: 38 },

  // ── Thomas Brady (12 works) ───────────────────────────────────────────────
  { id: "tb-1",  title: "Curve in the Road",               artist: "Thomas Brady", year: 2020, medium: "Oil/Panel", dimensions: "34x53",   sn: null, image: "/artists/thomas_brady/curve_in_the_road_34x53_2020.jpg",        price: 730000, display_order: 39 },
  { id: "tb-2",  title: "BV by Hardee's",                  artist: "Thomas Brady", year: 2025, medium: "Oil/Panel", dimensions: "35x47",   sn: null, image: "/artists/thomas_brady/bv_by_hardees_35x47.jpg",                 price: 686000, display_order: 40 },
  { id: "tb-3",  title: "Lady at Hardees",                 artist: "Thomas Brady", year: 2025, medium: "Oil/Panel", dimensions: "42x32",   sn: null, image: "/artists/thomas_brady/lady_at_hardees_42x32.jpg",               price: 630000, display_order: 41 },
  { id: "tb-4",  title: "Landscape with Telephone Pole",   artist: "Thomas Brady", year: 2017, medium: "Oil/Panel", dimensions: "30x43.5", sn: null, image: "/artists/thomas_brady/landscape_with_telephone_pole_30x43.5.jpg", price: 630000, display_order: 42 },
  { id: "tb-5",  title: "Olney Couple",                    artist: "Thomas Brady", year: 2023, medium: "Oil/Panel", dimensions: "44x50.5", sn: null, image: "/artists/thomas_brady/olney_couple_44x50.5.jpg",                price: 770000, display_order: 43 },
  { id: "tb-6",  title: "Rita's",                          artist: "Thomas Brady", year: 2024, medium: "Oil/Panel", dimensions: "39x45",   sn: null, image: "/artists/thomas_brady/ritas_by_walgreens_39x45.jpg",            price: 700000, display_order: 44 },
  { id: "tb-7",  title: "Stewardburg Road",                artist: "Thomas Brady", year: 2025, medium: "Oil/Panel", dimensions: "31x47",   sn: null, image: "/artists/thomas_brady/stewardburg_road_31x47.jpg",              price: 660000, display_order: 45 },
  { id: "tb-8",  title: "Striped Fields",                  artist: "Thomas Brady", year: 2019, medium: "Oil/Panel", dimensions: "38x51",   sn: null, image: "/artists/thomas_brady/striped_fields_19_38x51.jpg",             price: null,   display_order: 46 },
  { id: "tb-9",  title: "The DC Highway",                  artist: "Thomas Brady", year: 2016, medium: "Oil/Panel", dimensions: "31x42.5", sn: null, image: "/artists/thomas_brady/the_dc_highway_31x42.5.jpg",              price: 620000, display_order: 47 },
  { id: "tb-10", title: "The Lexington Restaurant",        artist: "Thomas Brady", year: 2023, medium: "Oil/Panel", dimensions: "42x40",   sn: null, image: "/artists/thomas_brady/the_lexington_restaurant_42x40_23.jpg",   price: 680000, display_order: 48 },
  { id: "tb-11", title: "The Train Station",               artist: "Thomas Brady", year: 2024, medium: "Oil/Panel", dimensions: "35x47",   sn: null, image: "/artists/thomas_brady/the_train_station_35x47.jpg",             price: 686000, display_order: 49 },
  { id: "tb-12", title: "VMI",                             artist: "Thomas Brady", year: 2023, medium: "Oil/Panel", dimensions: "35x45",   sn: null, image: "/artists/thomas_brady/vmi_35x45_23.jpg",                        price: 670000, display_order: 50 },
];

// ── Upsert via PostgREST ─────────────────────────────────────────────────────
// "Prefer: resolution=merge-duplicates" turns the INSERT into an UPSERT keyed on `id` (the PK).
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
try {
  returned = JSON.parse(text);
} catch {
  /* ignore */
}

console.log(`✅  Upserted ${returned.length || rows.length} rows into artworks`);
console.log(
  "   Artists:",
  [...new Set(rows.map((r) => r.artist))].join(", ")
);
