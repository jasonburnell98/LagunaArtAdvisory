import Image from "next/image";
import Link from "next/link";

const artworks = [
  {
    id: 1,
    title: "Coastal Reverie",
    artist: "Elara Montclair",
    medium: "Oil on Canvas",
    dimensions: "48 × 60 in",
    year: 2024,
    price: "$6,500",
    image: "https://picsum.photos/seed/artwork1/600/700",
  },
  {
    id: 2,
    title: "Golden Hour Study",
    artist: "Marcus Delacroix",
    medium: "Oil on Linen",
    dimensions: "30 × 40 in",
    year: 2023,
    price: "$3,200",
    image: "https://picsum.photos/seed/artwork2/600/700",
  },
  {
    id: 3,
    title: "Serenity in Form",
    artist: "Vivienne Hartwell",
    medium: "Mixed Media on Panel",
    dimensions: "40 × 50 in",
    year: 2024,
    price: "$4,800",
    image: "https://picsum.photos/seed/artwork3/600/700",
  },
  {
    id: 4,
    title: "The Blue Meridian",
    artist: "James Okafor",
    medium: "Works on Paper",
    dimensions: "24 × 30 in",
    year: 2023,
    price: "$1,800",
    image: "https://picsum.photos/seed/artwork4/600/700",
  },
  {
    id: 5,
    title: "Nocturne No. 7",
    artist: "Sofia Vèritas",
    medium: "Ceramic Sculpture",
    dimensions: "14 × 10 × 10 in",
    year: 2024,
    price: "$3,500",
    image: "https://picsum.photos/seed/artwork5/600/700",
  },
  {
    id: 6,
    title: "Amber Passage",
    artist: "Thomas Crane",
    medium: "Oil on Canvas",
    dimensions: "60 × 72 in",
    year: 2023,
    price: "$9,000",
    image: "https://picsum.photos/seed/artwork6/600/700",
  },
];

export default function GalleryPage() {
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

      {/* Gallery grid */}
      <section style={{ backgroundColor: "#faf7f2", padding: "5rem 0" }}>
        <div className="page-container">
          <div className="section-grid">
            {artworks.map((work) => (
              <article
                key={work.id}
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
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/30 transition-all duration-500 flex items-center justify-center">
                    <Link
                      href="/virtual-placement"
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
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                        color: "#0a0a0a",
                        fontSize: "1.125rem",
                        fontWeight: 300,
                        lineHeight: 1.3,
                      }}
                    >
                      {work.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                        color: "#c9a84c",
                        fontSize: "0.875rem",
                        fontWeight: 300,
                        marginLeft: "1rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {work.price}
                    </span>
                  </div>
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
                  </p>
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "rgba(10,10,10,0.08)",
                      marginBottom: "0.75rem",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.75rem",
                      color: "rgba(10,10,10,0.4)",
                      marginBottom: "1.25rem",
                      fontFamily: "Jost, system-ui, sans-serif",
                    }}
                  >
                    <span>{work.medium}</span>
                    <span>{work.dimensions}</span>
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
            ))}
          </div>

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
