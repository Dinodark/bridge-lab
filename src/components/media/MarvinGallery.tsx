"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";
import { MARVIN_ITEMS } from "./marvinGalleryData";

type DriftDir = "left" | "down" | "up";
const DRIFT_DIRS: DriftDir[] = ["left", "down", "up"];

const DYNAMIC_FACTORS = [1, 0.5, 0.85, 0.25, 0.9, 0.05, 0.65, 0.75, 0.15, 0.7, 0.45, 0.95, 0.05, 0.55, 0.35, 0.8, 0.2, 0.6, 0.9, 0.05];

function getDriftTransform(dir: DriftDir, phase: number, factor = 1): string {
  const t = Math.sin(phase * Math.PI * 2) * 6 * factor;
  if (dir === "left") return `translateX(${-t}%)`;
  if (dir === "down") return `translateY(${t}%)`;
  return `translateY(${-t}%)`;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function extractGradientFromImage(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve("linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)");
          return;
        }
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        const sample = (x: number, y: number) => {
          const i = (y * size + x) * 4;
          return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };
        };

        const left = sample(4, size >> 1);
        const right = sample(size - 5, size >> 1);
        const center = sample(size >> 1, size >> 1);

        const toHex = (p: { r: number; g: number; b: number }) =>
          rgbToHex(p.r, p.g, p.b);

        const c1 = toHex(left);
        const c2 = toHex(center);
        const c3 = toHex(right);

        resolve(`linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`);
      } catch {
        resolve("linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)");
      }
    };
    img.onerror = () =>
      resolve("linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)");
    img.src = src.startsWith("/") ? window.location.origin + src : src;
  });
}

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

export default function MarvinGallery() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [gradients, setGradients] = useState<Record<number, string>>({});
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>([]);
  const [scrollPhases, setScrollPhases] = useState<number[]>(() => MARVIN_ITEMS.map(() => 0));
  const gradientsRequested = useRef<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement | null>(null);
  const defaultGradient = "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)";
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = t.firePaletteQuotes;

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, [quotes.length]);

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const goPrev = () => {
    setSelectedIndex((i) => (i === null ? null : (i - 1 + MARVIN_ITEMS.length) % MARVIN_ITEMS.length));
  };
  const goNext = () => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % MARVIN_ITEMS.length));
  };

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const rect = section?.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect ? rect.top + rect.height / 2 : viewportCenter;
      const distance = sectionCenter - viewportCenter;
      const offsets = MARVIN_ITEMS.map((_, i) => {
        const baseFactor = (i % 7) - 3;
        const dyn = DYNAMIC_FACTORS[i % DYNAMIC_FACTORS.length];
        return distance * 0.06 * baseFactor * dyn;
      });
      setParallaxOffsets(offsets);
      const baseDelay = 400;
      const stagger = 120;
      const cycle = 1400;
      const phases = MARVIN_ITEMS.map((_, i) => {
        const delayedScroll = Math.max(0, window.scrollY - baseDelay - i * stagger);
        const raw = (delayedScroll / cycle) % 1;
        return raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
      });
      setScrollPhases(phases);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setSelectedIndex((i) => (i === null ? null : (i - 1 + MARVIN_ITEMS.length) % MARVIN_ITEMS.length));
      if (e.key === "ArrowRight") setSelectedIndex((i) => (i === null ? null : (i + 1) % MARVIN_ITEMS.length));
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    MARVIN_ITEMS.forEach((item, i) => {
      if (!gradientsRequested.current.has(i)) {
        gradientsRequested.current.add(i);
        extractGradientFromImage(item.src).then((g) =>
          setGradients((prev) => ({ ...prev, [i]: g }))
        );
      }
    });
  }, [selectedIndex]);

  return (
    <section
      ref={sectionRef}
      className="py-16 w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(13,10,7,0.97) 0%, rgba(30,15,5,0.98) 50%, rgba(13,10,7,0.99) 100%)",
        fontFamily: "var(--font-inter-tight), Inter, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#FF902F]/70 mb-2">
          {t.firePaletteTitle} · {t.marvin} {t.gallery}
        </p>
        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#F0E8DC] tracking-[-0.02em] leading-[1.2] mb-2 max-w-2xl">
          {t.firePaletteSubtitle}
        </h2>
        <p className="text-sm text-[#FF902F]/60 mb-4 max-w-xl">
          {t.firePaletteNote}
        </p>
        <div className="min-h-[2.5rem]">
          <p
            className="text-base sm:text-[18px] text-[#FF902F]/90 font-light italic leading-[1.6] max-w-xl"
            key={quoteIndex}
          >
            «{quotes[quoteIndex]}»
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {MARVIN_ITEMS.map((item, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedIndex(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedIndex(i); } }}
              className="group relative aspect-square overflow-hidden rounded-xl text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF902F] focus:ring-offset-2 focus:ring-offset-[#0D0A07] shadow-lg"
            >
              <div
                className="absolute inset-0 transition-transform duration-[2472ms] ease-out"
                style={{ transform: `translateY(${parallaxOffsets[i] ?? 0}px)` }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-[2472ms] ease-out"
                  style={{
                    transform: `scale(2) ${getDriftTransform(DRIFT_DIRS[i % 3], scrollPhases[i] ?? 0, DYNAMIC_FACTORS[i % DYNAMIC_FACTORS.length])}`,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.title[lang]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[12px] sm:text-[14px] font-semibold text-white/95 truncate drop-shadow-lg" style={{ letterSpacing: "0.04em" }}>{item.title[lang]}</p>
              </div>
              <button
                type="button"
                onClick={(e) => toggleLike(i, e)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm"
                aria-label={likes[i] ? "Убрать лайк" : "Лайк"}
              >
                <HeartIcon filled={!!likes[i]} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#FF902F]/20">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#FF902F]/60 mb-4">{t.relatedPages}</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/vision"
            className="text-[14px] font-medium text-[#FF902F] hover:text-[#FFBC6F] transition-colors border-b border-[#FF902F]/30 hover:border-[#FFBC6F]/50 pb-0.5"
          >
            {t.linkVision}
          </Link>
          <Link
            href="/tribe"
            className="text-[14px] font-medium text-[#FF902F] hover:text-[#FFBC6F] transition-colors border-b border-[#FF902F]/30 hover:border-[#FFBC6F]/50 pb-0.5"
          >
            {t.linkTribe}
          </Link>
          <Link
            href="/blockchain"
            className="text-[14px] font-medium text-[#FF902F] hover:text-[#FFBC6F] transition-colors border-b border-[#FF902F]/30 hover:border-[#FFBC6F]/50 pb-0.5"
          >
            {t.linkBridge}
          </Link>
          <Link
            href="/media"
            className="text-[14px] font-medium text-[#FF902F] hover:text-[#FFBC6F] transition-colors border-b border-[#FF902F]/30 hover:border-[#FFBC6F]/50 pb-0.5"
          >
            {t.linkMedia}
          </Link>
          <Link
            href="/brandguidelines"
            className="text-[14px] font-medium text-[#FF902F] hover:text-[#FFBC6F] transition-colors border-b border-[#FF902F]/30 hover:border-[#FFBC6F]/50 pb-0.5"
          >
            {t.linkBrand}
          </Link>
          <Link
            href="/dao"
            className="text-[14px] font-medium text-[#FF902F] hover:text-[#FFBC6F] transition-colors border-b border-[#FF902F]/30 hover:border-[#FFBC6F]/50 pb-0.5"
          >
            {t.linkDao}
          </Link>
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[72px] pb-14 bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-[72px] right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="group absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white flex items-center justify-center transition-all duration-300"
            aria-label="Предыдущее"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
            <svg className="relative w-10 h-10 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="group absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white flex items-center justify-center transition-all duration-300"
            aria-label="Следующее"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-white group-hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]" />
            <svg className="relative w-10 h-10 translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            className="relative max-w-[1852px] w-[min(90vw,930px)] max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-start transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
            >
              {MARVIN_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[min(90vw,930px)] relative rounded-2xl overflow-hidden pl-0 pr-0 md:pr-[min(162px,18%)]"
                  style={{ background: gradients[i] ?? defaultGradient }}
                >
                  <img
                    src={item.src}
                    alt={item.title[lang]}
                    className="max-w-full max-h-[90vh] w-auto h-auto block ml-0 mr-auto object-contain"
                  />
                  <div
                    className="absolute max-w-md -rotate-1 pr-16"
                    style={{ left: "6.18%", bottom: "6.18%", right: "auto" }}
                  >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white/95 tracking-tight mb-1">
                      {item.title[lang]}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-snug">
                      {item.desc[lang]}
                    </p>
                  </div>
                  <div className="absolute bottom-[6.18%] right-12 flex flex-col items-end gap-3">
                    <img
                      src="/assets/t-cross-2.png"
                      alt=""
                      className="opacity-90 translate-x-[50px] translate-y-[250px] mix-blend-overlay w-[min(52vw,364px)] h-auto"
                    />
                    <button
                      type="button"
                      onClick={(e) => toggleLike(i, e)}
                      className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-md shrink-0"
                      aria-label={likes[i] ? "Убрать лайк" : "Лайк"}
                    >
                      <HeartIcon filled={!!likes[i]} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {MARVIN_ITEMS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                className={`h-1 rounded-full transition-all duration-700 ease-in-out ${
                  i === selectedIndex ? "w-8 bg-white" : "w-1 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Перейти к ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
