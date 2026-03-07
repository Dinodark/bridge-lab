"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-colors ${filled ? "text-rose-400" : "text-white/60"}`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

const MARVIN_IMAGES = [
  "/marvin/out-0%20(1).webp",
  "/marvin/out-0%20(2).webp",
  "/marvin/out-0%20(3).webp",
  "/marvin/out-0%20(4).webp",
  "/marvin/out-0%20(5).webp",
  "/marvin/out-0%20(6).webp",
  "/marvin/out-0%20(7).webp",
  "/marvin/out-0%20(8).webp",
];

interface MarvinCarouselProps {
  variant?: "light" | "dark";
}

export default function MarvinCarousel({ variant = "light" }: MarvinCarouselProps) {
  const { lang } = useLanguage();
  const t = T[lang];
  const isDark = variant === "dark";
  const borderClass = isDark ? "border-white/10" : "";
  const textClass = isDark ? "text-white/70" : "";
  const textStyle = isDark ? undefined : { color: "var(--color-muted)" };
  const borderStyle = isDark ? undefined : { borderColor: "var(--color-border)" };
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  const toggleLike = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % MARVIN_IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + MARVIN_IMAGES.length) % MARVIN_IMAGES.length);
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

  return (
    <section className={`border-b py-12 overflow-hidden ${borderClass}`} style={borderStyle}>
      <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold uppercase tracking-wider ${textClass}`} style={textStyle}>
            {t.marvin}
          </h2>
          <span className={`text-xs ${textClass}`} style={textStyle}>
            {index + 1} / {MARVIN_IMAGES.length}
          </span>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl w-full" style={{ aspectRatio: "16/10" }}>
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {MARVIN_IMAGES.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setFullscreen(true)}
                className="relative flex-shrink-0 w-full h-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[var(--color-cta1)] focus:ring-offset-2"
                aria-label="Открыть на весь экран"
              >
                <Image
                  src={src}
                  alt={`Marvin ${i + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                  priority={i === 0}
                />
                <button
                  type="button"
                  onClick={(e) => toggleLike(i, e)}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm z-10"
                  aria-label={likes[i] ? "Убрать лайк" : "Лайк"}
                >
                  <HeartIcon filled={!!likes[i]} />
                </button>
              </button>
            ))}
          </div>

          {/* Стрелки навигации */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="group absolute left-2 top-1/2 -translate-y-1/2 p-3 text-white flex items-center justify-center transition-all duration-300"
            aria-label="Предыдущее фото"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
            <svg className="relative w-10 h-10 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="group absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white flex items-center justify-center transition-all duration-300"
            aria-label="Следующее фото"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
            <svg className="relative w-10 h-10 translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Точки-индикаторы */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {MARVIN_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-700 ease-in-out ${
                  i === index ? "w-6 bg-white" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Перейти к фото ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <p className={`mt-4 text-sm ${textClass}`} style={textStyle}>
          Кликните на фото для полноэкранного просмотра. ← → для навигации.
        </p>
      </div>

      {/* Fullscreen viewer */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center pt-[72px] pb-14"
          role="dialog"
          aria-modal="true"
          aria-label="Полноэкранный просмотр"
        >
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="absolute top-[72px] right-4 p-2 text-white hover:text-white/80 flex items-center justify-center transition-colors z-10"
            aria-label="Закрыть"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goPrev}
            className="group absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white flex items-center justify-center transition-all duration-300 z-10"
            aria-label="Предыдущее"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
            <svg className="relative w-10 h-10 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-full h-full min-h-0 max-w-6xl max-h-[90vh] mx-4 rounded-2xl overflow-hidden">
            <div
              className="flex h-full min-h-0 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {MARVIN_IMAGES.map((src, i) => (
                <div key={i} className="flex-shrink-0 w-full h-full min-h-0 relative">
                  <Image
                    src={src}
                    alt={`Marvin ${i + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleLike(i, e); }}
                    className="absolute bottom-6 right-6 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-md z-10"
                    aria-label={likes[i] ? "Убрать лайк" : "Лайк"}
                  >
                    <HeartIcon filled={!!likes[i]} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="group absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white flex items-center justify-center transition-all duration-300 z-10"
            aria-label="Следующее"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
            <svg className="relative w-10 h-10 translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {MARVIN_IMAGES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-700 ease-in-out ${
                  i === index ? "w-8 bg-white" : "w-1 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
