import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/gallery" },
  { label: "Virtual Placement", href: "/virtual-placement" },
  { label: "Consultation", href: "/consultation" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#f5f0e8]/60">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <p
                className="text-[#c9a84c] tracking-[0.3em] text-xs uppercase font-light"
                style={{ fontFamily: "Jost, system-ui, sans-serif" }}
              >
                Laguna
              </p>
              <h3
                className="text-[#f5f0e8] text-2xl font-light tracking-wider"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                Art Advisory
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Curating fine art for discerning collectors. Bringing museum-quality works into extraordinary spaces.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4
              className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Navigate
            </h4>
            <div className="h-px w-8 bg-[#c9a84c]/40" />
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#c9a84c] transition-colors duration-300"
                    style={{ fontFamily: "Jost, system-ui, sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4
              className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Contact
            </h4>
            <div className="h-px w-8 bg-[#c9a84c]/40" />
            <ul
              className="space-y-3 text-sm"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5">✦</span>
                <span>
                  1234 Coast Highway<br />
                  Laguna Beach, CA 92651
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c9a84c]">✦</span>
                <a
                  href="tel:+19495550192"
                  className="hover:text-[#c9a84c] transition-colors duration-300"
                >
                  (949) 555-0192
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c9a84c]">✦</span>
                <a
                  href="mailto:hello@lagunaartadvisory.com"
                  className="hover:text-[#c9a84c] transition-colors duration-300"
                >
                  hello@lagunaartadvisory.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#f5f0e8]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs tracking-widest"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            © {new Date().getFullYear()} Laguna Art Advisory. All rights reserved.
          </p>
          <p
            className="text-xs tracking-widest text-[#c9a84c]/60"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Private Consultations · Bespoke Curation · Art Placement
          </p>
        </div>
      </div>
    </footer>
  );
}
