"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

const artworks = [
  {
    id: 1,
    title: "Coastal Reverie",
    artist: "Elara Montclair",
    image: "https://picsum.photos/seed/artwork1/400/500",
    aspectRatio: "4/5",
  },
  {
    id: 2,
    title: "Golden Hour Study",
    artist: "Marcus Delacroix",
    image: "https://picsum.photos/seed/artwork2/500/400",
    aspectRatio: "5/4",
  },
  {
    id: 3,
    title: "Serenity in Form",
    artist: "Vivienne Hartwell",
    image: "https://picsum.photos/seed/artwork3/400/500",
    aspectRatio: "4/5",
  },
  {
    id: 4,
    title: "The Blue Meridian",
    artist: "James Okafor",
    image: "https://picsum.photos/seed/artwork4/500/400",
    aspectRatio: "5/4",
  },
  {
    id: 5,
    title: "Nocturne No. 7",
    artist: "Sofia Vèritas",
    image: "https://picsum.photos/seed/artwork5/400/400",
    aspectRatio: "1/1",
  },
  {
    id: 6,
    title: "Amber Passage",
    artist: "Thomas Crane",
    image: "https://picsum.photos/seed/artwork6/600/400",
    aspectRatio: "3/2",
  },
];

export default function VirtualPlacementPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<
    (typeof artworks)[0] | null
  >(null);
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [artworkSize, setArtworkSize] = useState(280);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [savedPreview, setSavedPreview] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRoomImage(url);
      setSavedPreview(false);
    }
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = Math.max(
        0,
        Math.min(e.clientX - dragOffset.x, rect.width - artworkSize)
      );
      const newY = Math.max(
        0,
        Math.min(e.clientY - dragOffset.y, rect.height - artworkSize)
      );
      setPosition({ x: newX, y: newY });
    },
    [isDragging, dragOffset, artworkSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setDragOffset({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    },
    [position]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !canvasRef.current) return;
      const touch = e.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = Math.max(
        0,
        Math.min(touch.clientX - dragOffset.x, rect.width - artworkSize)
      );
      const newY = Math.max(
        0,
        Math.min(touch.clientY - dragOffset.y, rect.height - artworkSize)
      );
      setPosition({ x: newX, y: newY });
    },
    [isDragging, dragOffset, artworkSize]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleSavePreview = () => {
    setSavedPreview(true);
    setTimeout(() => setSavedPreview(false), 3000);
  };

  const handleReset = () => {
    setPosition({ x: 100, y: 100 });
    setArtworkSize(280);
  };

  return (
    <>
      {/* Page header */}
      <div
        className="page-hero"
        style={{ backgroundColor: "#0a0a0a" }}
      >
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
            Visualize Your Space
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
            Virtual Placement
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
            Select a work from our collection, upload a photo of your space, then
            drag and resize to see how it would look on your walls.
          </p>
        </div>
      </div>

      {/* Tool section */}
      <section style={{ backgroundColor: "#faf7f2", padding: "3rem 0 5rem" }}>
        <div className="page-container">
          {/* Step layout */}
          <div className="vp-layout">
            {/* ── LEFT PANEL: Controls ── */}
            <div className="vp-controls">
              {/* Step 1: Select artwork */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span
                    style={{
                      width: "1.75rem",
                      height: "1.75rem",
                      borderRadius: "50%",
                      border: "1px solid #c9a84c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c9a84c",
                      fontSize: "0.75rem",
                      flexShrink: 0,
                      fontFamily: "Jost, system-ui, sans-serif",
                    }}
                  >
                    1
                  </span>
                  <h2
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      color: "#0a0a0a",
                      fontWeight: 300,
                      fontSize: "1.25rem",
                    }}
                  >
                    Select Artwork
                  </h2>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    maxHeight: "18rem",
                    overflowY: "auto",
                    paddingRight: "0.25rem",
                  }}
                >
                  {artworks.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => {
                        setSelectedArtwork(art);
                        setSavedPreview(false);
                      }}
                      className={`transition-all duration-200 ${
                        selectedArtwork?.id === art.id
                          ? "border-[#c9a84c] bg-[#c9a84c]/5"
                          : "border-[#0a0a0a]/10 hover:border-[#c9a84c]/40 bg-white"
                      }`}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        border: selectedArtwork?.id === art.id
                          ? "1px solid #c9a84c"
                          : "1px solid rgba(10,10,10,0.1)",
                        backgroundColor: selectedArtwork?.id === art.id
                          ? "rgba(201,168,76,0.05)"
                          : "#fff",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="relative overflow-hidden bg-[#e8e0d0]"
                        style={{ width: "2.5rem", height: "2.5rem", flexShrink: 0, position: "relative" }}
                      >
                        <Image
                          src={art.image}
                          alt={art.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontFamily: "Cormorant Garamond, Georgia, serif",
                            color: "#0a0a0a",
                            fontSize: "0.875rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {art.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "Jost, system-ui, sans-serif",
                            color: "rgba(10,10,10,0.4)",
                            fontSize: "0.75rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {art.artist}
                        </p>
                      </div>
                      {selectedArtwork?.id === art.id && (
                        <span style={{ color: "#c9a84c", fontSize: "0.75rem", marginLeft: "auto", flexShrink: 0 }}>
                          ✦
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Upload room */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <span
                    style={{
                      width: "1.75rem",
                      height: "1.75rem",
                      borderRadius: "50%",
                      border: "1px solid #c9a84c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c9a84c",
                      fontSize: "0.75rem",
                      flexShrink: 0,
                      fontFamily: "Jost, system-ui, sans-serif",
                    }}
                  >
                    2
                  </span>
                  <h2
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      color: "#0a0a0a",
                      fontWeight: 300,
                      fontSize: "1.25rem",
                    }}
                  >
                    Upload Your Room
                  </h2>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: "100%",
                    border: roomImage
                      ? "2px dashed rgba(201,168,76,0.6)"
                      : "2px dashed rgba(10,10,10,0.2)",
                    backgroundColor: roomImage ? "rgba(201,168,76,0.05)" : "#fff",
                    padding: "2rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {roomImage ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <div style={{ color: "#c9a84c", fontSize: "1.5rem" }}>✦</div>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(10,10,10,0.6)", fontSize: "0.75rem" }}>
                        Room photo uploaded
                      </p>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "#c9a84c", fontSize: "0.75rem", textDecoration: "underline" }}>
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ color: "rgba(10,10,10,0.2)", fontSize: "1.875rem" }}>⊕</div>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(10,10,10,0.5)", fontSize: "0.75rem" }}>
                        Click to upload a room photo
                      </p>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(10,10,10,0.3)", fontSize: "0.75rem" }}>
                        JPG, PNG, WEBP supported
                      </p>
                    </div>
                  )}
                </button>
              </div>

              {/* Step 3: Adjust size */}
              {selectedArtwork && roomImage && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <span
                      style={{
                        width: "1.75rem",
                        height: "1.75rem",
                        borderRadius: "50%",
                        border: "1px solid #c9a84c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#c9a84c",
                        fontSize: "0.75rem",
                        flexShrink: 0,
                        fontFamily: "Jost, system-ui, sans-serif",
                      }}
                    >
                      3
                    </span>
                    <h2
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                        color: "#0a0a0a",
                        fontWeight: 300,
                        fontSize: "1.25rem",
                      }}
                    >
                      Adjust Size
                    </h2>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid rgba(10,10,10,0.1)",
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(10,10,10,0.5)", fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Artwork Size
                      </span>
                      <span style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color: "#c9a84c", fontSize: "0.875rem" }}>
                        {artworkSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={500}
                      value={artworkSize}
                      onChange={(e) => setArtworkSize(Number(e.target.value))}
                      className="w-full accent-[#c9a84c] cursor-pointer"
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "rgba(10,10,10,0.3)", fontFamily: "Jost, system-ui, sans-serif" }}>
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                    <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(10,10,10,0.4)", fontSize: "0.75rem", paddingTop: "0.25rem" }}>
                      Drag the artwork on the canvas to reposition it
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                    <button
                      onClick={handleSavePreview}
                      className="hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer"
                      style={{
                        width: "100%",
                        backgroundColor: "#0a0a0a",
                        color: "#f5f0e8",
                        padding: "0.875rem",
                        fontSize: "0.75rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        fontFamily: "Jost, system-ui, sans-serif",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {savedPreview ? "✦ Preview Saved!" : "Save Preview"}
                    </button>
                    <button
                      onClick={handleReset}
                      className="hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-all duration-300 cursor-pointer"
                      style={{
                        width: "100%",
                        border: "1px solid rgba(10,10,10,0.2)",
                        color: "rgba(10,10,10,0.5)",
                        padding: "0.75rem",
                        fontSize: "0.75rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        fontFamily: "Jost, system-ui, sans-serif",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      Reset Position
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT PANEL: Canvas ── */}
            <div style={{ flex: 1, minHeight: "400px" }}>
              {!roomImage ? (
                <div
                  style={{
                    width: "100%",
                    minHeight: "500px",
                    backgroundColor: "rgba(10,10,10,0.05)",
                    border: "2px dashed rgba(10,10,10,0.15)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "2.5rem",
                  }}
                >
                  <div style={{ fontSize: "3.75rem", color: "rgba(10,10,10,0.1)", marginBottom: "1.5rem", userSelect: "none" }}>
                    🖼
                  </div>
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      color: "rgba(10,10,10,0.3)",
                      fontWeight: 300,
                      fontSize: "1.5rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Your Canvas Awaits
                  </h3>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      color: "rgba(10,10,10,0.25)",
                      fontSize: "0.75rem",
                      maxWidth: "18rem",
                      lineHeight: 1.75,
                    }}
                  >
                    Select an artwork and upload a room photo to begin your
                    virtual placement preview.
                  </p>
                </div>
              ) : (
                <div
                  ref={canvasRef}
                  className="relative overflow-hidden"
                  style={{
                    width: "100%",
                    minHeight: "500px",
                    cursor: isDragging ? "grabbing" : "default",
                    touchAction: "none",
                    userSelect: "none",
                    position: "relative",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={roomImage}
                    alt="Room"
                    style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "500px", display: "block" }}
                    draggable={false}
                  />

                  {!selectedArtwork && (
                    <div className="absolute inset-0 bg-[#0a0a0a]/40 flex items-center justify-center">
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(245,240,232,0.7)", fontSize: "0.875rem", letterSpacing: "0.1em" }}>
                        ← Select an artwork to place
                      </p>
                    </div>
                  )}

                  {selectedArtwork && (
                    <div
                      style={{
                        position: "absolute",
                        left: position.x,
                        top: position.y,
                        width: artworkSize,
                        cursor: isDragging ? "grabbing" : "grab",
                        filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6))",
                        zIndex: 10,
                      }}
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div style={{ border: "6px solid #e8dcc8", backgroundColor: "#e8dcc8" }}>
                        <div style={{ border: "2px solid #d4c8b0" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedArtwork.image}
                            alt={selectedArtwork.title}
                            style={{ width: "100%", display: "block", pointerEvents: "none", userSelect: "none" }}
                            draggable={false}
                          />
                        </div>
                      </div>
                      <div style={{ position: "absolute", bottom: "-30px", left: 0, right: 0, textAlign: "center", pointerEvents: "none" }}>
                        <span style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color: "#f5f0e8", fontSize: "0.75rem", backgroundColor: "rgba(10,10,10,0.7)", padding: "0.25rem 0.5rem", whiteSpace: "nowrap" }}>
                          {selectedArtwork.title}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedArtwork && (
                    <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", backgroundColor: "rgba(10,10,10,0.7)", backdropFilter: "blur(4px)", padding: "0.5rem 0.75rem" }}>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(245,240,232,0.6)", fontSize: "0.75rem" }}>
                        Drag to reposition
                      </p>
                    </div>
                  )}

                  {savedPreview && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#c9a84c", padding: "0.75rem", textAlign: "center" }}>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "#0a0a0a", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        ✦ Preview Saved Successfully
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom info */}
          <div
            className="section-grid"
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid rgba(10,10,10,0.1)",
            }}
          >
            {[
              {
                step: "01",
                title: "Choose Your Work",
                desc: "Browse our curated collection and select the piece that speaks to you.",
              },
              {
                step: "02",
                title: "Upload Your Space",
                desc: "Photograph your wall and upload the image to our placement tool.",
              },
              {
                step: "03",
                title: "Visualize & Decide",
                desc: "Drag, resize, and see how the artwork transforms your environment.",
              },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: "1rem" }}>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    color: "rgba(201,168,76,0.4)",
                    fontSize: "1.875rem",
                    fontWeight: 300,
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  {item.step}
                </span>
                <div>
                  <h4
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      color: "#0a0a0a",
                      fontWeight: 300,
                      fontSize: "1.125rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      color: "rgba(10,10,10,0.5)",
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .vp-layout {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        .vp-controls {
          width: 20rem;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .vp-layout {
            flex-direction: column;
          }
          .vp-controls {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
