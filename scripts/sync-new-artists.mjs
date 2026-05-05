#!/usr/bin/env node
// Inserts (upserts) the Scott Troxel + Sean W. Spellman rows into Supabase.
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

  // ── Sean W. Spellman (13 works) ───────────────────────────────────────────
  { id: "ss-1",  title: "Cool/Floating",       artist: "Sean W. Spellman", year: 2024, medium: "Acrylic on stretched canvas",                                                 dimensions: "48x36",   sn: null, image: "/artists/sean_spellman/cool_floating.webp",       price: 300000, display_order: 39 },
  { id: "ss-2",  title: "December Plant 1",    artist: "Sean W. Spellman", year: 2024, medium: "Acrylic on antique paper",                                                    dimensions: "12x12",   sn: null, image: "/artists/sean_spellman/december_plant_1.webp",     price:  75000, display_order: 40 },
  { id: "ss-3",  title: "Western Hills",       artist: "Sean W. Spellman", year: 2024, medium: "Acrylic on stretched canvas",                                                 dimensions: "36x36",   sn: null, image: "/artists/sean_spellman/western_hills.webp",       price: 350000, display_order: 41 },
  { id: "ss-4",  title: "December Plant 2",    artist: "Sean W. Spellman", year: 2024, medium: "Acrylic and turmeric on antique paper",                                       dimensions: "12x12",   sn: null, image: "/artists/sean_spellman/december_plant_2.webp",     price:  55000, display_order: 42 },
  { id: "ss-5",  title: "Drifting",            artist: "Sean W. Spellman", year: 2024, medium: "Acrylic on canvas",                                                           dimensions: "36x48",   sn: null, image: "/artists/sean_spellman/drifting.webp",            price: 550000, display_order: 43 },
  { id: "ss-6",  title: "Moon Over Laguna",    artist: "Sean W. Spellman", year: 2023, medium: "Acrylic on canvas, basswood floater frame by Preservation Framer",            dimensions: "54.5x52", sn: null, image: "/artists/sean_spellman/moon_over_laguna.webp",    price: 550000, display_order: 44 },
  { id: "ss-7",  title: "Primitive Pot 2",     artist: "Sean W. Spellman", year: 2023, medium: "Ink and turmeric on antique paper",                                           dimensions: "12x12",   sn: null, image: "/artists/sean_spellman/primitive_pot_2.webp",     price:  75000, display_order: 45 },
  { id: "ss-8",  title: "Radiance",            artist: "Sean W. Spellman", year: 2024, medium: "Acrylic on stretched canvas",                                                 dimensions: "36x48",   sn: null, image: "/artists/sean_spellman/radiance.webp",            price: 550000, display_order: 46 },
  { id: "ss-9",  title: "Untitled",            artist: "Sean W. Spellman", year: 2025, medium: "Acrylic on canvas",                                                           dimensions: "30x40",   sn: null, image: "/artists/sean_spellman/untitled.webp",            price: 250000, display_order: 47 },
  { id: "ss-10", title: "Watching It Go Down", artist: "Sean W. Spellman", year: 2024, medium: "Acrylic on stretched canvas",                                                 dimensions: "48x36",   sn: null, image: "/artists/sean_spellman/watching_it_go_down.webp", price: 250000, display_order: 48 },
  { id: "ss-11", title: "Experientialism #2",  artist: "Sean W. Spellman", year: 2025, medium: "Acrylic on canvas",                                                           dimensions: "36x48",   sn: null, image: "/artists/sean_spellman/experientialism_2.webp",   price: 250000, display_order: 49 },
  { id: "ss-12", title: "Music Man",           artist: "Sean W. Spellman", year: 2025, medium: "Acrylic on canvas",                                                           dimensions: "36x48",   sn: null, image: "/artists/sean_spellman/music_man.webp",           price: 350000, display_order: 50 },
  { id: "ss-13", title: "Wavelengths",         artist: "Sean W. Spellman", year: 2021, medium: "Birch wood panel carving (LA pickup or Hangman Fine Arts delivery)",          dimensions: "59x39",   sn: null, image: "/artists/sean_spellman/wavelengths.webp",         price: 750000, display_order: 51 },
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
