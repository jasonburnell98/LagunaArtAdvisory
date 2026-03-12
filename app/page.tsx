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
    title: "Private Collection Curation",
    description:
      "We source and authenticate works from leading galleries, estates, and emerging artists worldwide, tailored to your aesthetic vision.",
  },
  {
    icon: "✦",
    title: "Artwork Placement",
    description:
      "Our advisors work directly in your space — home, office, or hotel — to ensure each piece enhances the architectural dialogue.",
  },
  {
    icon: "✦",
    title: "Investment Advisory",
    description:
      "Informed by decades of market knowledge, we guide collectors toward acquisitions that hold both cultural and financial value.",
  },
  {
    icon: "✦",
    title: "Virtual Preview",
    description:
      "Experience how an artwork will look in your space before committing, using our digital placement technology.",
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
            Est. 2008 · Laguna Beach, California
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
            Curating Fine Art for Discerning Collectors
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
      <section id="featured" className="bg-[#f5f0e8] py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-[#c9a84c] tracking-[0.4em] text-xs uppercase mb-4"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Current Exhibition
            </p>
            <h2
              className="text-[#0a0a0a] font-light"
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Featured Works
            </h2>
            <div className="gold-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorks.map((work) => (
              <div key={work.id} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-[#e8e0d0] aspect-[4/5]">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/20 transition-all duration-500" />
                </div>
                <div className="pt-4 pb-2">
                  <h3
                    className="text-[#0a0a0a] text-lg font-light"
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                    }}
                  >
                    {work.title}
                  </h3>
                  <p
                    className="text-[#0a0a0a]/50 text-xs tracking-widest uppercase mt-1"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    {work.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
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
      <section id="services" className="bg-[#0a0a0a] py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-[#c9a84c] tracking-[0.4em] text-xs uppercase mb-4"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              What We Offer
            </p>
            <h2
              className="text-[#f5f0e8] font-light"
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Advisory Services
            </h2>
            <div className="h-px w-16 bg-[#c9a84c] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="border border-[#f5f0e8]/10 p-8 hover:border-[#c9a84c]/40 transition-all duration-500 group"
              >
                <span className="text-[#c9a84c] text-sm block mb-4">
                  {service.icon}
                </span>
                <h3
                  className="text-[#f5f0e8] text-xl font-light mb-3"
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-[#f5f0e8]/50 text-sm leading-relaxed"
                  style={{ fontFamily: "Jost, system-ui, sans-serif" }}
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
        className="relative py-32 px-6 overflow-hidden bg-[#1a1a1a]"
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

        <div className="relative z-10 text-center max-w-2xl mx-auto">
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
            Let Us Curate Your
            <br />
            <em className="text-[#c9a84c] not-italic">Perfect Collection</em>
          </h2>
          <p
            className="text-[#f5f0e8]/50 text-sm leading-relaxed mb-10"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Schedule a private consultation with one of our senior advisors. We
            work with collectors, interior designers, and hospitality brands
            worldwide.
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

      {/* Keyframe animations */}
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
      `}</style>
    </>
  );
}
