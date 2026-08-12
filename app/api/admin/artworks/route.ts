import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";

const BUCKET = "artwork-images";
const MAX_IMAGE_BYTES = 25 * 1024 * 1024; // 25 MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "untitled"
  );
}

// Artist initials, matching the existing id convention (gu-, st-, ss-, tb-…).
function idPrefix(artist: string): string {
  const initials = artist
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  return initials || "ar";
}

// POST /api/admin/artworks — multipart form:
//   artist (required), medium (required), image (required file),
//   title, year, dimensions, sn, price (dollars) — optional.
export async function POST(req: NextRequest) {
  if (!verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const artist = String(form.get("artist") ?? "").trim();
  const medium = String(form.get("medium") ?? "").trim();
  const title = String(form.get("title") ?? "").trim();
  const dimensions = String(form.get("dimensions") ?? "").trim();
  const sn = String(form.get("sn") ?? "").trim();
  const yearRaw = String(form.get("year") ?? "").trim();
  const priceRaw = String(form.get("price") ?? "").trim();
  const image = form.get("image");

  if (!artist) {
    return NextResponse.json({ error: "Artist name is required" }, { status: 400 });
  }
  if (!medium) {
    return NextResponse.json({ error: "Medium is required" }, { status: 400 });
  }
  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ error: "An image file is required" }, { status: 400 });
  }
  if (image.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "Image must be under 25 MB" }, { status: 400 });
  }
  const ext = ALLOWED_TYPES[image.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Image must be a JPEG, PNG, or WebP file" },
      { status: 400 }
    );
  }

  const year = yearRaw ? Number.parseInt(yearRaw, 10) : null;
  if (yearRaw && Number.isNaN(year)) {
    return NextResponse.json({ error: "Year must be a number" }, { status: 400 });
  }
  // Price entered in dollars, stored in cents. Empty = inquire to purchase.
  const price = priceRaw ? Math.round(Number.parseFloat(priceRaw) * 100) : null;
  if (priceRaw && (Number.isNaN(price) || price! < 0)) {
    return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
  }

  try {
    const supabase = createServerSupabaseClient();

    // Next id in the artist's prefix sequence (max numeric suffix + 1, across
    // all rows sharing the prefix so initials collisions can't cause dup keys).
    const prefix = idPrefix(artist);
    const { data: prefixRows, error: idError } = await supabase
      .from("artworks")
      .select("id")
      .like("id", `${prefix}-%`);
    if (idError) throw idError;
    const maxSuffix = (prefixRows ?? []).reduce((max, row) => {
      const n = Number.parseInt(row.id.slice(prefix.length + 1), 10);
      return Number.isNaN(n) ? max : Math.max(max, n);
    }, 0);
    const id = `${prefix}-${maxSuffix + 1}`;

    // Append to the end of the gallery.
    const { data: orderRows, error: orderError } = await supabase
      .from("artworks")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1);
    if (orderError) throw orderError;
    const displayOrder = (orderRows?.[0]?.display_order ?? 0) + 1;

    // Upload the image. Bucket is created on first use.
    const path = `${slugify(artist)}/${Date.now()}_${slugify(title || id)}.${ext}`;
    const bytes = Buffer.from(await image.arrayBuffer());
    let upload = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: image.type });
    if (upload.error && /bucket not found/i.test(upload.error.message)) {
      await supabase.storage.createBucket(BUCKET, { public: true });
      upload = await supabase.storage
        .from(BUCKET)
        .upload(path, bytes, { contentType: image.type });
    }
    if (upload.error) throw upload.error;

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

    const { data: inserted, error: insertError } = await supabase
      .from("artworks")
      .insert({
        id,
        title: title || null,
        artist,
        year,
        medium,
        dimensions: dimensions || null,
        sn: sn || null,
        image: urlData.publicUrl,
        price,
        display_order: displayOrder,
      })
      .select()
      .single();
    if (insertError) {
      // Don't leave an orphaned image behind if the row insert failed.
      await supabase.storage.from(BUCKET).remove([path]);
      throw insertError;
    }

    return NextResponse.json({ artwork: inserted }, { status: 201 });
  } catch (err) {
    console.error("[Admin Artworks API] Error creating artwork:", err);
    return NextResponse.json(
      { error: "Failed to save artwork. Check the server logs." },
      { status: 500 }
    );
  }
}

// GET /api/admin/artworks — full list (including sold) for the admin panel,
// plus the distinct artist names for the dropdown.
export async function GET(req: NextRequest) {
  if (!verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("artworks")
      .select("id, title, artist, sold, display_order")
      .order("display_order", { ascending: true });
    if (error) throw error;

    const artists = [...new Set((data ?? []).map((row) => row.artist))];
    return NextResponse.json({ artists, artworks: data ?? [] });
  } catch (err) {
    console.error("[Admin Artworks API] Error listing artworks:", err);
    return NextResponse.json({ error: "Failed to load artworks" }, { status: 500 });
  }
}
