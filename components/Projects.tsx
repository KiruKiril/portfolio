"use client";

import { useEffect, useRef, useState } from "react";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

function useInView(threshold = 0.05) {
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

const langColors: Record<string, { dot: string; badge: string }> = {
  TypeScript:  { dot: "bg-blue-500",   badge: "bg-blue-100 text-blue-700" },
  JavaScript:  { dot: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-700" },
  Python:      { dot: "bg-green-500",  badge: "bg-green-100 text-green-700" },
  Java:        { dot: "bg-orange-500", badge: "bg-orange-100 text-orange-700" },
  Go:          { dot: "bg-cyan-500",   badge: "bg-cyan-100 text-cyan-700" },
  Rust:        { dot: "bg-red-500",    badge: "bg-red-100 text-red-700" },
  CSS:         { dot: "bg-purple-500", badge: "bg-purple-100 text-purple-700" },
  HTML:        { dot: "bg-rose-500",   badge: "bg-rose-100 text-rose-700" },
  Kotlin:      { dot: "bg-violet-500", badge: "bg-violet-100 text-violet-700" },
  Vue:         { dot: "bg-emerald-500",badge: "bg-emerald-100 text-emerald-700" },
  PHP:         { dot: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-700" },
  Shell:       { dot: "bg-zinc-500",   badge: "bg-zinc-100 text-zinc-600" },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("de-CH", { year: "numeric", month: "short" });
}

function RepoCard({ repo, index, visible }: { repo: GitHubRepo; index: number; visible: boolean }) {
  const lc = repo.language ? (langColors[repo.language] ?? { dot: "bg-zinc-400", badge: "bg-zinc-100 text-zinc-600" }) : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-5 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms, box-shadow 0.3s, border-color 0.3s, translate 0.3s`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 group-hover:bg-zinc-900 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
          <Github className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-500 transition-colors duration-200 flex-shrink-0 mt-0.5" />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
        {repo.name}
      </h3>

      <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed line-clamp-2 flex-1">
        {repo.description || "Kein Beschreibung vorhanden."}
      </p>

      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {repo.topics.slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-full">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {lc && repo.language && (
            <span className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${lc.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${lc.dot}`} />
              {repo.language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5 text-zinc-400">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <Star className="w-3 h-3" />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <GitFork className="w-3 h-3" />
              {repo.forks_count}
            </span>
          )}
          <span className="text-xs text-zinc-300">{formatDate(repo.updated_at)}</span>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const { ref, inView } = useInView();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setRepos(data);
      })
      .catch(() => setError("Fehler beim Laden der Projekte."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-28 px-6 bg-zinc-50 border-t border-zinc-100">
      <div className="mx-auto max-w-5xl" ref={ref}>
        <div
          className="transition-all duration-700 ease-out"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase text-zinc-400">
            GitHub Projekte
          </span>
          <div className="mt-4 flex items-end justify-between gap-4 flex-wrap">
            <h2 className="heading-font text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Was ich baue.
            </h2>
            <a
              href="https://github.com/KiruKiril"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200 cursor-pointer group"
            >
              <Github className="w-4 h-4" />
              <span className="group-hover:underline">Alle Repos</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>
        </div>

        <div className="mt-12">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-5 animate-pulse h-48">
                  <div className="w-8 h-8 bg-zinc-100 rounded-lg" />
                  <div className="mt-3 h-4 bg-zinc-100 rounded w-3/4" />
                  <div className="mt-2 h-3 bg-zinc-100 rounded w-full" />
                  <div className="mt-1 h-3 bg-zinc-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-sm text-red-600 mb-2">{error}</p>
              <a
                href="https://github.com/KiruKiril"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                GitHub direkt besuchen
              </a>
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <p className="text-center text-zinc-400 text-sm py-16">Keine öffentlichen Repositories gefunden.</p>
          )}

          {!loading && !error && repos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} visible={inView} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
