"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className="py-32 px-6 bg-zinc-900 text-white overflow-hidden relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center" ref={ref}>
        <div
          className="transition-all duration-700 ease-out"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase text-zinc-500">
            Kontakt
          </span>
          <h2 className="heading-font mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            Lass uns etwas Grossartiges bauen.
          </h2>
          <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Ob ein neues Projekt, eine Zusammenarbeit oder einfach ein Gespräch über Technologie — ich freue mich über deine Nachricht.
          </p>
        </div>

        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "200ms",
          }}
        >
          <a
            href="mailto:kiril.rothacher@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-zinc-900 text-sm font-semibold rounded-full hover:bg-zinc-100 transition-colors duration-200 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            E-Mail schreiben
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

          <a
            href="https://www.linkedin.com/in/kiril-rothacher-2456bb235/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border border-zinc-700 text-zinc-300 text-sm font-medium rounded-full hover:border-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
