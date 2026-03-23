"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { ArtworkRow } from "@/lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────────
// ArtworkRow comes from the Supabase schema in lib/supabase.ts
type Artwork = ArtworkRow;

const ALL_ARTISTS = "All Artists";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function buildPreviewUrl(work: Artwork) {
  const params = new URLSearchParams({
    id: work.id,
    image: work.image,
    artist: work.artist,
    ...(work.title ? { title: work.title } : {}),
    ...(work.dimensions ? { dimensions: work.dimensions } : {}),
  });
  return `/virtual-placement?${params.toString()}`;
}

// ── Inquiry Modal ─────────────────────────────────────────────────────────────
function InquiryModal({
  work,
  onClose,
}: {
  work: Artwork;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayTitle =
    work.title ??
    `${work.artist} — ${work.medium} (${work.dimensions ?? "Dimensions TBD"})`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          artworkId: work.id,
          artworkTitle: displayTitle,
          artist: work.artist,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(10,10,10,0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#faf7f2",
          width: "100%",
          maxWidth: "34rem",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2.5rem",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(10,10,10,0.4)",
            fontSize: "1.25rem",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div
              style={{
                width: "3.5rem",
                height: "3.5rem",
                border: "1px solid #c9a84c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <span style={{ color: "#c9a84c" }}>✦</span>
            </div>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontWeight: 300,
                fontSize: "1.75rem",
                color: "#0a0a0a",
                marginBottom: "0.75rem",
              }}
            >
              Inquiry Received
            </h2>
            <div
              style={{
                width: "2.5rem",
                height: "1px",
                backgroundColor: "#c9a84c",
                margin: "0 auto 1.25rem",
              }}
            />
            <p
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                fontSize: "0.875rem",
                color: "rgba(10,10,10,0.55)",
                lineHeight: 1.75,
              }}
            >
              Thank you, {form.name.split(" ")[0]}. We will be in touch within
              24 hours regarding{" "}
              <em
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                {displayTitle}
              </em>
              .
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: "2rem",
                backgroundColor: "#0a0a0a",
                color: "#f5f0e8",
                border: "none",
                padding: "0.75rem 2rem",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: "Jost, system-ui, sans-serif",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  marginBottom: "0.5rem",
                }}
              >
                Purchase Inquiry
              </p>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  fontWeight: 300,
                  fontSize: "1.5rem",
                  color: "#0a0a0a",
                  lineHeight: 1.3,
                  marginBottom: "0.25rem",
                }}
              >
                {displayTitle}
              </h2>
              <p
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(10,10,10,0.4)",
                  letterSpacing: "0.08em",
                }}
              >
                {work.artist}
                {work.medium ? ` · ${work.medium}` : ""}
                {work.dimensions ? ` · ${work.dimensions}` : ""}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label htmlFor="inq-name" style={labelStyle}>
                  Full Name *
                </label>
                <input
                  id="inq-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Alexandra Whitmore"
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label htmlFor="inq-email" style={labelStyle}>
                    Email *
                  </label>
                  <input
                    id="inq-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <label htmlFor="inq-phone" style={labelStyle}>
                    Phone
                  </label>
                  <input
                    id="inq-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label htmlFor="inq-message" style={labelStyle}>
                  Message
                </label>
                <textarea
                  id="inq-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Any questions, budget range, or placement considerations..."
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              {error && (
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    fontSize: "0.8rem",
                    color: "#c0392b",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  backgroundColor: loading ? "rgba(10,10,10,0.5)" : "#0a0a0a",
                  color: "#f5f0e8",
                  border: "none",
                  padding: "0.875rem",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontFamily: "Jost, system-ui, sans-serif",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s",
                  marginTop: "0.25rem",
                }}
              >
                {loading ? "Sending…" : "Submit Inquiry"}
              </button>

              <p
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(10,10,10,0.3)",
                  textAlign: "center",
                }}
              >
                We respond within 24 hours. No commitment required.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "Jost, system-ui, sans-serif",
  fontSize: "0.7rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(10,10,10,0.45)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderBottom: "1px solid rgba(10,10,10,0.2)",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  backgroundColor: "transparent",
  padding: "0.65rem 0",
  fontSize: "0.875rem",
  color: "#0a0a0a",
  outline: "none",
  fontFamily: "Jost, system-ui, sans-serif",
};

// ── Artwork Card ──────────────────────────────────────────────────────────────
function ArtworkCard({
  work,
  onInquire,
}: {
  work: Artwork;
  onInquire: (work: Artwork) => void;
}) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const isSold = work.sold;

  const handleBuyNow = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: work.id,
          title: work.title ?? `${work.artist} — ${work.medium}`,
          artist: work.artist,
          price: work.price,
          image: work.image,
          sn: work.sn,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed.");
      window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout unavailable.";
      setCheckoutError(message);
      setCheckoutLoading(false);
    }
  };

  return (
    <article
      className="group"
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.5s ease",
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "5/6", position: "relative" }}
      >
        <Image
          src={work.image}
          alt={work.title ?? `${work.artist} — ${work.medium}`}
          fill
          className={`object-cover transition-transform duration-700 ${
            isSold ? "grayscale-[40%]" : "group-hover:scale-105"
          }`}
        />
        {/* Sold overlay */}
        {isSold && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(10,10,10,0.45)" }}
          >
            <div
              style={{
                border: "1px solid rgba(245,240,232,0.6)",
                padding: "0.5rem 1.25rem",
              }}
            >
              <span
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  color: "#f5f0e8",
                  fontSize: "0.65rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                }}
              >
                Sold
              </span>
            </div>
          </div>
        )}
        {/* Hover overlay */}
        {!isSold && (
          <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/30 transition-all duration-500 flex items-center justify-center">
            <Link
              href={buildPreviewUrl(work)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#f5f0e8]/10 backdrop-blur-sm border border-[#f5f0e8]/40 text-[#f5f0e8] text-xs tracking-[0.2em] uppercase px-4 py-2 hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Preview in Room
            </Link>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "0.25rem" }}>
          {work.title && (
            <h3
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                color: "#0a0a0a",
                fontSize: "1.125rem",
                fontWeight: 300,
                lineHeight: 1.3,
                marginBottom: "0.15rem",
              }}
            >
              {work.title}
            </h3>
          )}
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              color: "rgba(10,10,10,0.5)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {work.artist}
            {work.year ? ` (${work.year})` : ""}
          </p>
        </div>

        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(10,10,10,0.08)",
            marginBottom: "0.75rem",
          }}
        />

        <div
          style={{
            fontSize: "0.75rem",
            color: "rgba(10,10,10,0.4)",
            fontFamily: "Jost, system-ui, sans-serif",
            lineHeight: 1.7,
            marginBottom: "1rem",
          }}
        >
          <div>{work.medium}</div>
          {work.dimensions && <div>{work.dimensions}</div>}
          {work.sn && (
            <div
              style={{
                marginTop: "0.25rem",
                fontWeight: 600,
                color: "rgba(10,10,10,0.55)",
                letterSpacing: "0.05em",
              }}
            >
              {work.sn}
            </div>
          )}
        </div>

        {/* Price */}
        {work.price !== null && (
          <p
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "#0a0a0a",
              marginBottom: "0.75rem",
              letterSpacing: "0.02em",
            }}
          >
            {formatPrice(work.price)}
          </p>
        )}

        {/* CTA */}
        {isSold ? (
          <button
            disabled
            style={{
              width: "100%",
              border: "1px solid rgba(10,10,10,0.1)",
              color: "rgba(10,10,10,0.25)",
              padding: "0.75rem",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "Jost, system-ui, sans-serif",
              backgroundColor: "transparent",
              cursor: "default",
            }}
          >
            Sold
          </button>
        ) : work.price !== null ? (
          <div>
            <button
              onClick={handleBuyNow}
              disabled={checkoutLoading}
              className="hover:bg-[#c9a84c] hover:text-[#0a0a0a] hover:border-[#c9a84c] transition-all duration-300 cursor-pointer"
              style={{
                width: "100%",
                backgroundColor: checkoutLoading ? "rgba(10,10,10,0.5)" : "#0a0a0a",
                color: "#f5f0e8",
                border: "1px solid transparent",
                padding: "0.75rem",
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontFamily: "Jost, system-ui, sans-serif",
                cursor: checkoutLoading ? "not-allowed" : "pointer",
              }}
            >
              {checkoutLoading ? "Redirecting…" : "Buy Now"}
            </button>
            {checkoutError && (
              <p
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  fontSize: "0.7rem",
                  color: "#c0392b",
                  marginTop: "0.5rem",
                  textAlign: "center",
                }}
              >
                {checkoutError}
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={() => onInquire(work)}
            className="hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300 cursor-pointer"
            style={{
              width: "100%",
              border: "1px solid rgba(10,10,10,0.2)",
              color: "rgba(10,10,10,0.7)",
              padding: "0.75rem",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "Jost, system-ui, sans-serif",
              backgroundColor: "transparent",
            }}
          >
            Inquire to Purchase
          </button>
        )}
      </div>
    </article>
  );
}

// ── Artist Bios ───────────────────────────────────────────────────────────────
const artistBios: Record<string, string[]> = {
  "Emily O'Flaherty": [
    "Emily O'Flaherty is a graduate of Academy of Art University where she developed her voice as a working artist while living in San Francisco. During this time, she immersed herself in the city's creative landscape, shaping a style that is both feminine and ethereal.",
    "Her work spans landscapes, figurative painting, and still life, often embracing an intentionally \u201cunfinished\u201d quality that preserves immediacy and emotional expression. Through soft palettes and intuitive mark-making, Emily captures fleeting moments with a sense of quiet depth and vulnerability.",
    "After completing her studies, she relocated to Orange County where she continues to grow her artistic practice. In addition to her studio work, Emily is a dedicated educator, teaching high school students and traveling throughout the region to share the transformative benefits of art with young people.",
  ],
};

// ── Artist Section ────────────────────────────────────────────────────────────
function ArtistSection({
  artist,
  works,
  onInquire,
}: {
  artist: string;
  works: Artwork[];
  onInquire: (work: Artwork) => void;
}) {
  const bio = artistBios[artist];

  return (
    <div style={{ marginBottom: "5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: bio ? "1.5rem" : "2.5rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "#c9a84c",
            flexShrink: 0,
          }}
        />
        <div>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              color: "#0a0a0a",
              fontWeight: 300,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              lineHeight: 1.1,
              marginBottom: "0.4rem",
            }}
          >
            {artist}
          </h2>
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              color: "rgba(10,10,10,0.45)",
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
            }}
          >
            Available Works
          </p>
        </div>
      </div>

      {bio && (
        <div
          style={{
            maxWidth: "48rem",
            marginBottom: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {bio.map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                color: "rgba(10,10,10,0.6)",
                fontSize: "0.9rem",
                lineHeight: 1.85,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <div className="section-grid">
        {works.map((work) => (
          <ArtworkCard key={work.id} work={work} onInquire={onInquire} />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeArtist, setActiveArtist] = useState<string>(ALL_ARTISTS);
  const [inquiryWork, setInquiryWork] = useState<Artwork | null>(null);

  // Fetch all artworks (includes sold status) from the database on mount
  useEffect(() => {
    fetch("/api/artworks")
      .then((res) => res.json())
      .then((data: { artworks: Artwork[] }) => {
        if (Array.isArray(data.artworks)) setArtworks(data.artworks);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Compute artist sections dynamically from DB data — order preserved by display_order
  const artistNames = [...new Set(artworks.map((w) => w.artist))];
  const artistSections = artistNames.map((artist) => ({
    artist,
    works: artworks.filter((w) => w.artist === artist),
  }));

  const filterOptions = [ALL_ARTISTS, ...artistNames];
  const visibleSections =
    activeArtist === ALL_ARTISTS
      ? artistSections
      : artistSections.filter((s) => s.artist === activeArtist);

  return (
    <>
      {inquiryWork && (
        <InquiryModal work={inquiryWork} onClose={() => setInquiryWork(null)} />
      )}

      {/* Page header */}
      <div className="page-hero" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="page-container">
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              color: "#c9a84c",
              letterSpacing: "0.5em",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Available Works
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              color: "#f5f0e8",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            The Collection
          </h1>
          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#c9a84c",
              margin: "1.5rem auto",
            }}
          />
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              color: "rgba(245,240,232,0.5)",
              maxWidth: "32rem",
              margin: "0 auto",
              fontSize: "0.875rem",
              lineHeight: 1.75,
            }}
          >
            We present contemporary artists whose work demonstrates originality,
            technical integrity, and cultural relevance — painting, sculpture, and
            mixed media selected for artistic vision and lasting significance.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div
        style={{
          backgroundColor: "#f5f0e8",
          borderBottom: "1px solid rgba(10,10,10,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          className="page-container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem var(--page-padding, 1.5rem)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(10,10,10,0.35)",
              marginRight: "0.75rem",
              whiteSpace: "nowrap",
            }}
          >
            Filter by Artist
          </span>

          {filterOptions.map((option) => {
            const isActive = activeArtist === option;
            return (
              <button
                key={option}
                onClick={() => setActiveArtist(option)}
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.45rem 1.1rem",
                  border: isActive
                    ? "1px solid #c9a84c"
                    : "1px solid rgba(10,10,10,0.15)",
                  backgroundColor: isActive ? "#c9a84c" : "transparent",
                  color: isActive ? "#0a0a0a" : "rgba(10,10,10,0.55)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c";
                    (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(10,10,10,0.15)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(10,10,10,0.55)";
                  }
                }}
              >
                {option}
              </button>
            );
          })}

          {activeArtist !== ALL_ARTISTS && (
            <span
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                fontSize: "0.7rem",
                color: "rgba(10,10,10,0.35)",
                marginLeft: "auto",
                letterSpacing: "0.05em",
              }}
            >
              {visibleSections.reduce((acc, s) => acc + s.works.length, 0)}{" "}
              {visibleSections.reduce((acc, s) => acc + s.works.length, 0) === 1
                ? "work"
                : "works"}
            </span>
          )}
        </div>
      </div>

      {/* Gallery */}
      <section style={{ backgroundColor: "#faf7f2", padding: "5rem 0" }}>
        <div className="page-container">
          {/* Loading skeleton */}
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "30rem",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <span style={{ color: "#c9a84c", fontSize: "1.25rem" }}>✦</span>
              <p
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,10,0.3)",
                }}
              >
                Loading Collection…
              </p>
            </div>
          )}

          {/* Gallery sections */}
          {!loading &&
            visibleSections.map((section, index) => (
              <div key={section.artist}>
                <ArtistSection
                  artist={section.artist}
                  works={section.works}
                  onInquire={setInquiryWork}
                />
                {index < visibleSections.length - 1 && (
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "rgba(10,10,10,0.1)",
                      margin: "2rem 0 5rem",
                    }}
                  />
                )}
              </div>
            ))}

          {/* Advisory note */}
          {!loading && (
            <div
              className="two-col-grid"
              style={{
                marginTop: "5rem",
                border: "1px solid rgba(10,10,10,0.1)",
              }}
            >
              <div
                style={{
                  padding: "3rem",
                  borderRight: "1px solid rgba(10,10,10,0.1)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    color: "#c9a84c",
                    letterSpacing: "0.3em",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  For Collectors
                </p>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    color: "#0a0a0a",
                    fontWeight: 300,
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    marginBottom: "1rem",
                  }}
                >
                  Building or Refining Your Collection?
                </h3>
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    color: "rgba(10,10,10,0.5)",
                    fontSize: "0.875rem",
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                  }}
                >
                  We work directly with collectors to discover, acquire, and place
                  exceptional contemporary artwork. By working with both emerging and
                  established artists, we offer access to unique works that hold
                  aesthetic significance and long-term cultural value.
                </p>
                <Link
                  href="/consultation"
                  className="inline-block hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-300"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "#f5f0e8",
                    padding: "0.875rem 2rem",
                    fontSize: "0.75rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontFamily: "Jost, system-ui, sans-serif",
                    textDecoration: "none",
                  }}
                >
                  Request Advisory
                </Link>
              </div>

              <div style={{ padding: "3rem", backgroundColor: "rgba(10,10,10,0.02)" }}>
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    color: "#c9a84c",
                    letterSpacing: "0.3em",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  For Artists
                </p>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    color: "#0a0a0a",
                    fontWeight: 300,
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    marginBottom: "1rem",
                  }}
                >
                  Open Call for Contemporary Artists
                </h3>
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    color: "rgba(10,10,10,0.5)",
                    fontSize: "0.875rem",
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                  }}
                >
                  We are currently seeking contemporary artists interested in
                  exhibiting and working with collectors through our gallery and
                  advisory platform. We focus on distinctive voices in painting,
                  sculpture, and mixed media.
                </p>
                <Link
                  href="/consultation"
                  className="inline-block hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
                  style={{
                    border: "1px solid rgba(10,10,10,0.3)",
                    color: "rgba(10,10,10,0.7)",
                    padding: "0.875rem 2rem",
                    fontSize: "0.75rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontFamily: "Jost, system-ui, sans-serif",
                    textDecoration: "none",
                  }}
                >
                  Submit Portfolio
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
