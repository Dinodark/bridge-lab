"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";
import { SOULY_ITEMS } from "./soulyGalleryData";

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
          return { r: data[i], g: data[i + 1], b: data[i + 2] };
        };
        const toHex = (p: { r: number; g: number; b: number }) =>
          "#" + [p.r, p.g, p.b].map((x) => x.toString(16).padStart(2, "0")).join("");
        const c1 = toHex(sample(4, size >> 1));
        const c2 = toHex(sample(size >> 1, size >> 1));
        const c3 = toHex(sample(size - 5, size >> 1));
        resolve(`linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`);
      } catch {
        resolve("linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)");
      }
    };
    img.onerror = () => resolve("linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)");
    img.src = src.startsWith("/") ? window.location.origin + src : src;
  });
}

const LOOP_DURATION = 60;
const LERP_TO_TARGET = 0.07;
const LERP_TO_BASE = 0.04;
const EDGE_SPEED_BOOST = 12;

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

function Spark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute w-1.5 h-1.5 rounded-full bg-white/80 -translate-x-1/2 -translate-y-1/2 ${className}`}
    />
  );
}

function FlipIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M22 12a10 10 0 0 0-18-6" />
      <circle cx="12" cy="12" r="3" strokeWidth="1" />
    </svg>
  );
}

export default function MediaGrid() {
  const { lang } = useLanguage();
  const t = T[lang];
  const items = [...SOULY_ITEMS, ...SOULY_ITEMS];
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseXRef = useRef<number | null>(null);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [gradients, setGradients] = useState<Record<number, string>>({});
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [flipAnimating, setFlipAnimating] = useState<Record<number, "forward" | "reverse" | null>>({});
  const gradientsRequested = useRef<Set<number>>(new Set());
  const defaultGradient = "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)";

  const handleFlip = (i: number, e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation?.();
    const isFlipped = flipped[i];
    if (isFlipped) {
      setFlipAnimating((prev) => ({ ...prev, [i]: "reverse" }));
      setTimeout(() => {
        setFlipped((prev) => ({ ...prev, [i]: false }));
        setFlipAnimating((prev) => ({ ...prev, [i]: null }));
      }, 450);
    } else {
      setFlipped((prev) => ({ ...prev, [i]: true }));
      setFlipAnimating((prev) => ({ ...prev, [i]: "forward" }));
      setTimeout(() => setFlipAnimating((prev) => ({ ...prev, [i]: null })), 700);
    }
  };
  const posRef = useRef(0);
  const velRef = useRef(0);
  const loopWidthRef = useRef(0);
  const lastTimeRef = useRef(0);

  const toggleLike = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const popupIndex = selectedIndex !== null ? selectedIndex % SOULY_ITEMS.length : 0;
  const goPrev = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : ((prev % SOULY_ITEMS.length) - 1 + SOULY_ITEMS.length) % SOULY_ITEMS.length
    );
  };
  const goNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : ((prev % SOULY_ITEMS.length) + 1) % SOULY_ITEMS.length
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    SOULY_ITEMS.forEach((item, i) => {
      if (!gradientsRequested.current.has(i)) {
        gradientsRequested.current.add(i);
        extractGradientFromImage(item.src).then((g) =>
          setGradients((prev) => ({ ...prev, [i]: g }))
        );
      }
    });
  }, [selectedIndex]);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const measure = () => {
      const w = track.offsetWidth;
      loopWidthRef.current = w / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right) {
        mouseXRef.current = e.clientX - rect.left;
      } else {
        mouseXRef.current = null;
      }
    };
    const handleMouseLeave = () => {
      mouseXRef.current = null;
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let raf: number;
    const tick = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      const loopWidth = loopWidthRef.current;
      if (loopWidth <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const baseSpeed = loopWidth / LOOP_DURATION;
      const mx = mouseXRef.current;
      const containerWidth = container.offsetWidth || 1;
      const halfW = containerWidth / 2;

      let targetSpeed: number;
      if (mx === null) {
        targetSpeed = baseSpeed;
      } else {
        const distFromCenter = Math.abs(mx - halfW);
        const d = Math.min(distFromCenter / halfW, 1);
        const factor = 1 + d * d * (EDGE_SPEED_BOOST - 1);
        const sign = mx < halfW ? -1 : 1;
        targetSpeed = baseSpeed * factor * sign;
      }

      const lerp = mx === null ? LERP_TO_BASE : LERP_TO_TARGET;
      velRef.current += (targetSpeed - velRef.current) * lerp;
      posRef.current -= velRef.current * dt;

      if (posRef.current < -loopWidth) posRef.current += loopWidth;
      if (posRef.current > 0) posRef.current -= loopWidth;

      track.style.transform = `translateX(${posRef.current}px)`;
      raf = requestAnimationFrame(tick);
    };
    lastTimeRef.current = performance.now();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (selectedIndex === null) {
      setFlipped({});
      setFlipAnimating({});
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex]);

  return (
    <section className="py-16 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h2 className="text-xl font-semibold text-white/90">{t.gallery}</h2>
      </div>
      <div
        ref={containerRef}
        className="relative left-1/2 -translate-x-1/2 overflow-hidden py-6"
        style={{ width: "calc(100vw + 80px)" }}
      >
        <div
          ref={trackRef}
          className="flex gap-2 min-w-max transition-none"
          style={{ willChange: "transform" }}
        >
          {items.map((item, i) => {
            const idx = i % SOULY_ITEMS.length;
            const data = SOULY_ITEMS[idx];
            const likeKey = idx;
            return (
              <div
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedIndex(i);
                  }
                }}
                className="group relative flex-shrink-0 w-48 sm:w-56 md:w-64 aspect-square overflow-visible rounded-lg cursor-pointer"
              >
                <div
                  className="relative w-full h-full overflow-hidden rounded-lg transition-all duration-300 ease-out
                    group-hover:scale-[1.05] group-hover:shadow-[0_0_24px_rgba(178,137,249,0.4),0_0_48px_rgba(72,229,255,0.2)]
                    group-hover:ring-2 group-hover:ring-white/60 group-hover:ring-offset-2 group-hover:ring-offset-[#0f0a1e]"
                >
                  <Image
                    src={item.src}
                    alt={data.title[lang]}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                  {/* Искры по краям при hover */}
                  <div className="souly-card-sparks pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Spark className="top-[8%] left-[10%]" />
                    <Spark className="top-[8%] right-[10%]" />
                    <Spark className="bottom-[8%] left-[10%]" />
                    <Spark className="bottom-[8%] right-[10%]" />
                    <Spark className="top-1/2 left-[4%]" />
                    <Spark className="top-1/2 right-[4%]" />
                    <Spark className="top-[25%] left-1/2" />
                    <Spark className="top-[75%] left-1/2" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => toggleLike(likeKey, e)}
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-sm z-10"
                    aria-label={likes[likeKey] ? "Убрать лайк" : "Лайк"}
                  >
                    <HeartIcon filled={!!likes[likeKey]} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Попап — как MarvinGallery */}
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
              style={{ transform: `translateX(-${popupIndex * 100}%)` }}
            >
              {SOULY_ITEMS.map((item, i) => (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => { e.stopPropagation(); handleFlip(i, e as React.MouseEvent); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleFlip(i, e); } }}
                  className="group/card flex-shrink-0 w-[min(90vw,930px)] relative rounded-2xl overflow-hidden pl-0 pr-0 md:pr-[min(162px,18%)] cursor-pointer"
                  style={{ background: gradients[i] ?? defaultGradient }}
                >
                  {/* Иконка переворота — слева сверху, яркий ореол и оборот при hover на карточку */}
                  <div
                    className="absolute top-6 left-6 z-20 p-1 souly-flip-icon-wrapper"
                    aria-hidden
                  >
                    <FlipIcon className="w-20 h-20 text-white/90 group-hover/card:text-white transition-colors duration-300" />
                  </div>

                  <img
                    src={item.src}
                    alt={item.title[lang]}
                    className="max-w-full max-h-[90vh] w-auto h-auto block ml-0 mr-auto object-contain"
                  />

                  {/* Оверлей переворота — градиент, белый свет, кружок, имя */}
                  {flipped[i] && (
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 backdrop-blur-sm"
                      style={{ background: "transparent" }}
                    >
                      {/* Градиентный круг, расширяется, backdrop-blur */}
                      <div
                        className="absolute w-48 h-48 rounded-full origin-center"
                        style={{
                          background: "radial-gradient(circle at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.65) 25%, rgba(248,248,255,0.5) 45%, rgba(220,220,240,0.3) 65%, rgba(180,180,220,0.15) 85%, transparent 100%)",
                          boxShadow: "0 0 120px 60px rgba(255,255,255,0.25)",
                          ...(flipAnimating[i] === "forward"
                            ? { animation: "souly-flip-expand 0.5s cubic-bezier(0.25,0.46,0.45,0.94) forwards" }
                            : flipAnimating[i] === "reverse"
                              ? { animation: "souly-flip-expand 0.4s cubic-bezier(0.55,0,0.45,1) reverse forwards" }
                              : { transform: "scale(15)", opacity: 1, backdropFilter: "blur(24px)" }),
                        }}
                      />
                      {/* Кружок + имя */}
                      <div
                        className="relative flex flex-col items-center"
                        style={{
                          gap: 24,
                          ...(flipAnimating[i] === "forward"
                            ? { animation: "souly-flip-bounce 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.25s both" }
                            : flipAnimating[i] === "reverse"
                              ? { animation: "souly-flip-bounce-rev 0.3s ease-in both" }
                              : { opacity: 1, transform: "scale(1)" }),
                        }}
                      >
                        <div className="relative shrink-0">
                          <div
                            className="rounded-full overflow-hidden bg-white/90 shadow-xl backdrop-blur-sm"
                            style={{
                              width: 168,
                              height: 168,
                              ...(flipAnimating[i] === "forward"
                                ? { animation: "souly-flip-moveup 0.25s ease-out 0.45s both" }
                                : flipAnimating[i] === "reverse"
                                  ? { animation: "souly-flip-moveup-rev 0.2s ease-in both" }
                                  : { transform: "translateY(0)" }),
                            }}
                          >
                            <img
                              src="/assets/avatar-girl.webp"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div
                            className="absolute w-7 h-7 rounded-full bg-[#0866FF] flex items-center justify-center text-xs font-bold text-white border-2 border-white"
                            style={{ right: 12, bottom: 12 }}
                          >
                            {(item as { level?: number }).level ?? 1}
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 text-center max-w-xs">
                          <span
                            className="text-2xl font-semibold text-[#1a1a1a]"
                            style={{
                              ...(flipAnimating[i] === "forward"
                                ? { animation: "souly-flip-name-in 0.2s ease-out 0.55s both" }
                                : flipAnimating[i] === "reverse"
                                  ? { animation: "souly-flip-name-out 0.15s ease-in both" }
                                  : { opacity: 1 }),
                            }}
                          >
                            {(item as { user?: { ru: string; de: string } }).user?.[lang] ?? item.title[lang]}
                          </span>
                          <p
                            className="text-sm text-[#555] leading-snug"
                            style={{
                              ...(flipAnimating[i] === "forward"
                                ? { animation: "souly-flip-name-in 0.2s ease-out 0.6s both" }
                                : flipAnimating[i] === "reverse"
                                  ? { animation: "souly-flip-name-out 0.15s ease-in both" }
                                  : { opacity: 1 }),
                            }}
                          >
                            {(item as { achievements?: { ru: string; de: string } }).achievements?.[lang]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
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
          {/* Thumbnails */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {SOULY_ITEMS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  i === popupIndex ? "border-white scale-110" : "border-white/30 hover:border-white/60"
                }`}
                aria-label={`Перейти к ${i + 1}`}
              >
                <img
                  src={SOULY_ITEMS[i].src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
