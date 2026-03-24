import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/gallery" },
  { label: "Virtual Placement", href: "/virtual-placement" },
  { label: "Consultation", href: "/consultation" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0a0a0a", color: "rgba(245,240,232,0.6)" }}>
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

      {/* Centered container */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        {/* 3-column grid */}
        <div className="footer-grid">
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <p
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  color: "#c9a84c",
                  letterSpacing: "0.3em",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  fontWeight: 300,
                  marginBottom: "0.25rem",
                }}
              >
                Laguna
              </p>
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  color: "#f5f0e8",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                }}
              >
                Art Advisory
              </h3>
            </div>
            <p
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.75,
                maxWidth: "20rem",
              }}
            >
              A contemporary gallery and art advisory dedicated to discovering
              compelling artists and connecting their work with passionate
              collectors. We cultivate lasting relationships between artists
              and the people who collect their work.
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                color: "#c9a84c",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Navigate
            </h4>
            <div
              style={{
                width: "2rem",
                height: "1px",
                backgroundColor: "rgba(201,168,76,0.4)",
              }}
            />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#c9a84c] transition-colors duration-300"
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(245,240,232,0.6)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                color: "#c9a84c",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Contact
            </h4>
            <div
              style={{
                width: "2rem",
                height: "1px",
                backgroundColor: "rgba(201,168,76,0.4)",
              }}
            />
            <ul
              style={{
                fontFamily: "Jost, system-ui, sans-serif",
                fontSize: "0.875rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <span style={{ color: "#c9a84c", marginTop: "0.125rem" }}>✦</span>
                <span>
                  1234 Coast Highway
                  <br />
                  Laguna Beach, CA 92651
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "#c9a84c" }}>✦</span>
                <a
                  href="tel:+19493033673"
                  className="hover:text-[#c9a84c] transition-colors duration-300"
                  style={{ color: "rgba(245,240,232,0.6)", textDecoration: "none" }}
                >
                  (949) 303-3673
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "#c9a84c" }}>✦</span>
                <a
                  href="mailto:Info@lagartadvisory.com"
                  className="hover:text-[#c9a84c] transition-colors duration-300"
                  style={{ color: "rgba(245,240,232,0.6)", textDecoration: "none" }}
                >
                  Info@lagartadvisory.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(245,240,232,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()} Laguna Art Advisory. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "Jost, system-ui, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: "rgba(201,168,76,0.6)",
            }}
          >
            Contemporary Gallery · Collector Advisory · Artist Representation
          </p>
        </div>
      </div>

      {/* Responsive footer grid */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (min-width: 769px) and (max-width: 1000px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </footer>
  );
}
