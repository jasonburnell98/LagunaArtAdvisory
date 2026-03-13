import Link from "next/link";
import Image from "next/image";

const featuredWorks = [
  {
    id: 1,
    title: "Coastal Reverie",
    artist: "Elara Montclair",
    image: "https://picsum.photos/seed/art1/600/750",
  },
  {
    id: 2,
    title: "Golden Hour Study",
    artist: "Marcus Delacroix",
    image: "https://picsum.photos/seed/art2/600/750",
  },
  {
    id: 3,
    title: "Serenity in Form",
    artist: "Vivienne Hartwell",
    image: "https://picsum.photos/seed/art3/600/750",
  },
];

const services = [
  {
    icon: "✦",
    title: "Curated Exhibitions",
    description:
      "We present 6–8 thoughtfully curated exhibitions per year — solo shows for represented artists and occasional themed group exhibitions — allowing collectors to experience cohesive bodies of work in meaningful context.",
  },
  {
    icon: "✦",
    title: "Collector Advisory",
    description:
      "Private consultations for collectors building or refining a collection. We provide guidance rooted in curatorial insight, market awareness, and deep respect for artistic vision — from first acquisition to long-term collection strategy.",
  },
  {
    icon: "✦",
    title: "Artwork Placement",
    description:
      "We place exceptional contemporary work in private residences, offices, and hospitality spaces. Our advisors assess architecture, lighting, and environment to ensure each piece resonates in its new home.",
  },
  {
    icon: "✦",
    title: "Artist Development",
    description:
      "Studio visits, portfolio reviews, career guidance, and direct collector introductions. We cultivate lasting relationships between artists and the collectors who champion their work.",
  },
  {
    icon: "✦",
    title: "Private Sales",
    description:
      "Discreet placement of artworks outside of public exhibitions, including access to works held in private collections, commissions, and special projects.",
  },
  {
    icon: "✦",
    title: "Community & Events",
    description:
      "Collector preview nights before public openings, artist talks, and curated gatherings that build meaningful connections between artists and the people who collect their work.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      >
        {/* Background texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("https://picsum.photos/seed/hero-bg/1920/1080")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(40%) brightness(0.4)",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />

        {/* Gold line accents */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <p
            className="text-[#c9a84c] tracking-[0.5em] text-xs uppercase mb-6 opacity-0 animate-[fadeInDown_1s_0.2s_forwards]"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Contemporary Gallery & Art Advisory · Laguna Beach, California
          </p>

          {/* Main heading */}
          <h1
            className="text-[#f5f0e8] font-light leading-none mb-6 opacity-0 animate-[fadeInDown_1s_0.5s_forwards]"
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "0.02em",
            }}
          >
            Laguna
            <br />
            <em className="text-[#c9a84c] not-italic">Art Advisory</em>
          </h1>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-[fadeIn_1s_0.8s_forwards]">
            <div className="h-px w-12 bg-[#c9a84c]/60" />
            <span className="text-[#c9a84c] text-xs">✦</span>
            <div className="h-px w-12 bg-[#c9a84c]/60" />
          </div>

          {/* Tagline */}
          <p
            className="text-[#f5f0e8]/70 text-lg md:text-xl font-light tracking-widest mb-12 opacity-0 animate-[fadeInUp_1s_1s_forwards]"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Discovering Artists. Building Collections. Shaping Legacies.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeInUp_1s_1.2s_forwards]">
            <Link
              href="/gallery"
              className="group relative overflow-hidden bg-[#c9a84c] text-[#0a0a0a] px-10 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              <span className="relative z-10">Browse Collection</span>
              <div className="absolute inset-0 bg-[#e8c97d] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              href="/consultation"
              className="border border-[#f5f0e8]/40 text-[#f5f0e8]/80 px-10 py-4 text-xs tracking-[0.3em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_2s_forwards]">
          <p
            className="text-[#f5f0e8]/40 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Scroll
          </p>
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c]/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── FEATURED WORKS ── */}
      <section
        id="featured"
        style={{ backgroundColor: "#f5f0e8", padding: "6rem 0" }}
      >
        {/* Centered container */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                color: "#c9a84c",
                letterSpacing: "0.4em",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Current Exhibition
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                color: "#0a0a0a",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              Featured Works
            </h2>
            <div
              style={{
                width: "60px",
                height: "1px",
                backgroundColor: "#c9a84c",
                margin: "1.5rem auto 0",
              }}
            />
          </div>

          {/* Artwork grid */}
          <div className="section-grid" style={{ gap: "2rem" }}>
            {featuredWorks.map((work) => (
              <div
                key={work.id}
                className="group cursor-pointer"
                style={{ width: "100%" }}
              >
                <div
                  className="relative overflow-hidden bg-[#e8e0d0]"
                  style={{ aspectRatio: "4/5", position: "relative" }}
                >
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/20 transition-all duration-500" />
                </div>
                <div style={{ paddingTop: "1rem", paddingBottom: "0.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      color: "#0a0a0a",
                      fontSize: "1.125rem",
                      fontWeight: 300,
                    }}
                  >
                    {work.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      color: "rgba(10,10,10,0.5)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: "0.25rem",
                    }}
                  >
                    {work.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA link */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              href="/gallery"
              className="inline-block border border-[#0a0a0a]/30 text-[#0a0a0a]/70 px-10 py-3.5 text-xs tracking-[0.3em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        style={{ backgroundColor: "#0a0a0a", padding: "6rem 0" }}
      >
        {/* Centered container */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                color: "#c9a84c",
                letterSpacing: "0.4em",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              What We Offer
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                color: "#f5f0e8",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              Advisory Services
            </h2>
            <div
              style={{
                width: "60px",
                height: "1px",
                backgroundColor: "#c9a84c",
                margin: "1.5rem auto 0",
              }}
            />
          </div>

          {/* Services grid */}
          <div className="section-grid" style={{ gap: "2rem" }}>
            {services.map((service) => (
              <div
                key={service.title}
                className="border border-[#f5f0e8]/10 hover:border-[#c9a84c]/40 transition-all duration-500 group"
                style={{ padding: "2rem" }}
              >
                <span
                  style={{
                    color: "#c9a84c",
                    fontSize: "0.875rem",
                    display: "block",
                    marginBottom: "1rem",
                  }}
                >
                  {service.icon}
                </span>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    color: "#f5f0e8",
                    fontSize: "1.25rem",
                    fontWeight: 300,
                    marginBottom: "0.75rem",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    color: "rgba(245,240,232,0.5)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                  }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        id="cta"
        className="relative overflow-hidden bg-[#1a1a1a]"
        style={{ padding: "8rem 0" }}
      >
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://picsum.photos/seed/cta-bg/1920/600"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-[#0a0a0a]/90" />

        <div
          className="relative z-10"
          style={{
            maxWidth: "42rem",
            margin: "0 auto",
            padding: "0 2rem",
            textAlign: "center",
          }}
        >
          <p
            className="text-[#c9a84c] tracking-[0.4em] text-xs uppercase mb-6"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Begin Your Journey
          </p>
          <h2
            className="text-[#f5f0e8] font-light mb-6"
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            Discover Artists Early.
            <br />
            <em className="text-[#c9a84c] not-italic">Build Something Lasting.</em>
          </h2>
          <p
            className="text-[#f5f0e8]/50 text-sm leading-relaxed mb-10"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Whether you are building a new collection or refining an existing one,
            we provide guidance rooted in curatorial insight and a deep respect for
            artistic vision. Schedule a private consultation — complimentary and
            tailored entirely to you.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-[#c9a84c] text-[#0a0a0a] px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#e8c97d] transition-all duration-300"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Book a Consultation
          </Link>
        </div>
      </section>

      {/* Responsive styles for grids */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Section grid — 3 cols desktop, 2 cols tablet, 1 col mobile */
        .section-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 768px) {
          .section-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .section-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
