"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLiked } from "@/hooks/useLiked";
import FlameIcon from "@/components/icons/FlameIcon";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { incrementLocalCount, decrementLocalCount } from "@/hooks/useAnalyticsCount";

type Concept = {
  ru: { name: string };
  de: { name: string };
  assets: { key: string; labelRu: string; labelDe: string; path: string }[];
};

const INTRO = {
  ru: `Петроглифы — ручная графика, нарисованная планшетом. Здесь нет ИИ. Здесь прикосновение руки человека. Огонь, животное, человек, tribe — архетипы сообщества. Эта концепция резонирует с ядром Tribe: аутентичность, реальные связи, «преврати страсть в бизнес».`,
  de: `Petroglyphen — handgezeichnete Grafik mit dem Zeichentablett. Kein KI. Hier spürt man die Hand. Feuer, Tier, Mensch, tribe — Archetypen der Gemeinschaft. Dieses Konzept trifft den Kern von Tribe: Authentizität, echte Verbindungen, «Leidenschaft in Business verwandeln».`,
};

const WHY = {
  ru: {
    title: "Почему это работает",
    p1: "Ручная графика без ИИ — сильный месседж аутентичности. Creator-архетип: «создай своё», «твой бренд». Дифференциация в эпоху AI-контента.",
    p2: "Петроглифы — древний язык племени. Огонь, животное, человек — архетипы, которые находят отклик. «Real people. Real connections.» — прямо в визуале.",
    p3: "Масштабируемость: мерч, баннеры, обложки YouTube, наклейки, флаги. Один дизайн — бесконечные воплощения.",
  },
  de: {
    title: "Warum es funktioniert",
    p1: "Handgezeichnete Grafik ohne KI — starke Botschaft der Authentizität. Creator-Archetyp: «erschaffe dein Eigenes», «deine Marke». Differenzierung im Zeitalter von KI-Inhalten.",
    p2: "Petroglyphen — die alte Sprache des Stammes. Feuer, Tier, Mensch — Archetypen, die Resonanz finden. «Real people. Real connections.» — direkt im Visuellen.",
    p3: "Skalierbarkeit: Merch, Banner, YouTube-Cover, Aufkleber, Fahnen. Ein Design — unendliche Verkörperungen.",
  },
};

const MERCH_ITEMS = [
  { id: "tshirt-black", ru: "Футболка чёрная", de: "T-Shirt schwarz" },
  { id: "tshirt-white", ru: "Футболка чёрная · женщина", de: "T-Shirt schwarz · Frau" },
  { id: "backpack", ru: "Рюкзак", de: "Rucksack" },
  { id: "bag", ru: "Сумка", de: "Tasche" },
  { id: "flag", ru: "Флаг", de: "Flagge" },
  { id: "car-hood", ru: "Капот авто", de: "Auto-Motorhaube" },
  { id: "notebook", ru: "Блокнот", de: "Notizbuch" },
] as const;

const UI = {
  ru: {
    conceptTag: "Концепция",
    back: "На главную",
    elements: "Элементы",
    download: "Скачать",
    copy: "Копировать SVG",
    copied: "Скопировано!",
    fire: "Огонь",
    merch: "Мерч",
    merchDesc: "Примеры применения дизайна. Сгенерировано fal.ai.",
    swipeHint: "← Свайп / Scroll →",
    banners: "Баннеры и обложки",
    bannersDesc: "Для соцсетей, YouTube, презентаций.",
  },
  de: {
    conceptTag: "Konzept",
    back: "Zur Startseite",
    elements: "Elemente",
    download: "Herunterladen",
    copy: "SVG kopieren",
    copied: "Kopiert!",
    fire: "Feuer",
    merch: "Merch",
    merchDesc: "Anwendungsbeispiele. Generiert mit fal.ai.",
    swipeHint: "← Wischen / Scroll →",
    banners: "Banner und Covers",
    bannersDesc: "Für Social Media, YouTube, Präsentationen.",
  },
};

export default function ConceptPromo({ conceptId, concept }: { conceptId: string; concept: Concept }) {
  const { lang } = useLanguage();
  const l = lang === "de" ? "de" : "ru";
  const t = INTRO[l];
  const ui = UI[l];
  const targetId = `concept-${conceptId}`;
  const [liked, setLikedState] = useLiked(targetId);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const merchScrollRef = useRef<HTMLDivElement>(null);
  const isJumpingRef = useRef(false);
  const { trackLike, trackCopy } = useAnalytics();

  const name = concept[lang === "de" ? "de" : "ru"].name;

  // Infinite carousel: [set1][set2][set3][set1] — scroll right past last → first slides in; scroll left past first → last slides in
  useEffect(() => {
    const el = merchScrollRef.current;
    if (!el) return;
    const init = () => {
      const setWidth = el.scrollWidth / 4;
      el.scrollLeft = setWidth; // start at set2 (first items)
    };
    requestAnimationFrame(init);
  }, []);

  useEffect(() => {
    const el = merchScrollRef.current;
    if (!el) return;
    const handleScrollEnd = () => {
      if (isJumpingRef.current) return;
      const setWidth = el.scrollWidth / 4;
      const threshold = setWidth * 0.25;
      // Left edge (set1): scroll left past first → jump to end of set3 (last items)
      if (el.scrollLeft <= threshold) {
        isJumpingRef.current = true;
        el.scrollLeft = Math.max(0, 3 * setWidth - el.clientWidth);
        requestAnimationFrame(() => { isJumpingRef.current = false; });
      }
      // Right edge (set1 copy): scroll right past last → jump to start of set2 (first items)
      else if (el.scrollLeft >= 3 * setWidth - threshold) {
        isJumpingRef.current = true;
        el.scrollLeft = setWidth;
        requestAnimationFrame(() => { isJumpingRef.current = false; });
      }
    };
    el.addEventListener("scrollend", handleScrollEnd);
    return () => el.removeEventListener("scrollend", handleScrollEnd);
  }, []);

  const scrollMerch = (dir: -1 | 1) => {
    const el = merchScrollRef.current;
    if (!el) return;
    const first = el.querySelector("[data-merch-card]");
    const gap = 16;
    const step = first ? (first as HTMLElement).offsetWidth + gap : 400;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const toggleLike = useCallback(() => {
    const next = !liked;
    if (next) {
      trackLike(targetId, "concept");
      incrementLocalCount(targetId, "like");
    } else {
      decrementLocalCount(targetId, "like");
    }
    setLikedState(next);
  }, [liked, setLikedState, targetId, trackLike]);

  const handleCopy = useCallback(
    async (asset: { key: string; path: string }) => {
      try {
        const res = await fetch(asset.path);
        const svg = await res.text();
        await navigator.clipboard?.writeText(svg);
        trackCopy(targetId, "concept", asset.key);
        incrementLocalCount(targetId, "copy");
        setCopiedKey(asset.key);
        setTimeout(() => setCopiedKey(null), 2000);
      } catch {
        // ignore
      }
    },
    [targetId, trackCopy]
  );

  return (
    <div className="content-container">
      {/* Header */}
      <header className="border-b pb-8" style={{ borderColor: "var(--color-border)" }}>
        <Link
          href="/"
          className="text-sm font-medium mb-6 inline-block opacity-70 hover:opacity-100 transition-opacity"
          style={{ color: "var(--color-text)" }}
        >
          ← {ui.back}
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--color-cta1)" }}>
              {ui.conceptTag}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-2" style={{ color: "var(--color-text)" }}>
              {name}
            </h1>
          </div>
          <button
            type="button"
            onClick={toggleLike}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors"
            style={{
              borderColor: "var(--color-border)",
              background: liked ? "var(--color-bg-active)" : "transparent",
              color: "var(--color-text)",
            }}
          >
            <FlameIcon filled={liked} size={22} className={liked ? "" : "opacity-60"} />
            <span className="font-medium">{ui.fire}</span>
            <AnalyticsCountBadge targetId={targetId} type="like" />
          </button>
        </div>
      </header>

      {/* Intro */}
      <section className="py-12">
        <p className="text-lg sm:text-xl leading-relaxed max-w-3xl" style={{ color: "var(--color-muted)" }}>
          {t}
        </p>
      </section>

      {/* Why it works */}
      <section className="py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
          {WHY[l].title}
        </h2>
        <div className="space-y-4 max-w-3xl">
          <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
            {WHY[l].p1}
          </p>
          <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
            {WHY[l].p2}
          </p>
          <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
            {WHY[l].p3}
          </p>
        </div>
      </section>

      {/* Assets */}
      <section className="py-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-8" style={{ color: "var(--color-text)" }}>
          {ui.elements}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {concept.assets.map((asset) => {
            const label = lang === "de" ? asset.labelDe : asset.labelRu;
            const isCopied = copiedKey === asset.key;
            return (
              <div
                key={asset.key}
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
              >
                <div className="aspect-square flex items-center justify-center p-8 bg-[#0a0a0a]">
                  <img src={asset.path} alt={label} className="max-w-full max-h-full object-contain opacity-95" />
                </div>
                <div className="p-4 border-t space-y-2 rounded-b-2xl overflow-hidden" style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}>
                  <p className="font-medium text-sm" style={{ color: "var(--color-text)" }}>
                    {label}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={asset.path}
                      download
                      className="text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
                      style={{ background: "var(--color-cta1)", color: "#fff" }}
                    >
                      {ui.download}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(asset)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-opacity hover:opacity-90"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
                    >
                      {isCopied ? ui.copied : ui.copy}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Merch — горизонтальный карусель, крупные стрелки, навылет, без скруглений */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen py-16">
        <div className="content-container mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
            {ui.merch}
          </h2>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            {ui.merchDesc}
          </p>
        </div>
        <div className="relative flex items-center">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 sm:w-28 z-10 flex items-center justify-start pl-4 sm:pl-6 cursor-pointer group/left"
            onClick={() => scrollMerch(-1)}
            onKeyDown={(e) => e.key === "Enter" && scrollMerch(-1)}
            role="button"
            tabIndex={0}
            aria-label="Предыдущий"
          >
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover/left:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85), transparent)" }}
            />
            <svg
              className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 transition-opacity duration-300 opacity-60 group-hover/left:opacity-100"
              style={{ color: "#fff" }}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div
            className="absolute right-0 top-0 bottom-0 w-24 sm:w-28 z-10 flex items-center justify-end pr-4 sm:pr-6 cursor-pointer group/right"
            onClick={() => scrollMerch(1)}
            onKeyDown={(e) => e.key === "Enter" && scrollMerch(1)}
            role="button"
            tabIndex={0}
            aria-label="Следующий"
          >
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover/right:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "linear-gradient(to left, rgba(0,0,0,0.85), transparent)" }}
            />
            <svg
              className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 transition-opacity duration-300 opacity-60 group-hover/right:opacity-100"
              style={{ color: "#fff" }}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div
            ref={merchScrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-16 sm:px-20 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[...MERCH_ITEMS, ...MERCH_ITEMS, ...MERCH_ITEMS, ...MERCH_ITEMS].map((item, idx) => {
              const label = lang === "de" ? item.de : item.ru;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  data-merch-card
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[55vw] max-w-[600px] snap-center group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={`/concepts/petrogliph/merch/${item.id}.png`}
                      alt={label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 flex items-end p-6"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      }}
                    >
                      <span
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
                        style={{
                          color: "#fff",
                          textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(253,110,112,0.15)",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Banners */}
      <section className="py-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          {ui.banners}
        </h2>
        <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
          {ui.bannersDesc}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="aspect-video bg-[#0a0a0a] flex items-center justify-center">
              <img
                src="/concepts/petrogliph/merch/banner-16x9.png"
                alt="Banner 16:9"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-medium text-sm" style={{ color: "var(--color-text)" }}>
                Баннер 16:9
              </p>
            </div>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="aspect-video bg-[#0a0a0a] flex items-center justify-center">
              <img
                src="/concepts/petrogliph/merch/youtube-cover.png"
                alt="YouTube Cover"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-medium text-sm" style={{ color: "var(--color-text)" }}>
                Обложка YouTube
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholders */}
      <section className="py-16 space-y-12">
        <div className="aspect-[16/9] rounded-2xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: "var(--color-border)" }}>
          <span className="text-sm" style={{ color: "var(--color-muted)" }}>
            [Голос · аудио]
          </span>
        </div>
        <div className="aspect-[16/9] rounded-2xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: "var(--color-border)" }}>
          <span className="text-sm" style={{ color: "var(--color-muted)" }}>
            [Анимации]
          </span>
        </div>
      </section>

      <footer className="pt-12 border-t" style={{ borderColor: "var(--color-border)" }}>
        <Link href="/" className="text-sm font-medium" style={{ color: "var(--color-cta1)" }}>
          ← {ui.back}
        </Link>
      </footer>
    </div>
  );
}
