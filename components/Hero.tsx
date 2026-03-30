"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Parallax: bg moves at 0.3x scroll speed. Extra space (-40% each side) guarantees coverage.
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax background — extends 40% beyond section on each side for room */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: "-40%", bottom: "-40%" }}
      >
        <Image
          src="/jairph-1XLyzi17Z2M-unsplash.jpg"
          alt="Bern mit Alpen"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Profile image */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
          className="mb-8"
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-[3px] border-white/30 shadow-2xl">
            <Image
              src="/profile.JPG"
              alt="Kiril Rothacher"
              fill
              className="object-cover object-center"
              priority
              sizes="144px"
            />
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease-out 0.15s, transform 1s ease-out 0.15s",
          }}
        >
          <h1 className="heading-font text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none">
            Kiril Rothacher
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="mt-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s",
          }}
        >
          <p className="text-white/70 text-lg md:text-xl font-light tracking-widest uppercase">
            Developer @ PostFinance
          </p>
        </div>

        {/* Location badge */}
        <div
          className="mt-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease-out 0.45s, transform 1s ease-out 0.45s",
          }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/80 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Thierachern · Thun · Schweiz
          </span>
        </div>

        {/* CTAs */}
        <div
          className="mt-10 flex items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease-out 0.55s, transform 1s ease-out 0.55s",
          }}
        >
          <a
            href="#story"
            className="px-6 py-2.5 bg-white text-zinc-900 text-sm font-semibold rounded-full hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
          >
            Meine Geschichte
          </a>
          <a
            href="#projects"
            className="px-6 py-2.5 bg-transparent border border-white/40 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            Projekte
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease-out 0.8s",
        }}
      >
        <a
          href="#story"
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer"
          aria-label="Weiter scrollen"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
