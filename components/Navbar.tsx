"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Geschichte", href: "#story" },
  { label: "Projekte", href: "#projects" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > vh * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = !pastHero && !isOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && pastHero
            ? "bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-16">
          <a
            href="#"
            className={`heading-font text-base font-semibold tracking-tight transition-colors duration-500 cursor-pointer ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Kiril Rothacher
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-500 cursor-pointer ${
                  isDark
                    ? "text-white/80 hover:text-white"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isDark
                  ? "bg-white text-zinc-900 hover:bg-white/90"
                  : "bg-zinc-900 text-white hover:bg-zinc-700"
              }`}
            >
              Kontakt
            </a>
          </nav>

          <button
            className={`md:hidden p-2 transition-colors duration-500 cursor-pointer ${
              isDark ? "text-white" : "text-zinc-600"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="heading-font text-2xl font-medium text-zinc-900 hover:text-zinc-400 transition-colors duration-200 cursor-pointer"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.3s ease ${i * 70}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
