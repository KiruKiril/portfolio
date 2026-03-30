"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const timeline = [
  {
    year: "Aufgewachsen",
    title: "Thierachern, Thun",
    text: "Ich bin in Thierachern aufgewachsen — einem kleinen Dorf direkt am Fusse des Berner Oberlandes. Der Thuner See, die Berge und die ruhige Natur haben mich geprägt.",
  },
  {
    year: "Lehre",
    title: "Informatiker bei der Post",
    text: "Nach der Schule absolvierte ich meine Lehre als Informatiker bei der Schweizerischen Post. Dort lernte ich die Grundlagen der Software-Entwicklung und tauchte tief in die Welt der Technologie ein.",
  },
  {
    year: "Heute",
    title: "Developer @ PostFinance, Bern",
    text: "Heute arbeite ich als Developer bei PostFinance in Bern. Ich entwickle moderne Fintech-Lösungen, die täglich von Hunderttausenden genutzt werden — sauberer Code, gutes Design, echte Wirkung.",
  },
];

export default function Story() {
  const header = useInView(0.1);
  const timelineSection = useInView(0.1);
  const jungSection = useInView(0.1);
  const mapsSection = useInView(0.1);

  return (
    <section id="story" className="bg-white">
      {/* Section header */}
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-6" ref={header.ref}>
        <div
          style={{
            opacity: header.inView ? 1 : 0,
            transform: header.inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <span className="text-xs font-medium tracking-widest uppercase text-zinc-400">
            Meine Geschichte
          </span>
          <h2 className="heading-font mt-4 text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight max-w-xl">
            Von Thierachern in die Fintech-Welt.
          </h2>
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-5xl px-6 py-10" ref={timelineSection.ref}>
        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-zinc-200" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="relative pl-14 md:pl-24"
                style={{
                  opacity: timelineSection.inView ? 1 : 0,
                  transform: timelineSection.inView ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.6s ease-out ${i * 150}ms, transform 0.6s ease-out ${i * 150}ms`,
                }}
              >
                <div className="absolute left-2.5 md:left-6 top-1.5 w-3 h-3 rounded-full bg-zinc-900 border-2 border-white shadow-sm" />
                <span className="text-xs font-medium tracking-widest uppercase text-zinc-400 block mb-1">
                  {item.year}
                </span>
                <h3 className="heading-font text-xl md:text-2xl font-semibold text-zinc-900 leading-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-zinc-500 text-base leading-relaxed max-w-2xl">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jung photo + Maps */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Jung photo — path with literal space, Next.js handles encoding */}
          <div
            ref={jungSection.ref}
            style={{
              opacity: jungSection.inView ? 1 : 0,
              transform: jungSection.inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
            }}
          >
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm aspect-[4/5] relative">
              <Image
                src="/Kiril Jung.jpg"
                alt="Kiril als Kind"
                fill
                className="object-cover object-[center_30%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="mt-3 text-sm text-zinc-400 text-center italic">
              Kiril damals...
            </p>
          </div>

          {/* Google Maps */}
          <div
            ref={mapsSection.ref}
            className="flex flex-col gap-4"
            style={{
              opacity: mapsSection.inView ? 1 : 0,
              transform: mapsSection.inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s",
            }}
          >
            <div>
              <h3 className="heading-font text-xl font-semibold text-zinc-900 mb-1">
                Mein Heimatort
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Thierachern liegt zwischen Thun und Spiez, direkt am Fuss der Berner Alpen — umgeben von Feldern, Wäldern und dem schimmernden Thuner See.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm" style={{ height: "380px" }}>
              <iframe
                src="https://maps.google.com/maps?q=Thierachern,+Kanton+Bern,+Schweiz&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Thierachern, Thun, Schweiz"
              />
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Thierachern, Thun — Kanton Bern, Schweiz
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
