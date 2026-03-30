"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Briefcase, MapPin } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const facts = [
  {
    icon: Briefcase,
    label: "Arbeitgeber",
    value: "PostFinance AG",
  },
  {
    icon: Code2,
    label: "Rolle",
    value: "Software Developer",
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "Thierachern, Thun, Schweiz",
  },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-28 px-6 border-t border-zinc-100">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Section label */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <span className="text-xs font-medium tracking-widest uppercase text-zinc-400">
            Über mich
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Bio */}
          <div
            className="transition-all duration-700 ease-out delay-100"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "100ms",
            }}
          >
            <h2 className="heading-font text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight leading-snug">
              Ich baue digitale Produkte, die wirklich funktionieren.
            </h2>
            <div className="mt-6 space-y-4 text-zinc-500 text-base leading-relaxed">
              <p>
                Als Developer bei PostFinance arbeite ich täglich an modernen
                Fintech-Lösungen, die Millionen von Schweizern nutzen. Meine
                Leidenschaft gilt sauberem, wartbarem Code und intuitivem
                Design.
              </p>
              <p>
                Ich wohne in Thierachern, einem kleinen Dorf bei Thun im
                wunderschönen Berner Oberland. Die Nähe zu den Alpen und dem
                Thunersee inspiriert mich täglich.
              </p>
              <p>
                Neben dem Programmieren bin ich leidenschaftlicher Sportler: Ob
                auf dem Rennrad durch das Berner Oberland oder im Gym — Bewegung
                und Disziplin sind für mich genauso wichtig wie sauberer Code.
              </p>
            </div>

            {/* Facts */}
            <div className="mt-8 space-y-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-zinc-600" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block">{label}</span>
                    <span className="text-sm font-medium text-zinc-700">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Google Maps */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm h-80 lg:h-full min-h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10867.374566219744!2d7.588!3d46.745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478fa3b1c3ad4a99%3A0x4c1ba1e4d32a3d5!2sThierachern!5e0!3m2!1sde!2sch!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Thierachern, Thun, Schweiz"
              />
            </div>
            <p className="mt-3 text-xs text-zinc-400 text-center flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" />
              Thierachern, Thun — Berner Oberland, Schweiz
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
