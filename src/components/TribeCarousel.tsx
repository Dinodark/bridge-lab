"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";

const TRIBE_IMAGES = [
  "/tribe/tribe.jpg",
];

interface TribeCarouselProps {
  variant?: "light" | "dark";
}

export default function TribeCarousel({ variant = "light" }: TribeCarouselProps) {
  const { lang } = useLanguage();
  const t = T[lang];
  const isDark = variant === "dark";
  const borderClass = isDark ? "border-white/10" : "";
  const textClass = isDark ? "text-white/70" : "";
  const textStyle = isDark ? undefined : { color: "var(--color-muted)" };
  const borderStyle = isDark ? undefined : { borderColor: "var(--color-border)" };
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % TRIBE_IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + TRIBE_IMAGES.length) % TRIBE_IMAGES.length);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, goNext, goPrev]);

  if (TRIBE_IMAGES.length === 0) return null;

  return (
    <section className={`border-b py-12 overflow-x-auto scrollbar-hide ${borderClass}`} style={borderStyle}>
      <div className="min-w-[1024px] max-w-[1024px] mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold uppercase tracking-wider ${textClass}`} style={textStyle}>
            {t.tribe}
          </h2>
          {TRIBE_IMAGES.length > 1 && (
            <span className={`text-xs ${textClass}`} style={textStyle}>
              {index + 1} / {TRIBE_IMAGES.length}
            </span>
          )}
        </div>

        <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16/10" }}>
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TRIBE_IMAGES.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setFullscreen(true)}
                className="relative flex-shrink-0 w-full h-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[var(--color-cta1)] focus:ring-offset-2"
                aria-label="Открыть на весь экран"
              >
                <Image
                  src={src}
                  alt={`Tribe ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  priority={i === 0}
                />
              </button>
            ))}
          </div>

          {TRIBE_IMAGES.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                aria-label="Предыдущее фото"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                aria-label="Следующее фото"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {TRIBE_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "bg-white/50 hover:bg-white/70"}`}
                    aria-label={`Перейти к фото ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <p className={`mt-4 text-sm ${textClass}`} style={textStyle}>
          Кликните на фото для полноэкранного просмотра. ← → для навигации.
        </p>
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Полноэкранный просмотр">
          <button type="button" onClick={() => setFullscreen(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10" aria-label="Закрыть">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {TRIBE_IMAGES.length > 1 && (
            <button type="button" onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10" aria-label="Предыдущее">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4">
            <Image src={TRIBE_IMAGES[index]} alt={`Tribe ${index + 1}`} fill className="object-contain" sizes="100vw" onClick={(e) => e.stopPropagation()} />
          </div>
          {TRIBE_IMAGES.length > 1 && (
            <>
              <button type="button" onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10" aria-label="Следующее">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {TRIBE_IMAGES.map((_, i) => (
                  <button key={i} type="button" onClick={() => goTo(i)} className={`h-1 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-1 bg-white/40 hover:bg-white/60"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
