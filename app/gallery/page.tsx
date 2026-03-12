import Image from "next/image";
import Link from "next/link";

const artworks = [
  {
    id: 1,
    title: "Coastal Reverie",
    artist: "Elara Montclair",
    medium: "Oil on Canvas",
    dimensions: "48 × 60 in",
    year: 2023,
    price: "$18,500",
    image: "https://picsum.photos/seed/artwork1/600/700",
  },
  {
    id: 2,
    title: "Golden Hour Study",
    artist: "Marcus Delacroix",
    medium: "Oil on Linen",
    dimensions: "36 × 48 in",
    year: 2022,
    price: "$12,000",
    image: "https://picsum.photos/seed/artwork2/600/700",
  },
  {
    id: 3,
    title: "Serenity in Form",
    artist: "Vivienne Hartwell",
    medium: "Acrylic & Gold Leaf",
    dimensions: "40 × 50 in",
    year: 2024,
    price: "$22,000",
    image: "https://picsum.photos/seed/artwork3/600/700",
  },
  {
    id: 4,
    title: "The Blue Meridian",
    artist: "James Okafor",
    medium: "Watercolor on Paper",
    dimensions: "30 × 40 in",
    year: 2023,
    price: "$8,500",
    image: "https://picsum.photos/seed/artwork4/600/700",
  },
  {
    id: 5,
    title: "Nocturne No. 7",
    artist: "Sofia Vèritas",
    medium: "Mixed Media",
    dimensions: "48 × 48 in",
    year: 2024,
    price: "$31,000",
    image: "https://picsum.photos/seed/artwork5/600/700",
  },
  {
    id: 6,
    title: "Amber Passage",
    artist: "Thomas Crane",
    medium: "Oil on Canvas",
    dimensions: "54 × 72 in",
    year: 2022,
    price: "$45,000",
    image: "https://picsum.photos/seed/artwork6/600/700",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-[#0a0a0a] pt-36 pb-20 px-6 text-center">
        <p
          className="text-[#c9a84c] tracking-[0.5em] text-xs uppercase mb-4"
          style={{ fontFamily: "Jost, system-ui, sans-serif" }}
        >
          Available Works
        </p>
        <h1
          className="text-[#f5f0e8] font-light"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          }}
        >
          The Collection
        </h1>
        <div className="h-px w-16 bg-[#c9a84c] mx-auto mt-6 mb-6" />
        <p
          className="text-[#f5f0e8]/50 max-w-lg mx-auto text-sm leading-relaxed"
          style={{ fontFamily: "Jost, system-ui, sans-serif" }}
        >
          Each work is carefully selected and authenticated. Inquire with our
          advisors for provenance documentation and acquisition guidance.
        </p>
      </div>

      {/* Gallery grid */}
      <section className="bg-[#faf7f2] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {artworks.map((work) => (
              <article
                key={work.id}
                className="group bg-white shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[5/6]">
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
                <div className="p-6">
                  <div className="flex items-start justify-between mb-1">
                    <h3
                      className="text-[#0a0a0a] text-lg font-light leading-tight"
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                      }}
                    >
                      {work.title}
                    </h3>
                    <span
                      className="text-[#c9a84c] text-sm font-light ml-4 whitespace-nowrap"
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                      }}
                    >
                      {work.price}
                    </span>
                  </div>
                  <p
                    className="text-[#0a0a0a]/50 text-xs tracking-widest uppercase mb-3"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    {work.artist}
                  </p>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-px flex-1 bg-[#0a0a0a]/10" />
                  </div>
                  <div
                    className="flex justify-between text-xs text-[#0a0a0a]/40 mb-5"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    <span>{work.medium}</span>
                    <span>{work.dimensions}</span>
                  </div>
                  <button className="w-full border border-[#0a0a0a]/20 text-[#0a0a0a]/70 py-3 text-xs tracking-[0.25em] uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-300 cursor-pointer">
                    <span style={{ fontFamily: "Jost, system-ui, sans-serif" }}>
                      Inquire to Purchase
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Advisory note */}
          <div className="mt-20 border border-[#0a0a0a]/10 p-8 md:p-12 text-center">
            <p
              className="text-[#c9a84c] tracking-[0.3em] text-xs uppercase mb-4"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Private Advisory
            </p>
            <h3
              className="text-[#0a0a0a] font-light mb-4"
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              Looking for Something Specific?
            </h3>
            <p
              className="text-[#0a0a0a]/50 text-sm max-w-lg mx-auto leading-relaxed mb-8"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Our advisors have access to an extensive network of galleries,
              private collections, and estates. Tell us your vision and we will
              source accordingly.
            </p>
            <Link
              href="/consultation"
              className="inline-block bg-[#0a0a0a] text-[#f5f0e8] px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-300"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Request Private Advisory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
