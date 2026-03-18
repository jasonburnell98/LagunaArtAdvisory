"use client";

import { Suspense, useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// All real gallery artworks
const galleryArtworks = [
  { id: "ax-1",  title: "Dawns Return",           artist: "Alec Xavier",      dimensions: "40x50", image: "/artists/alec_xavier/dawns_return.JPG" },
  { id: "ax-2",  title: "ASK",                    artist: "Alec Xavier",      dimensions: "30x40", image: "/artists/alec_xavier/ASK.JPG" },
  { id: "ax-3",  title: "Sections",               artist: "Alec Xavier",      dimensions: "24x36", image: "/artists/alec_xavier/sections.JPG" },
  { id: "ax-4",  title: "Palms",                  artist: "Alec Xavier",      dimensions: "24x18", image: "/artists/alec_xavier/palms.JPG" },
  { id: "ax-5",  title: "Springs",                artist: "Alec Xavier",      dimensions: "28x22", image: "/artists/alec_xavier/springs.JPG" },
  { id: "ax-6",  title: "Amigo Room",             artist: "Alec Xavier",      dimensions: "48x24", image: "/artists/alec_xavier/amigo_room.JPG" },
  { id: "ax-7",  title: "Fatal Widow",            artist: "Alec Xavier",      dimensions: "24x36", image: "/artists/alec_xavier/fatal_window.JPG" },
  { id: "ax-8",  title: "Lateral",                artist: "Alec Xavier",      dimensions: "18x24", image: "/artists/alec_xavier/lateral.JPG" },
  { id: "ax-9",  title: "Tres Palms",             artist: "Alec Xavier",      dimensions: "18x24", image: "/artists/alec_xavier/tres_palms.JPG" },
  { id: "ax-10", title: "Minds Alter",            artist: "Alec Xavier",      dimensions: "18x24", image: "/artists/alec_xavier/minds_alter.JPG" },
  { id: "ax-11", title: "Sums",                   artist: "Alec Xavier",      dimensions: "18x24", image: "/artists/alec_xavier/sums.JPG" },
  { id: "ax-12", title: "Cinema",                 artist: "Alec Xavier",      dimensions: "24x36", image: "/artists/alec_xavier/cinema.JPG" },
  { id: "ax-13", title: "Ballerina",              artist: "Alec Xavier",      dimensions: null,    image: "/artists/alec_xavier/ballerina.JPG" },
  { id: "ax-14", title: "Saints",                 artist: "Alec Xavier",      dimensions: null,    image: "/artists/alec_xavier/saints.JPG" },
  { id: "ax-15", title: "Opis",                   artist: "Alec Xavier",      dimensions: null,    image: "/artists/alec_xavier/Opis.JPG" },
  { id: "ax-16", title: "Infinite Human Framed 9",artist: "Alec Xavier",      dimensions: "17x30", image: "/artists/alec_xavier/infinite_human_sn_2020_339_58.JPG" },
  { id: "ax-17", title: "Infinite Human Framed 10",artist: "Alec Xavier",     dimensions: "17x30", image: "/artists/alec_xavier/infinite_human_sn_2020_339_59.JPG" },
  { id: "eo-1",  title: "Oil/Canvas 22×28 (I)",   artist: "Emily O'Flaherty", dimensions: "22x28", image: "/artists/emily_oflaherty/oil_canvas_22_28_1.JPG" },
  { id: "eo-2",  title: "Oil/Canvas 22×28 (II)",  artist: "Emily O'Flaherty", dimensions: "22x28", image: "/artists/emily_oflaherty/oil_canvas_22_28_2.JPG" },
  { id: "eo-3",  title: "Acrylic/Canvas 20×24",   artist: "Emily O'Flaherty", dimensions: "20x24", image: "/artists/emily_oflaherty/oil_canvas_20_24.JPG" },
  { id: "eo-4",  title: "Oil/Canvas 36×24",       artist: "Emily O'Flaherty", dimensions: "36x24", image: "/artists/emily_oflaherty/oil_canvas_36_24.JPG" },
];

type ArtworkEntry = typeof galleryArtworks[number];

// ─── Helpers ────────────────────────────────────────────────────────────────

function getPinchDistance(touches: React.TouchList) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// ─── Inner tool (needs useSearchParams) ─────────────────────────────────────

function VirtualPlacementTool() {
  const searchParams = useSearchParams();

  // Artwork passed from gallery via query params
  const paramId         = searchParams.get("id");
  const paramImage      = searchParams.get("image");
  const paramTitle      = searchParams.get("title");
  const paramArtist     = searchParams.get("artist");
  const paramDimensions = searchParams.get("dimensions");

  // Build initial artwork from params, falling back to gallery list lookup
  const initialArtwork: ArtworkEntry | null = paramImage
    ? {
        id:         paramId         ?? "custom",
        image:      paramImage,
        title:      paramTitle      ?? "Untitled",
        artist:     paramArtist     ?? "",
        dimensions: paramDimensions ?? null,
      }
    : null;

  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkEntry | null>(initialArtwork);
  const [mode,            setMode]            = useState<"upload" | "camera">("upload");
  const [roomImage,       setRoomImage]       = useState<string | null>(null);
  const [cameraActive,    setCameraActive]    = useState(false);
  const [cameraError,     setCameraError]     = useState<string | null>(null);
  const [artworkSize,     setArtworkSize]     = useState(220);
  const [position,        setPosition]        = useState({ x: 60, y: 80 });
  const [isDragging,      setIsDragging]      = useState(false);
  const [dragOffset,      setDragOffset]      = useState({ x: 0, y: 0 });
  const [lastPinchDist,   setLastPinchDist]   = useState<number | null>(null);
  const [isMobile,        setIsMobile]        = useState(false);
  const [savedPreview,    setSavedPreview]    = useState(false);

  const videoRef    = useRef<HTMLVideoElement>(null);
  const streamRef   = useRef<MediaStream | null>(null);
  const canvasRef   = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detect mobile once
  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent));
  }, []);

  // If arriving from gallery on mobile, auto-start camera
  useEffect(() => {
    if (isMobile && paramImage) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ── Camera ────────────────────────────────────────────────────────────────

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      // Switch to camera mode FIRST so the <video> element mounts, then
      // the useEffect below will attach the stream once the ref is valid.
      setMode("camera");
      setCameraActive(true);
      setRoomImage(null);
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError(
        "Camera access was denied or unavailable. Please allow camera access in your browser settings, or upload a room photo instead."
      );
    }
  }, []);

  // Attach stream to video element once it is actually in the DOM
  useEffect(() => {
    if (cameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((err) => console.error("Video play failed:", err));
    }
  }, [cameraActive]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setMode("upload");
  }, []);

  // ── File upload ───────────────────────────────────────────────────────────

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (cameraActive) stopCamera();
    const url = URL.createObjectURL(file);
    setRoomImage(url);
    setMode("upload");
    setSavedPreview(false);
  };

  // ── Mouse drag (desktop) ──────────────────────────────────────────────────

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!canvasRef.current) return;
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({ x: e.clientX - rect.left - position.x, y: e.clientY - rect.top - position.y });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setPosition({
        x: Math.max(0, Math.min(e.clientX - rect.left - dragOffset.x, rect.width  - artworkSize)),
        y: Math.max(0, Math.min(e.clientY - rect.top  - dragOffset.y, rect.height - artworkSize)),
      });
    },
    [isDragging, dragOffset, artworkSize]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  // ── Touch drag + pinch-to-zoom (mobile) ──────────────────────────────────

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        setLastPinchDist(getPinchDistance(e.touches));
        setIsDragging(false);
      } else if (canvasRef.current) {
        const touch = e.touches[0];
        const rect  = canvasRef.current.getBoundingClientRect();
        setIsDragging(true);
        setDragOffset({ x: touch.clientX - rect.left - position.x, y: touch.clientY - rect.top - position.y });
      }
    },
    [position]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        // Pinch-to-zoom
        const dist = getPinchDistance(e.touches);
        if (lastPinchDist !== null) {
          const delta = dist - lastPinchDist;
          setArtworkSize((prev) => Math.max(60, Math.min(600, prev + delta)));
        }
        setLastPinchDist(dist);
      } else if (isDragging && canvasRef.current) {
        const touch = e.touches[0];
        const rect  = canvasRef.current.getBoundingClientRect();
        setPosition({
          x: Math.max(0, Math.min(touch.clientX - rect.left - dragOffset.x, rect.width  - artworkSize)),
          y: Math.max(0, Math.min(touch.clientY - rect.top  - dragOffset.y, rect.height - artworkSize)),
        });
      }
    },
    [isDragging, dragOffset, artworkSize, lastPinchDist]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setLastPinchDist(null);
  }, []);

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleReset = () => {
    setPosition({ x: 60, y: 80 });
    setArtworkSize(220);
  };

  const handleSavePreview = () => {
    setSavedPreview(true);
    setTimeout(() => setSavedPreview(false), 3000);
  };

  // Whether we have a background to place on
  const hasBackground = mode === "camera" ? cameraActive : !!roomImage;

  // ── Artwork overlay ───────────────────────────────────────────────────────

  const ArtworkOverlay = () =>
    selectedArtwork ? (
      <div
        style={{
          position:  "absolute",
          left:      position.x,
          top:       position.y,
          width:     artworkSize,
          cursor:    isDragging ? "grabbing" : "grab",
          filter:    "drop-shadow(0 8px 32px rgba(0,0,0,0.55))",
          zIndex:    10,
          touchAction: "none",
          userSelect:  "none",
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={{ border: "6px solid #e8dcc8", backgroundColor: "#e8dcc8" }}>
          <div style={{ border: "2px solid #d4c8b0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedArtwork.image}
              alt={selectedArtwork.title ?? "Artwork"}
              style={{ width: "100%", display: "block", pointerEvents: "none", userSelect: "none" }}
              draggable={false}
            />
          </div>
        </div>
        <div
          style={{
            position:   "absolute",
            bottom:     -28,
            left:       0,
            right:      0,
            textAlign:  "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily:      "Cormorant Garamond, Georgia, serif",
              color:           "#f5f0e8",
              fontSize:        "0.7rem",
              backgroundColor: "rgba(10,10,10,0.75)",
              padding:         "0.2rem 0.5rem",
              whiteSpace:      "nowrap",
            }}
          >
            {selectedArtwork.title}
          </span>
        </div>
      </div>
    ) : null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Page header */}
      <div className="page-hero" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="page-container">
          <p
            style={{
              fontFamily:    "Jost, system-ui, sans-serif",
              color:         "#c9a84c",
              letterSpacing: "0.5em",
              fontSize:      "0.75rem",
              textTransform: "uppercase",
              marginBottom:  "1rem",
            }}
          >
            Visualize Your Space
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              color:      "#f5f0e8",
              fontWeight: 300,
              fontSize:   "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            Virtual Placement
          </h1>
          <div
            style={{
              width:           "60px",
              height:          "1px",
              backgroundColor: "#c9a84c",
              margin:          "1.5rem auto",
            }}
          />
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              color:      "rgba(245,240,232,0.5)",
              maxWidth:   "34rem",
              margin:     "0 auto",
              fontSize:   "0.875rem",
              lineHeight: 1.75,
            }}
          >
            {isMobile
              ? "Point your camera at any wall to see how a piece looks in your space — drag to reposition, pinch to resize."
              : "Select a work, upload a photo of your space, then drag and resize to see exactly how it would look on your walls."}
          </p>
        </div>
      </div>

      {/* Tool section */}
      <section style={{ backgroundColor: "#faf7f2", padding: "3rem 0 5rem" }}>
        <div className="page-container">

          {/* Camera error banner */}
          {cameraError && (
            <div
              style={{
                backgroundColor: "rgba(180,60,40,0.08)",
                border:          "1px solid rgba(180,60,40,0.25)",
                padding:         "1rem 1.25rem",
                marginBottom:    "1.5rem",
                display:         "flex",
                alignItems:      "center",
                gap:             "0.75rem",
              }}
            >
              <span style={{ color: "#b43c28", fontSize: "1rem" }}>⚠</span>
              <p
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  color:      "rgba(10,10,10,0.6)",
                  fontSize:   "0.8rem",
                  lineHeight: 1.6,
                }}
              >
                {cameraError}
              </p>
            </div>
          )}

          <div className="vp-layout">

            {/* ── LEFT PANEL: Controls ── */}
            <div className="vp-controls">

              {/* Step 1: Select Artwork */}
              <div>
                <StepLabel number={1} label="Select Artwork" />
                <div
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "0.5rem",
                    maxHeight:     "20rem",
                    overflowY:     "auto",
                    paddingRight:  "0.25rem",
                  }}
                >
                  {galleryArtworks.map((art) => {
                    const active = selectedArtwork?.id === art.id;
                    return (
                      <button
                        key={art.id}
                        onClick={() => { setSelectedArtwork(art); setSavedPreview(false); }}
                        style={{
                          width:           "100%",
                          display:         "flex",
                          alignItems:      "center",
                          gap:             "0.75rem",
                          padding:         "0.75rem",
                          border:          active ? "1px solid #c9a84c" : "1px solid rgba(10,10,10,0.1)",
                          backgroundColor: active ? "rgba(201,168,76,0.05)" : "#fff",
                          textAlign:       "left",
                          cursor:          "pointer",
                          transition:      "all 0.2s",
                        }}
                      >
                        <div
                          style={{
                            width:    "2.5rem",
                            height:   "2.5rem",
                            flexShrink: 0,
                            position: "relative",
                            overflow: "hidden",
                            backgroundColor: "#e8e0d0",
                          }}
                        >
                          <Image src={art.image} alt={art.title ?? art.artist} fill className="object-cover" />
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p
                            style={{
                              fontFamily:    "Cormorant Garamond, Georgia, serif",
                              color:         "#0a0a0a",
                              fontSize:      "0.875rem",
                              overflow:      "hidden",
                              textOverflow:  "ellipsis",
                              whiteSpace:    "nowrap",
                            }}
                          >
                            {art.title}
                          </p>
                          <p
                            style={{
                              fontFamily:   "Jost, system-ui, sans-serif",
                              color:        "rgba(10,10,10,0.4)",
                              fontSize:     "0.7rem",
                              overflow:     "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace:   "nowrap",
                            }}
                          >
                            {art.artist}{art.dimensions ? ` · ${art.dimensions}"` : ""}
                          </p>
                        </div>
                        {active && (
                          <span style={{ color: "#c9a84c", fontSize: "0.75rem", flexShrink: 0 }}>✦</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Background source */}
              <div>
                <StepLabel number={2} label="Set Your Background" />

                {/* Camera button */}
                <button
                  onClick={cameraActive ? stopCamera : startCamera}
                  style={{
                    width:           "100%",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    gap:             "0.6rem",
                    padding:         "0.875rem",
                    marginBottom:    "0.75rem",
                    backgroundColor: cameraActive ? "#0a0a0a" : "transparent",
                    border:          cameraActive ? "1px solid #0a0a0a" : "1px solid rgba(10,10,10,0.25)",
                    color:           cameraActive ? "#f5f0e8" : "rgba(10,10,10,0.7)",
                    fontSize:        "0.75rem",
                    letterSpacing:   "0.2em",
                    textTransform:   "uppercase",
                    fontFamily:      "Jost, system-ui, sans-serif",
                    cursor:          "pointer",
                    transition:      "all 0.3s",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{cameraActive ? "⏹" : "📷"}</span>
                  {cameraActive ? "Stop Camera" : "Use Live Camera (AR)"}
                </button>

                {/* Divider */}
                <div
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    gap:            "0.75rem",
                    marginBottom:   "0.75rem",
                  }}
                >
                  <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(10,10,10,0.1)" }} />
                  <span
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      color:      "rgba(10,10,10,0.3)",
                      fontSize:   "0.7rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    or
                  </span>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(10,10,10,0.1)" }} />
                </div>

                {/* File upload */}
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
                    width:           "100%",
                    border:          roomImage && mode === "upload" ? "2px dashed rgba(201,168,76,0.6)" : "2px dashed rgba(10,10,10,0.2)",
                    backgroundColor: roomImage && mode === "upload" ? "rgba(201,168,76,0.05)" : "#fff",
                    padding:         "1.5rem",
                    textAlign:       "center",
                    cursor:          "pointer",
                    transition:      "all 0.3s",
                  }}
                >
                  {roomImage && mode === "upload" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <div style={{ color: "#c9a84c", fontSize: "1.25rem" }}>✦</div>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(10,10,10,0.6)", fontSize: "0.75rem" }}>
                        Room photo uploaded
                      </p>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "#c9a84c", fontSize: "0.75rem", textDecoration: "underline" }}>
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <div style={{ color: "rgba(10,10,10,0.2)", fontSize: "1.5rem" }}>⊕</div>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(10,10,10,0.5)", fontSize: "0.75rem" }}>
                        Upload a room photo
                      </p>
                      <p style={{ fontFamily: "Jost, system-ui, sans-serif", color: "rgba(10,10,10,0.3)", fontSize: "0.7rem" }}>
                        JPG, PNG, WEBP
                      </p>
                    </div>
                  )}
                </button>
              </div>

              {/* Step 3: Adjust (shown once background + artwork selected) */}
              {selectedArtwork && hasBackground && (
                <div>
                  <StepLabel number={3} label="Adjust Size" />
                  <div
                    style={{
                      backgroundColor: "#fff",
                      border:          "1px solid rgba(10,10,10,0.1)",
                      padding:         "1.25rem",
                      display:         "flex",
                      flexDirection:   "column",
                      gap:             "0.9rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          fontFamily:    "Jost, system-ui, sans-serif",
                          color:         "rgba(10,10,10,0.5)",
                          fontSize:      "0.75rem",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        Artwork Size
                      </span>
                      <span
                        style={{
                          fontFamily: "Cormorant Garamond, Georgia, serif",
                          color:      "#c9a84c",
                          fontSize:   "0.875rem",
                        }}
                      >
                        {artworkSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={60}
                      max={600}
                      value={artworkSize}
                      onChange={(e) => setArtworkSize(Number(e.target.value))}
                      className="w-full accent-[#c9a84c] cursor-pointer"
                    />
                    <div
                      style={{
                        display:        "flex",
                        justifyContent: "space-between",
                        fontSize:       "0.7rem",
                        color:          "rgba(10,10,10,0.3)",
                        fontFamily:     "Jost, system-ui, sans-serif",
                      }}
                    >
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                    <p
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        color:      "rgba(10,10,10,0.4)",
                        fontSize:   "0.7rem",
                      }}
                    >
                      {isMobile
                        ? "Drag to reposition · Pinch with two fingers to resize"
                        : "Drag the artwork on the canvas to reposition it"}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
                    <button
                      onClick={handleSavePreview}
                      style={{
                        width:           "100%",
                        backgroundColor: "#0a0a0a",
                        color:           "#f5f0e8",
                        padding:         "0.875rem",
                        fontSize:        "0.75rem",
                        letterSpacing:   "0.3em",
                        textTransform:   "uppercase",
                        fontFamily:      "Jost, system-ui, sans-serif",
                        border:          "none",
                        cursor:          "pointer",
                        transition:      "background-color 0.3s",
                      }}
                    >
                      {savedPreview ? "✦ Preview Noted!" : "Share / Save Preview"}
                    </button>
                    <button
                      onClick={handleReset}
                      style={{
                        width:           "100%",
                        border:          "1px solid rgba(10,10,10,0.2)",
                        color:           "rgba(10,10,10,0.5)",
                        padding:         "0.75rem",
                        fontSize:        "0.75rem",
                        letterSpacing:   "0.3em",
                        textTransform:   "uppercase",
                        fontFamily:      "Jost, system-ui, sans-serif",
                        backgroundColor: "transparent",
                        cursor:          "pointer",
                      }}
                    >
                      Reset Position
                    </button>
                  </div>
                </div>
              )}

              {/* Back to gallery */}
              <Link
                href="/gallery"
                style={{
                  display:       "block",
                  textAlign:     "center",
                  fontFamily:    "Jost, system-ui, sans-serif",
                  color:         "rgba(10,10,10,0.4)",
                  fontSize:      "0.75rem",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  marginTop:     "0.5rem",
                }}
              >
                ← Back to Collection
              </Link>
            </div>

            {/* ── RIGHT PANEL: Canvas / Camera ── */}
            <div style={{ flex: 1, minHeight: "400px", position: "relative" }}>

              {/* ── Camera mode ── */}
              {mode === "camera" && (
                <div
                  ref={canvasRef}
                  className="ar-canvas"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    position:        "relative",
                    width:           "100%",
                    height:          "500px",
                    overflow:        "hidden",
                    touchAction:     "none",
                    userSelect:      "none",
                    cursor:          isDragging ? "grabbing" : "default",
                    backgroundColor: "#000",
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      position:  "absolute",
                      inset:     0,
                      width:     "100%",
                      height:    "100%",
                      objectFit: "cover",
                      display:   "block",
                    }}
                  />

                  {!selectedArtwork && (
                    <div
                      style={{
                        position:        "absolute",
                        inset:           0,
                        backgroundColor: "rgba(10,10,10,0.4)",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                      }}
                    >
                      <p
                        style={{
                          fontFamily:    "Jost, system-ui, sans-serif",
                          color:         "rgba(245,240,232,0.8)",
                          fontSize:      "0.875rem",
                          letterSpacing: "0.1em",
                        }}
                      >
                        ← Select an artwork to place
                      </p>
                    </div>
                  )}

                  <ArtworkOverlay />

                  {/* AR badge */}
                  <div
                    style={{
                      position:        "absolute",
                      top:             "0.75rem",
                      left:            "0.75rem",
                      backgroundColor: "rgba(201,168,76,0.9)",
                      padding:         "0.3rem 0.75rem",
                      display:         "flex",
                      alignItems:      "center",
                      gap:             "0.4rem",
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#0a0a0a", display: "inline-block" }} />
                    <span
                      style={{
                        fontFamily:    "Jost, system-ui, sans-serif",
                        color:         "#0a0a0a",
                        fontSize:      "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight:    600,
                      }}
                    >
                      Live AR
                    </span>
                  </div>

                  {selectedArtwork && (
                    <div
                      style={{
                        position:        "absolute",
                        top:             "0.75rem",
                        right:           "0.75rem",
                        backgroundColor: "rgba(10,10,10,0.65)",
                        backdropFilter:  "blur(4px)",
                        padding:         "0.5rem 0.75rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          color:      "rgba(245,240,232,0.7)",
                          fontSize:   "0.7rem",
                        }}
                      >
                        {isMobile ? "Drag · Pinch to resize" : "Drag to reposition"}
                      </p>
                    </div>
                  )}

                  {savedPreview && (
                    <div
                      style={{
                        position:        "absolute",
                        bottom:          0,
                        left:            0,
                        right:           0,
                        backgroundColor: "#c9a84c",
                        padding:         "0.75rem",
                        textAlign:       "center",
                      }}
                    >
                      <p
                        style={{
                          fontFamily:    "Jost, system-ui, sans-serif",
                          color:         "#0a0a0a",
                          fontSize:      "0.75rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        ✦ Screenshot your screen to save this preview
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── Upload / photo mode ── */}
              {mode === "upload" && (
                <>
                  {!roomImage ? (
                    <div
                      style={{
                        width:           "100%",
                        minHeight:       "500px",
                        backgroundColor: "rgba(10,10,10,0.05)",
                        border:          "2px dashed rgba(10,10,10,0.15)",
                        display:         "flex",
                        flexDirection:   "column",
                        alignItems:      "center",
                        justifyContent:  "center",
                        textAlign:       "center",
                        padding:         "2.5rem",
                        gap:             "1rem",
                      }}
                    >
                      <div style={{ fontSize: "3.5rem", color: "rgba(10,10,10,0.1)" }}>🖼</div>
                      <h3
                        style={{
                          fontFamily: "Cormorant Garamond, Georgia, serif",
                          color:      "rgba(10,10,10,0.3)",
                          fontWeight: 300,
                          fontSize:   "1.5rem",
                        }}
                      >
                        Your Canvas Awaits
                      </h3>
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          color:      "rgba(10,10,10,0.25)",
                          fontSize:   "0.8rem",
                          maxWidth:   "20rem",
                          lineHeight: 1.75,
                        }}
                      >
                        {isMobile
                          ? 'Tap "Use Live Camera" to see artwork in your room in real time, or upload a photo of your wall.'
                          : 'Use the live camera on your phone for real-time AR, or upload a photo of your wall to get started.'}
                      </p>
                      <button
                        onClick={startCamera}
                        style={{
                          marginTop:       "0.5rem",
                          backgroundColor: "#0a0a0a",
                          color:           "#f5f0e8",
                          border:          "none",
                          padding:         "0.875rem 2rem",
                          fontSize:        "0.75rem",
                          letterSpacing:   "0.2em",
                          textTransform:   "uppercase",
                          fontFamily:      "Jost, system-ui, sans-serif",
                          cursor:          "pointer",
                        }}
                      >
                        📷 Open Camera
                      </button>
                    </div>
                  ) : (
                    <div
                      ref={canvasRef}
                      style={{
                        position:    "relative",
                        width:       "100%",
                        overflow:    "hidden",
                        touchAction: "none",
                        userSelect:  "none",
                        cursor:      isDragging ? "grabbing" : "default",
                        minHeight:   "500px",
                      }}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={roomImage}
                        alt="Room"
                        style={{
                          width:     "100%",
                          height:    "100%",
                          minHeight: "500px",
                          objectFit: "cover",
                          display:   "block",
                        }}
                        draggable={false}
                      />

                      {!selectedArtwork && (
                        <div
                          style={{
                            position:        "absolute",
                            inset:           0,
                            backgroundColor: "rgba(10,10,10,0.4)",
                            display:         "flex",
                            alignItems:      "center",
                            justifyContent:  "center",
                          }}
                        >
                          <p
                            style={{
                              fontFamily:    "Jost, system-ui, sans-serif",
                              color:         "rgba(245,240,232,0.8)",
                              fontSize:      "0.875rem",
                              letterSpacing: "0.1em",
                            }}
                          >
                            ← Select an artwork to place
                          </p>
                        </div>
                      )}

                      <ArtworkOverlay />

                      {selectedArtwork && (
                        <div
                          style={{
                            position:        "absolute",
                            top:             "0.75rem",
                            right:           "0.75rem",
                            backgroundColor: "rgba(10,10,10,0.65)",
                            backdropFilter:  "blur(4px)",
                            padding:         "0.5rem 0.75rem",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "Jost, system-ui, sans-serif",
                              color:      "rgba(245,240,232,0.7)",
                              fontSize:   "0.7rem",
                            }}
                          >
                            {isMobile ? "Drag · Pinch to resize" : "Drag to reposition"}
                          </p>
                        </div>
                      )}

                      {savedPreview && (
                        <div
                          style={{
                            position:        "absolute",
                            bottom:          0,
                            left:            0,
                            right:           0,
                            backgroundColor: "#c9a84c",
                            padding:         "0.75rem",
                            textAlign:       "center",
                          }}
                        >
                          <p
                            style={{
                              fontFamily:    "Jost, system-ui, sans-serif",
                              color:         "#0a0a0a",
                              fontSize:      "0.75rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            ✦ Preview Saved Successfully
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* How it works */}
          <div
            className="section-grid"
            style={{
              marginTop:  "4rem",
              paddingTop: "3rem",
              borderTop:  "1px solid rgba(10,10,10,0.1)",
            }}
          >
            {[
              {
                step:  "01",
                title: "Choose Your Work",
                desc:  "Browse our curated collection and select the piece that speaks to you.",
              },
              {
                step:  "02",
                title: isMobile ? "Open the Camera" : "Upload Your Space",
                desc:  isMobile
                  ? "Tap 'Use Live Camera' and point at your wall for a real-time AR preview."
                  : "Photograph your wall and upload the image, or use the live camera on your phone.",
              },
              {
                step:  "03",
                title: "Visualize & Decide",
                desc:  "Drag to reposition, pinch or slide to resize, and see the transformation instantly.",
              },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: "1rem" }}>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    color:      "rgba(201,168,76,0.4)",
                    fontSize:   "1.875rem",
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
                      color:      "#0a0a0a",
                      fontWeight: 300,
                      fontSize:   "1.125rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      color:      "rgba(10,10,10,0.5)",
                      fontSize:   "0.875rem",
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
          width: 22rem;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .ar-canvas {
          border-radius: 0;
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

// ─── Step label helper ───────────────────────────────────────────────────────

function StepLabel({ number, label }: { number: number; label: string }) {
  return (
    <div
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          "0.75rem",
        marginBottom: "1rem",
      }}
    >
      <span
        style={{
          width:          "1.75rem",
          height:         "1.75rem",
          borderRadius:   "50%",
          border:         "1px solid #c9a84c",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          color:          "#c9a84c",
          fontSize:       "0.75rem",
          flexShrink:     0,
          fontFamily:     "Jost, system-ui, sans-serif",
        }}
      >
        {number}
      </span>
      <h2
        style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          color:      "#0a0a0a",
          fontWeight: 300,
          fontSize:   "1.25rem",
        }}
      >
        {label}
      </h2>
    </div>
  );
}

// ─── Page export (wrapped in Suspense for useSearchParams) ───────────────────

export default function VirtualPlacementPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight:       "60vh",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontFamily:      "Jost, system-ui, sans-serif",
            color:           "rgba(10,10,10,0.3)",
            fontSize:        "0.875rem",
            letterSpacing:   "0.1em",
          }}
        >
          Loading…
        </div>
      }
    >
      <VirtualPlacementTool />
    </Suspense>
  );
}
