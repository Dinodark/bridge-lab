"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Banner = {
  src: string;
  alt: string;
};

const CONTENT = {
  ru: {
    title: "Баннеры",
    subtitle: "Автоматическая подборка баннеров из папки banners.",
  },
  de: {
    title: "Banner",
    subtitle: "Automatische Banner-Auswahl aus dem Ordner banners.",
  },
} as const;

export default function HomeBanners() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/banners?lang=${lang === "de" ? "de" : "ru"}`);
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) {
          setBanners(Array.isArray(json.banners) ? json.banners : []);
        }
      } catch {
        if (!cancelled) {
          setBanners([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  if (!loading && banners.length === 0) {
    return null;
  }

  const scrollByStep = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-banner-card]");
    const gap = 16;
    const step = firstCard ? firstCard.offsetWidth + gap : 400;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative left-1/2 -translate-x-1/2 w-screen py-16">
      <div className="content-container mb-4">
        <span
          className="text-xs font-bold tracking-widest uppercase mb-2 block"
          style={{ color: "var(--color-cta1)" }}
        >
          Banners
        </span>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2"
          style={{ color: "var(--color-text)" }}
        >
          {t.title}
        </h2>
        <p className="text-base" style={{ color: "var(--color-muted)" }}>
          {t.subtitle}
        </p>
      </div>

      <div className="content-container mb-2 flex justify-end">
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-black/60 hover:bg-black/80 transition-colors"
            style={{ borderColor: "var(--color-border)", color: "#fff" }}
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-black/60 hover:bg-black/80 transition-colors"
            style={{ borderColor: "var(--color-border)", color: "#fff" }}
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-16 sm:px-20 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {(loading ? Array.from({ length: 3 }) : banners).map((banner, index) => (
            <div
              key={loading ? index : banner.src}
              data-banner-card
              className="flex-shrink-0 snap-center rounded-2xl overflow-hidden border bg-black/80 flex items-center justify-center"
              style={{
                borderColor: "var(--color-border)",
                height: 400,
                minWidth: loading ? 280 : undefined,
              }}
            >
              {loading ? (
                <div className="w-full h-full animate-pulse" style={{ background: "var(--color-border)" }} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={banner.src} alt={banner.alt} className="h-full w-auto object-contain" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

