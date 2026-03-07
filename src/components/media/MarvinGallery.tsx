"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";
import { MARVIN_ITEMS } from "./marvinGalleryData";

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
  const [bgGradient, setBgGradient] = useState<string>("linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)");

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
    setBgGradient("linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)");
    extractGradientFromImage(MARVIN_ITEMS[selectedIndex].src).then(setBgGradient);
  }, [selectedIndex]);

  return (
    <section className="py-16 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-xl font-semibold text-white/90">{t.marvin} — {t.gallery}</h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {MARVIN_ITEMS.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#0f0a1e]"
            >
              <Image
                src={item.src}
                alt={item.title[lang]}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-sm font-medium text-white/95 truncate drop-shadow-lg">{item.title[lang]}</p>
              </div>
              <button
                type="button"
                onClick={(e) => toggleLike(i, e)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm"
                aria-label={likes[i] ? "Убрать лайк" : "Лайк"}
              >
                <HeartIcon filled={!!likes[i]} />
              </button>
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-colors backdrop-blur-sm"
            aria-label="Предыдущее"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-colors backdrop-blur-sm"
            aria-label="Следующее"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-2xl overflow-hidden min-h-[65vh] sm:min-h-[80vh] w-full transition-[background] duration-500"
              style={{ background: bgGradient }}
            >
              <Image
                src={MARVIN_ITEMS[selectedIndex].src}
                alt={MARVIN_ITEMS[selectedIndex].title[lang]}
                fill
                className="object-contain object-left-bottom"
                sizes="100vw"
              />
              <div
                className="absolute max-w-md -rotate-1"
                style={{
                  left: "6.18%",
                  bottom: "6.18%",
                  right: "auto",
                }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white/95 tracking-tight mb-1">
                  {MARVIN_ITEMS[selectedIndex].title[lang]}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-snug">
                  {MARVIN_ITEMS[selectedIndex].desc[lang]}
                </p>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-3">
                <img
                  src="/assets/t-cross-2.png"
                  alt=""
                  className="opacity-90 translate-x-[50px] translate-y-[250px] mix-blend-overlay"
                />
                <button
                  type="button"
                  onClick={(e) => toggleLike(selectedIndex, e)}
                  className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-md shrink-0"
                  aria-label={likes[selectedIndex] ? "Убрать лайк" : "Лайк"}
                >
                  <HeartIcon filled={!!likes[selectedIndex]} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
