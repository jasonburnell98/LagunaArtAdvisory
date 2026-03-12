"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/gallery" },
  { label: "Virtual Placement", href: "/virtual-placement" },
  { label: "Consultation", href: "/consultation" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[#0a0a0a]/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="text-[#c9a84c] tracking-[0.3em] text-xs uppercase font-light"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            Laguna
          </span>
          <span
            className="text-[#f5f0e8] text-xl font-light tracking-wider"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Art Advisory
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[#c9a84c]"
                    : "text-[#f5f0e8]/70 hover:text-[#c9a84c]"
                }`}
                style={{ fontFamily: "Jost, system-ui, sans-serif" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/consultation"
              className="border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-300"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-[#f5f0e8] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[#f5f0e8] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[#f5f0e8] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-[#0a0a0a]/98 backdrop-blur-sm ${
          menuOpen ? "max-h-96 border-t border-[#c9a84c]/20" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-[#c9a84c]"
                    : "text-[#f5f0e8]/70 hover:text-[#c9a84c]"
                }`}
                style={{ fontFamily: "Jost, system-ui, sans-serif" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/consultation"
              className="inline-block border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-[#c9a84c] hover:text-[#0a0a0a] transition-all duration-300"
              style={{ fontFamily: "Jost, system-ui, sans-serif" }}
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
