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

  // Touch support
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
      <div className="bg-[#0a0a0a] pt-36 pb-16 px-6 text-center">
        <p
          className="text-[#c9a84c] tracking-[0.5em] text-xs uppercase mb-4"
          style={{ fontFamily: "Jost, system-ui, sans-serif" }}
        >
          Visualize Your Space
        </p>
        <h1
          className="text-[#f5f0e8] font-light"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          }}
        >
          Virtual Placement
        </h1>
        <div className="h-px w-16 bg-[#c9a84c] mx-auto mt-6 mb-6" />
        <p
          className="text-[#f5f0e8]/50 max-w-lg mx-auto text-sm leading-relaxed"
          style={{ fontFamily: "Jost, system-ui, sans-serif" }}
        >
          Select a work from our collection, upload a photo of your space, then
          drag and resize to see how it would look on your walls.
        </p>
      </div>

      <section className="bg-[#faf7f2] py-12 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Step layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── LEFT PANEL: Controls ── */}
            <div className="lg:w-80 xl:w-96 shrink-0 space-y-8">
              {/* Step 1: Select artwork */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-7 h-7 rounded-full border border-[#c9a84c] flex items-center justify-center text-[#c9a84c] text-xs"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    1
                  </span>
                  <h2
                    className="text-[#0a0a0a] font-light text-xl"
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                    }}
                  >
                    Select Artwork
                  </h2>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {artworks.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => {
                        setSelectedArtwork(art);
                        setSavedPreview(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 border transition-all duration-200 text-left cursor-pointer ${
                        selectedArtwork?.id === art.id
                          ? "border-[#c9a84c] bg-[#c9a84c]/5"
                          : "border-[#0a0a0a]/10 hover:border-[#c9a84c]/40 bg-white"
                      }`}
                    >
                      <div className="relative w-10 h-10 shrink-0 overflow-hidden bg-[#e8e0d0]">
                        <Image
                          src={art.image}
                          alt={art.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[#0a0a0a] text-sm truncate"
                          style={{
                            fontFamily: "Cormorant Garamond, Georgia, serif",
                          }}
                        >
                          {art.title}
                        </p>
                        <p
                          className="text-[#0a0a0a]/40 text-xs truncate"
                          style={{
                            fontFamily: "Jost, system-ui, sans-serif",
                          }}
                        >
                          {art.artist}
                        </p>
                      </div>
                      {selectedArtwork?.id === art.id && (
                        <span className="text-[#c9a84c] text-xs ml-auto shrink-0">
                          ✦
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Upload room */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-7 h-7 rounded-full border border-[#c9a84c] flex items-center justify-center text-[#c9a84c] text-xs"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    2
                  </span>
                  <h2
                    className="text-[#0a0a0a] font-light text-xl"
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
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
                  className={`w-full border-2 border-dashed py-8 text-center transition-all duration-300 cursor-pointer ${
                    roomImage
                      ? "border-[#c9a84c]/60 bg-[#c9a84c]/5"
                      : "border-[#0a0a0a]/20 hover:border-[#c9a84c]/40 bg-white"
                  }`}
                >
                  {roomImage ? (
                    <div className="space-y-1">
                      <div className="text-[#c9a84c] text-2xl">✦</div>
                      <p
                        className="text-[#0a0a0a]/60 text-xs"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        Room photo uploaded
                      </p>
                      <p
                        className="text-[#c9a84c] text-xs underline"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[#0a0a0a]/20 text-3xl">⊕</div>
                      <p
                        className="text-[#0a0a0a]/50 text-xs"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        Click to upload a room photo
                      </p>
                      <p
                        className="text-[#0a0a0a]/30 text-xs"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        JPG, PNG, WEBP supported
                      </p>
                    </div>
                  )}
                </button>
              </div>

              {/* Step 3: Adjust size */}
              {selectedArtwork && roomImage && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-7 h-7 rounded-full border border-[#c9a84c] flex items-center justify-center text-[#c9a84c] text-xs"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    >
                      3
                    </span>
                    <h2
                      className="text-[#0a0a0a] font-light text-xl"
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                      }}
                    >
                      Adjust Size
                    </h2>
                  </div>

                  <div className="bg-white border border-[#0a0a0a]/10 p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[#0a0a0a]/50 text-xs tracking-wider uppercase"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        Artwork Size
                      </span>
                      <span
                        className="text-[#c9a84c] text-sm"
                        style={{
                          fontFamily: "Cormorant Garamond, Georgia, serif",
                        }}
                      >
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
                    <div
                      className="flex justify-between text-xs text-[#0a0a0a]/30"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    >
                      <span>Small</span>
                      <span>Large</span>
                    </div>

                    <p
                      className="text-[#0a0a0a]/40 text-xs pt-1"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    >
                      Drag the artwork on the canvas to reposition it
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-3 mt-4">
                    <button
                      onClick={handleSavePreview}
                      className="w-full bg-[#0a0a0a] text-[#f5f0e8] py-3.5 text-xs tracking-[0.3em] uppercase hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    >
                      {savedPreview ? "✦ Preview Saved!" : "Save Preview"}
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full border border-[#0a0a0a]/20 text-[#0a0a0a]/50 py-3 text-xs tracking-[0.3em] uppercase hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]/70 transition-all duration-300 cursor-pointer"
                      style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                    >
                      Reset Position
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT PANEL: Canvas ── */}
            <div className="flex-1 min-h-[400px]">
              {!roomImage ? (
                /* Placeholder state */
                <div className="w-full h-full min-h-[500px] bg-[#0a0a0a]/5 border-2 border-dashed border-[#0a0a0a]/15 flex flex-col items-center justify-center text-center p-10">
                  <div className="text-6xl text-[#0a0a0a]/10 mb-6 select-none">
                    🖼
                  </div>
                  <h3
                    className="text-[#0a0a0a]/30 font-light text-2xl mb-3"
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                    }}
                  >
                    Your Canvas Awaits
                  </h3>
                  <p
                    className="text-[#0a0a0a]/25 text-xs max-w-xs leading-relaxed"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    Select an artwork and upload a room photo to begin your
                    virtual placement preview.
                  </p>
                </div>
              ) : (
                /* Interactive canvas */
                <div
                  ref={canvasRef}
                  className="relative w-full overflow-hidden select-none"
                  style={{
                    minHeight: "500px",
                    cursor: isDragging ? "grabbing" : "default",
                    touchAction: "none",
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* Room image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={roomImage}
                    alt="Room"
                    className="w-full h-full object-cover"
                    style={{ minHeight: "500px", display: "block" }}
                    draggable={false}
                  />

                  {/* Dark overlay hint */}
                  {!selectedArtwork && (
                    <div className="absolute inset-0 bg-[#0a0a0a]/40 flex items-center justify-center">
                      <p
                        className="text-[#f5f0e8]/70 text-sm tracking-widest"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        ← Select an artwork to place
                      </p>
                    </div>
                  )}

                  {/* Draggable artwork overlay */}
                  {selectedArtwork && (
                    <div
                      className="absolute"
                      style={{
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
                      {/* Frame border */}
                      <div className="border-[6px] border-[#e8dcc8] bg-[#e8dcc8]">
                        <div className="border-2 border-[#d4c8b0]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedArtwork.image}
                            alt={selectedArtwork.title}
                            style={{
                              width: "100%",
                              display: "block",
                              pointerEvents: "none",
                              userSelect: "none",
                            }}
                            draggable={false}
                          />
                        </div>
                      </div>

                      {/* Artwork label */}
                      <div
                        className="absolute bottom-[-30px] left-0 right-0 text-center"
                        style={{ pointerEvents: "none" }}
                      >
                        <span
                          className="text-[#f5f0e8] text-xs bg-[#0a0a0a]/70 px-2 py-1 backdrop-blur-sm whitespace-nowrap"
                          style={{
                            fontFamily: "Cormorant Garamond, Georgia, serif",
                          }}
                        >
                          {selectedArtwork.title}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Canvas UI overlay - top right */}
                  {selectedArtwork && (
                    <div className="absolute top-3 right-3 bg-[#0a0a0a]/70 backdrop-blur-sm px-3 py-2">
                      <p
                        className="text-[#f5f0e8]/60 text-xs"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        Drag to reposition
                      </p>
                    </div>
                  )}

                  {/* Save preview banner */}
                  {savedPreview && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#c9a84c] py-3 text-center">
                      <p
                        className="text-[#0a0a0a] text-xs tracking-widest uppercase"
                        style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                      >
                        ✦ Preview Saved Successfully
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#0a0a0a]/10 pt-12">
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
              <div key={item.step} className="flex gap-4">
                <span
                  className="text-[#c9a84c]/40 text-3xl font-light shrink-0 leading-none"
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                  }}
                >
                  {item.step}
                </span>
                <div>
                  <h4
                    className="text-[#0a0a0a] font-light text-lg mb-1"
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-[#0a0a0a]/50 text-sm leading-relaxed"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
