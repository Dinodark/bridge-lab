"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Photo = {
  src: string;
  alt: string;
};

const CONTENT = {
  ru: {
    title: "Фотографии",
    subtitle: "Фото из папки photos/style-01.",
  },
  de: {
    title: "Fotos",
    subtitle: "Fotos aus dem Ordner photos/style-01.",
  },
} as const;

export default function HomePhotos() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/photos");
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) {
          setPhotos(Array.isArray(json.photos) ? json.photos : []);
        }
      } catch {
        if (!cancelled) setPhotos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && photos.length === 0) {
    return null;
  }

  const scrollByStep = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-photo-card]");
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
          Photos
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

      <div className="content-container mb-2 flex justify-end items-start">
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:bg-[var(--color-bg-active)]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
            aria-label="Scroll left"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:bg-[var(--color-bg-active)]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
            aria-label="Scroll right"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
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
          {(loading ? Array.from({ length: 3 }) : photos).map((photo, index) => (
            <div
              key={loading ? index : photo.src}
              data-photo-card
              className="flex-shrink-0 snap-center rounded-2xl overflow-hidden border bg-black/80 flex items-center justify-center"
              style={{
                borderColor: "var(--color-border)",
                height: 500,
                minWidth: loading ? 280 : undefined,
              }}
            >
              {loading ? (
                <div className="w-full h-full animate-pulse" style={{ background: "var(--color-border)" }} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.src} alt={photo.alt} className="h-full w-auto object-contain" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
