"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NEW_ARTIST = "__new__";

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

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  color: "#f5f0e8",
  border: "none",
  padding: "0.875rem 2rem",
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: "Jost, system-ui, sans-serif",
  cursor: "pointer",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

// ── Login form ────────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Sign in failed");
      }
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "24rem",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Field label="Username">
        <input
          type="text"
          required
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
      </Field>
      <Field label="Password">
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </Field>
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
      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

// ── Add-artwork form ──────────────────────────────────────────────────────────
function ArtworkForm({ onLogout }: { onLogout: () => void }) {
  const [artists, setArtists] = useState<string[]>([]);
  const [artistChoice, setArtistChoice] = useState<string>("");
  const [newArtist, setNewArtist] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [medium, setMedium] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const loadArtists = () =>
    fetch("/api/admin/artworks")
      .then((res) => res.json())
      .then((data: { artists?: string[] }) => {
        if (Array.isArray(data.artists)) setArtists(data.artists);
      })
      .catch(console.error);

  useEffect(() => {
    loadArtists();
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const artistName =
    artistChoice === NEW_ARTIST ? newArtist.trim() : artistChoice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !artistName) return;
    setSaving(true);
    setError(null);
    setSavedMessage(null);
    try {
      const form = new FormData();
      form.set("artist", artistName);
      form.set("title", title);
      form.set("year", year);
      form.set("medium", medium);
      form.set("dimensions", dimensions);
      form.set("price", price);
      form.set("image", file);

      const res = await fetch("/api/admin/artworks", {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Failed to save artwork");

      setSavedMessage(
        `Added “${data.artwork?.title ?? data.artwork?.id}” under ${artistName}.`
      );
      // Reset the artwork fields; keep the artist selected for quick batches.
      setTitle("");
      setYear("");
      setMedium("");
      setDimensions("");
      setPrice("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (artistChoice === NEW_ARTIST) {
        setArtistChoice(newArtist.trim());
        setNewArtist("");
      }
      loadArtists();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save artwork");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "36rem",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Field label="Artist *">
        <select
          required
          value={artistChoice}
          onChange={(e) => setArtistChoice(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          <option value="" disabled>
            Select an artist…
          </option>
          {artists.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value={NEW_ARTIST}>+ New artist…</option>
        </select>
      </Field>

      {artistChoice === NEW_ARTIST && (
        <Field label="New Artist Name *">
          <input
            type="text"
            required
            value={newArtist}
            onChange={(e) => setNewArtist(e.target.value)}
            placeholder="Full name as it should appear in the gallery"
            style={inputStyle}
          />
        </Field>
      )}

      <Field label="Title">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Leave blank for untitled"
          style={inputStyle}
        />
      </Field>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        <Field label="Year">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2026"
            style={inputStyle}
          />
        </Field>
        <Field label="Dimensions">
          <input
            type="text"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            placeholder="e.g. 36x48"
            style={inputStyle}
          />
        </Field>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
      >
        <Field label="Medium *">
          <input
            type="text"
            required
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="e.g. Oil on canvas"
            style={inputStyle}
          />
        </Field>
        <Field label="Price (USD)">
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Blank = Inquire to Purchase"
            style={inputStyle}
          />
        </Field>
      </div>

      <Field label="Artwork Image *">
        <input
          ref={fileInputRef}
          type="file"
          required
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          style={{
            fontFamily: "Jost, system-ui, sans-serif",
            fontSize: "0.8rem",
            color: "rgba(10,10,10,0.6)",
          }}
        />
      </Field>

      {preview && (
        <div
          style={{
            position: "relative",
            width: "10rem",
            aspectRatio: "5/6",
            border: "1px solid rgba(10,10,10,0.1)",
          }}
        >
          <Image
            src={preview}
            alt="Preview"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}

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
      {savedMessage && (
        <p
          style={{
            fontFamily: "Jost, system-ui, sans-serif",
            fontSize: "0.8rem",
            color: "#1e7d43",
          }}
        >
          ✦ {savedMessage} It is now live in the gallery.
        </p>
      )}

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            ...buttonStyle,
            backgroundColor: saving ? "rgba(10,10,10,0.5)" : "#0a0a0a",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving…" : "Add Artwork"}
        </button>
        <button
          type="button"
          onClick={onLogout}
          style={{
            ...buttonStyle,
            backgroundColor: "transparent",
            color: "rgba(10,10,10,0.5)",
            border: "1px solid rgba(10,10,10,0.2)",
          }}
        >
          Sign Out
        </button>
      </div>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((res) => res.json())
      .then((data: { authenticated?: boolean }) =>
        setAuthed(Boolean(data.authenticated))
      )
      .catch(() => setAuthed(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  };

  return (
    <>
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
            Gallery Administration
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              color: "#f5f0e8",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
            }}
          >
            {authed ? "Add Artwork" : "Admin Sign In"}
          </h1>
          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#c9a84c",
              margin: "1.5rem auto 0",
            }}
          />
        </div>
      </div>

      <section style={{ backgroundColor: "#faf7f2", padding: "4rem 0" }}>
        <div className="page-container">
          {authed === null ? (
            <p
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.3)",
                textAlign: "center",
              }}
            >
              Loading…
            </p>
          ) : authed ? (
            <ArtworkForm onLogout={handleLogout} />
          ) : (
            <LoginForm onLogin={() => setAuthed(true)} />
          )}
        </div>
      </section>
    </>
  );
}
