import Image from "next/image";
import Link from "next/link";

const alecXavierWorks = [
  {
    id: "ax-1",
    title: "Dawns Return",
    artist: "Alec Xavier",
    year: 2024,
    medium: "Acrylic/Canvas",
    dimensions: "40x50",
    sn: "SN/2024.001.01",
    image: "/artists/alec_xavier/dawns_return.JPG",
  },
  {
    id: "ax-2",
    title: "ASK",
    artist: "Alec Xavier",
    year: 2026,
    medium: "Acrylic/Canvas",
    dimensions: "30x40",
    sn: "SN/2026.001.01",
    image: "/artists/alec_xavier/ASK.JPG",
  },
  {
    id: "ax-3",
    title: "Sections",
    artist: "Alec Xavier",
    year: 2021,
    medium: "Acrylic/Canvas",
    dimensions: "24x36",
    sn: "SN/2022.002.012",
    image: "/artists/alec_xavier/sections.JPG",
  },
  {
    id: "ax-4",
    title: "Palms",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "24x18",
    sn: "SN/2025.001.01",
    image: "/artists/alec_xavier/palms.JPG",
  },
  {
    id: "ax-5",
    title: "Springs",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "28x22",
    sn: "SN/2025.001.02",
    image: "/artists/alec_xavier/springs.JPG",
  },
  {
    id: "ax-6",
    title: "Amigo Room",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "48x24",
    sn: "SN/2025.001.03",
    image: "/artists/alec_xavier/amigo_room.JPG",
  },
  {
    id: "ax-7",
    title: "Fatal Widow",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "24x36",
    sn: "SN/2025.001.03",
    image: "/artists/alec_xavier/fatal_window.JPG",
  },
  {
    id: "ax-8",
    title: "Lateral",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "18x24",
    sn: "SN/2025.001.05",
    image: "/artists/alec_xavier/lateral.JPG",
  },
  {
    id: "ax-9",
    title: "Tres Palms",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "18x24",
    sn: "SN/2025.001.06",
    image: "/artists/alec_xavier/tres_palms.JPG",
  },
  {
    id: "ax-10",
    title: "Minds Alter",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "18x24",
    sn: "SN/2025.001.07",
    image: "/artists/alec_xavier/minds_alter.JPG",
  },
  {
    id: "ax-11",
    title: "Sums",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "18x24",
    sn: "SN/2025.001.08",
    image: "/artists/alec_xavier/sums.JPG",
  },
  {
    id: "ax-12",
    title: "Cinema",
    artist: "Alec Xavier",
    year: 2025,
    medium: "Acrylic/Canvas",
    dimensions: "24x36",
    sn: "SN/2024.001.11",
    image: "/artists/alec_xavier/cinema.JPG",
  },
  {
    id: "ax-13",
    title: "Ballerina",
    artist: "Alec Xavier",
    year: 2026,
    medium: "Acrylic/Canvas",
    dimensions: null,
    sn: "SN/2026.001.12",
    image: "/artists/alec_xavier/ballerina.JPG",
  },
  {
    id: "ax-14",
    title: "Saints",
    artist: "Alec Xavier",
    year: null,
    medium: "Oil/Canvas",
    dimensions: null,
    sn: "SN/2026.001.13",
    image: "/artists/alec_xavier/saints.JPG",
  },
  {
    id: "ax-15",
    title: "Opis",
    artist: "Alec Xavier",
    year: null,
    medium: "Acrylic/Canvas",
    dimensions: null,
    sn: "SN/2026.001.13",
    image: "/artists/alec_xavier/Opis.JPG",
  },
  {
    id: "ax-16",
    title: "Infinite Human Framed 9",
    artist: "Alec Xavier",
    year: 2020,
    medium: "Digital Art",
    dimensions: "17x30",
    sn: "SN/2020.339.58",
    image: "/artists/alec_xavier/infinite_human_sn_2020_339_58.JPG",
  },
  {
    id: "ax-17",
    title: "Infinite Human Framed 10",
    artist: "Alec Xavier",
    year: 2020,
    medium: "Digital Art",
    dimensions: "17x30",
    sn: "SN/2020.339.59",
    image: "/artists/alec_xavier/infinite_human_sn_2020_339_59.JPG",
  },
];

const emilyOflaherty = [
  {
    id: "eo-1",
    title: null,
    artist: "Emily O'Flaherty",
    year: 2026,
    medium: "Oil/Canvas",
    dimensions: "22x28",
    sn: null,
    image: "/artists/emily_oflaherty/oil_canvas_22_28_1.JPG",
  },
  {
    id: "eo-2",
    title: null,
    artist: "Emily O'Flaherty",
    year: 2026,
    medium: "Oil/Canvas",
    dimensions: "22x28",
    sn: null,
    image: "/artists/emily_oflaherty/oil_canvas_22_28_2.JPG",
  },
  {
    id: "eo-3",
    title: null,
    artist: "Emily O'Flaherty",
    year: 2026,
    medium: "Acrylic/Canvas",
    dimensions: "20x24",
    sn: "SN/2020.339.52",
    image: "/artists/emily_oflaherty/oil_canvas_20_24.JPG",
  },
  {
    id: "eo-4",
    title: null,
    artist: "Emily O'Flaherty",
    year: 2026,
    medium: "Oil/Canvas",
    dimensions: "36x24",
    sn: null,
    image: "/artists/emily_oflaherty/oil_canvas_36_24.JPG",
  },
];

type Artwork = {
  id: string;
  title: string | null;
  artist: string;
  year: number | null;
  medium: string;
  dimensions: string | null;
  sn: string | null;
  image: string;
};

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

function ArtworkCard({ work }: { work: Artwork }) {
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
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/30 transition-all duration-500 flex items-center justify-center">
          <Link
            href={buildPreviewUrl(work)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#f5f0e8]/10 backdrop-blur-sm border border-[#f5f0e8]/40 text-[#f5f0e8] text-xs tracking-[0.2em] uppercase px-4 py-2 hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Preview in Room
          </Link>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            marginBottom: "0.25rem",
          }}
        >
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
            {work.artist}{work.year ? ` (${work.year})` : ""}
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
        <button
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
      </div>
    </article>
  );
}

function ArtistSection({
  artist,
  bio,
  works,
}: {
  artist: string;
  bio: string;
  works: Artwork[];
}) {
  return (
    <div style={{ marginBottom: "5rem" }}>
      {/* Artist heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "2.5rem",
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
            {bio}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="section-grid">
        {works.map((work) => (
          <ArtworkCard key={work.id} work={work} />
        ))}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <>
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

      {/* Gallery */}
      <section style={{ backgroundColor: "#faf7f2", padding: "5rem 0" }}>
        <div className="page-container">

          <ArtistSection
            artist="Alec Xavier"
            bio="Available Works"
            works={alecXavierWorks}
          />

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(10,10,10,0.1)",
              margin: "2rem 0 5rem",
            }}
          />

          <ArtistSection
            artist="Emily O'Flaherty"
            bio="Available Works"
            works={emilyOflaherty}
          />

          {/* Advisory note */}
          <div
            className="two-col-grid"
            style={{
              marginTop: "5rem",
              border: "1px solid rgba(10,10,10,0.1)",
            }}
          >
            {/* Collector pitch */}
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

            {/* Artist open call */}
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
                sculpture, and mixed media, and aim to build lasting
                relationships that support both artistic growth and meaningful
                placement of work.
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
        </div>
      </section>
    </>
  );
}
