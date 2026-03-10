"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { T } from "@/app/media/translations";
import FlameIcon from "@/components/icons/FlameIcon";

const TRIBE_IMAGES = [
  "/tribe/tribe.jpg",
];

interface TribeCarouselProps {
  variant?: "light" | "dark";
}

export default function TribeCarousel({ variant = "light" }: TribeCarouselProps) {
  const { lang } = useLanguage();
  const { trackLike } = useAnalytics();
  const t = T[lang];
  const isDark = variant === "dark";
  const borderClass = isDark ? "border-white/10" : "";
  const textClass = isDark ? "text-white/70" : "";
  const textStyle = isDark ? undefined : { color: "var(--color-muted)" };
  const borderStyle = isDark ? undefined : { borderColor: "var(--color-border)" };
  const dotActiveClass = isDark ? "bg-white" : "bg-[var(--color-cta1)]";
  const dotInactiveClass = isDark ? "bg-white/50 hover:bg-white/70" : "bg-[var(--color-cta1)]/50 hover:bg-[var(--color-cta1)]/70";
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  const toggleLike = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!likes[i]) trackLike(`tribe-${i}`, "media");
    setLikes((prev) => ({ ...prev, [i]: !prev[i] }));
  };

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
    <section className={`border-b py-12 overflow-hidden ${borderClass}`} style={borderStyle}>
      <div className="w-full max-w-content mx-auto px-4 sm:px-6">
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

        <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/10" }}>
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TRIBE_IMAGES.map((src, i) => (
              <div
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => setFullscreen(true)}
                onKeyDown={(e) => e.key === "Enter" && setFullscreen(true)}
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
                <button
                  type="button"
                  onClick={(e) => toggleLike(i, e)}
                  className={`absolute bottom-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm z-10 ${!likes[i] ? "text-white/60" : ""}`}
                  aria-label={likes[i] ? "Убрать лайк" : "Лайк"}
                >
                  <FlameIcon filled={!!likes[i]} size={20} />
                </button>
              </div>
            ))}
          </div>

          {TRIBE_IMAGES.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
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
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="group absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white flex items-center justify-center transition-all duration-300"
                aria-label="Следующее фото"
              >
                <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
                <svg className="relative w-10 h-10 translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {TRIBE_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    className={`w-2 h-2 rounded-full transition-all duration-700 ease-in-out ${i === index ? `w-6 ${dotActiveClass}` : dotInactiveClass}`}
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
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center pt-[72px] pb-14" role="dialog" aria-modal="true" aria-label="Полноэкранный просмотр">
          <button type="button" onClick={() => setFullscreen(false)} className="absolute top-[72px] right-4 p-2 text-white hover:text-white/80 flex items-center justify-center transition-colors z-10" aria-label="Закрыть">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {TRIBE_IMAGES.length > 1 && (
            <button type="button" onClick={goPrev} className="group absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white flex items-center justify-center transition-all duration-300 z-10" aria-label="Предыдущее">
              <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
              <svg className="relative w-10 h-10 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="relative w-full h-full min-h-0 max-w-6xl max-h-[90vh] mx-4 rounded-2xl overflow-hidden">
            <div
              className="flex h-full min-h-0 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TRIBE_IMAGES.map((src, i) => (
                <div key={i} className="flex-shrink-0 w-full h-full min-h-0 relative">
                  <Image src={src} alt={`Tribe ${i + 1}`} fill className="object-contain" sizes="100vw" onClick={(e) => e.stopPropagation()} />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleLike(i, e); }}
                    className={`absolute bottom-6 right-6 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-md z-10 ${!likes[i] ? "text-white/60" : ""}`}
                    aria-label={likes[i] ? "Убрать лайк" : "Лайк"}
                  >
                    <FlameIcon filled={!!likes[i]} size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {TRIBE_IMAGES.length > 1 && (
            <>
              <button type="button" onClick={goNext} className="group absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white flex items-center justify-center transition-all duration-300 z-10" aria-label="Следующее">
                <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
                <svg className="relative w-10 h-10 translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {TRIBE_IMAGES.map((_, i) => (
                  <button key={i} type="button" onClick={() => goTo(i)} className={`h-1 rounded-full transition-all duration-700 ease-in-out ${i === index ? "w-8 bg-white" : "w-1 bg-white/40 hover:bg-white/60"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
