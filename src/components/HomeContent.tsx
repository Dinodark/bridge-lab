"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeBanner from "@/components/HomeBanner";
import HomeJingles from "@/components/home/HomeJingles";
import HomeConcepts from "@/components/home/HomeConcepts";
import HomeVideoSplashes from "@/components/home/HomeVideoSplashes";
import HomeVisuals from "@/components/home/HomeVisuals";
import { ImagePlaceholder } from "@/components/home/ImagePlaceholder";
import DesignLoopSection from "@/components/DesignLoopSection";
import CursorAnthemBlock from "@/components/CursorAnthemBlock";
import SiteFooter from "@/components/SiteFooter";
import UsefulButton from "@/components/UsefulButton";

const CONTENT = {
  ru: {
    tribeInsights: `Просмотрев материалы Tribe, партнёр увидит целостную систему идентичности: как одно ядро бренда воплощается в разных контекстах — от DAO до мерча. Это вдохновляет на понимание масштабируемости подхода и потенциала community-driven продукта.`,
    coreExplainer: "Одно ядро. Бесконечные воплощения. Целостная система идентичности Tribe и Bridge — от дизайна до DAO, от музыки до мерча — представлена здесь в едином пространстве. Ваша реакция помогает понять, что находит отклик.",
    coreTag: "Ядро",
    tribeSectionTitle: "Что увидит партнёр",
    tastyTitle: "Вкусняшки разделов",
    tastySubtitle: "Ключевая идея и как использовать каждый материал",
    tastyBlocks: [
      { href: "/tribe", tag: "Tribe", keyIdea: "Living Identity System", use: "Одно ядро — бесконечные темы. Fire, Water, Earth, Cosmos.", thumbnail: "/assets/tribe-thumbnail.png" },
      { href: "/dao", tag: "DAO", keyIdea: "Сообщество решает", use: "Прозрачность, соучастие, децентрализация. Governance в действии.", thumbnail: "/assets/dao-thumbnail.png" },
      { href: "/media", tag: "Media", keyIdea: "Видео, изображения, AI", use: "FLUX LoRA, галерея контента. Медиа как актив бренда.", thumbnail: "/assets/media-thumbnail.png" },
      { href: "/music", tag: "Music", keyIdea: "PROD · Anthem & Lounge", use: "Cursor In The Dark, Push It To Prod. Наша музыка.", thumbnail: "/assets/music-thumbnail.png" },
      { href: "/strategy", tag: "Strategy", keyIdea: "Стратегия", use: "Видение, цели, направления. Как мы движемся.", thumbnail: "/assets/strategy-thumbnail.png" },
      { href: "/vision", tag: "Vision", keyIdea: "One Tribe · Видение", use: "Сообщество, движение, новый мир. Манифест и почему Tribe.", thumbnail: "/assets/vision-thumbnail.png" },
      { href: "/brandguidelines", tag: "Brand", keyIdea: "Foundation & Motion", use: "Цвета, типографика, DAO Sphere, волны. Вдохновляющие стандарты.", thumbnail: "/assets/brand-thumbnail.png" },
      { href: "/roadmap", tag: "Roadmap", keyIdea: "План развития", use: "Версионность, локализация, ИИ-агенты. Куда движемся.", thumbnail: "/assets/roadmap-thumbnail.png" },
      { href: "/marketing", tag: "Marketing", keyIdea: "План и анализ", use: "Маркетинг tribe.de, слоганы, NLP, гайды для дизайнеров и разработчиков.", thumbnail: "/assets/strategy-thumbnail.png" },
    ],
    openLink: "Открыть",
    merchDesc: "Футболка с логотипом OneTribe. Белая и чёрная. Классика племени.",
    viewLink: "Смотреть",
    bridgeSubtitle: "Лендинги-презентации платформы",
    bridgeLandings: [
      { href: "/blockchain", title: "Bridge", subtitle: "The First Blockchain Charity Platform", desc: "Where Good Deeds Become Digital Legacy. NFT-driven charity.", headerImage: "/assets/bridge-card-bg.png" },
      { href: "/crypto", title: "Mobile First", subtitle: "Bridge Crypto — Криптоблаготворительность", desc: "Community driven. Transparent charity on web3.", headerImage: "/assets/crypto-card-bg.png" },
      { href: "/explore", title: "Starter", subtitle: "Explore Cases — Find Projects That Matter", desc: "190 проектов. Найдите то, что важно для вас.", headerImage: "/assets/explore-card-bg.png" },
    ],
    futureTitle: "Куда движемся",
    futureSubtitle: "Цели, способы и гипотезы. Что мы изучаем и куда идём.",
    futureGoals: [
      "Локализация RU/EN/ZH/DE — Tribe говорит на языке сообщества",
      "ИИ-агенты для поддержки и модерации — масштаб без потери качества",
      "Инструменты Tribe — Host-панели, аналитика, геймификация",
      "Интеграция с Bridge — благотворительность как часть идентичности",
    ],
    futureHook: "Мы изучаем, экспериментируем и строим. Хотите увидеть, что будет дальше?",
    resultsTitle: "Результаты · Продукты",
    resultsSubtitle: "Что уже сделано и что в планах.",
    resultSite: "Этот сайт — продукт творчества и хаб проекта.",
    resultMerch: "Дизайн мерча — футболки OneTribe.",
    resultAudio: "Аудио — гимн PROD. Cursor, код, Deutschland × Россия.",
    resultPlans: "В планах — видео, анимация.",
  },
  de: {
    tribeInsights: `Nach der Durchsicht der Tribe-Materialien sieht der Partner ein ganzheitliches Identitätssystem: wie ein einziges Markenkern in verschiedenen Kontexten umgesetzt wird — von DAO bis Merch. Das inspiriert zum Verständnis der Skalierbarkeit des Ansatzes und des Potenzials von Community-driven Produkten.`,
    coreExplainer: "Ein Kern. Unendliche Verkörperungen. Ein ganzheitliches Identitätssystem von Tribe und Bridge — von Design bis DAO, von Musik bis Merch — in einem Raum. Ihre Reaktion hilft zu verstehen, was Resonanz findet.",
    coreTag: "Kern",
    tribeSectionTitle: "Was der Partner sieht",
    tastyTitle: "Highlights der Bereiche",
    tastySubtitle: "Kernidee und Nutzung jedes Materials",
    tastyBlocks: [
      { href: "/tribe", tag: "Tribe", keyIdea: "Living Identity System", use: "Ein Kern — unendliche Themen. Fire, Water, Earth, Cosmos.", thumbnail: "/assets/tribe-thumbnail.png" },
      { href: "/dao", tag: "DAO", keyIdea: "Die Community entscheidet", use: "Transparenz, Mitbestimmung, Dezentralisierung. Governance in Aktion.", thumbnail: "/assets/dao-thumbnail.png" },
      { href: "/media", tag: "Media", keyIdea: "Video, Bilder, AI", use: "FLUX LoRA, Content-Galerie. Medien als Markenasset.", thumbnail: "/assets/media-thumbnail.png" },
      { href: "/music", tag: "Music", keyIdea: "PROD · Anthem & Lounge", use: "Cursor In The Dark, Push It To Prod. Unsere Musik.", thumbnail: "/assets/music-thumbnail.png" },
      { href: "/strategy", tag: "Strategy", keyIdea: "Strategie", use: "Vision, Ziele, Richtungen. Wie wir uns bewegen.", thumbnail: "/assets/strategy-thumbnail.png" },
      { href: "/vision", tag: "Vision", keyIdea: "One Tribe · Vision", use: "Community, Bewegung, neue Welt. Manifest und warum Tribe.", thumbnail: "/assets/vision-thumbnail.png" },
      { href: "/brandguidelines", tag: "Brand", keyIdea: "Foundation & Motion", use: "Farben, Typografie, DAO Sphere, Wellen. Inspirierende Standards.", thumbnail: "/assets/brand-thumbnail.png" },
      { href: "/roadmap", tag: "Roadmap", keyIdea: "Entwicklungsplan", use: "Versionierung, Lokalisierung, KI-Agenten. Wohin wir gehen.", thumbnail: "/assets/roadmap-thumbnail.png" },
      { href: "/marketing", tag: "Marketing", keyIdea: "Plan und Analyse", use: "Marketing tribe.de, Slogans, NLP, Leitfäden für Designer und Entwickler.", thumbnail: "/assets/strategy-thumbnail.png" },
    ],
    openLink: "Öffnen",
    merchDesc: "T-Shirt mit OneTribe-Logo. Weiß und Schwarz. Klassiker des Stammes.",
    viewLink: "Ansehen",
    bridgeSubtitle: "Plattform-Landingpages",
    bridgeLandings: [
      { href: "/blockchain", title: "Bridge", subtitle: "The First Blockchain Charity Platform", desc: "Where Good Deeds Become Digital Legacy. NFT-driven charity.", headerImage: "/assets/bridge-card-bg.png" },
      { href: "/crypto", title: "Mobile First", subtitle: "Bridge Crypto — Krypto-Benefiz", desc: "Community driven. Transparente Wohltätigkeit auf web3.", headerImage: "/assets/crypto-card-bg.png" },
      { href: "/explore", title: "Starter", subtitle: "Explore Cases — Find Projects That Matter", desc: "190 Projekte. Finden Sie, was Ihnen wichtig ist.", headerImage: "/assets/explore-card-bg.png" },
    ],
    futureTitle: "Wohin wir uns bewegen",
    futureSubtitle: "Ziele, Wege und Hypothesen. Was wir erforschen und wohin wir gehen.",
    futureGoals: [
      "Lokalisierung RU/EN/ZH/DE — Tribe spricht die Sprache der Community",
      "KI-Agenten für Support und Moderation — Skalierung ohne Qualitätsverlust",
      "Tribe-Tools — Host-Panels, Analytics, Gamification",
      "Integration mit Bridge — Wohltätigkeit als Teil der Identität",
    ],
    futureHook: "Wir erforschen, experimentieren und bauen. Möchten Sie sehen, was als Nächstes kommt?",
    resultsTitle: "Ergebnisse · Produkte",
    resultsSubtitle: "Was bereits gemacht ist und was geplant ist.",
    resultSite: "Diese Website — Kreativprodukt und Projekt-Hub.",
    resultMerch: "Merch-Design — OneTribe T-Shirts.",
    resultAudio: "Audio — PROD Hymne. Cursor, Code, Deutschland × Russland.",
    resultPlans: "Geplant — Video, Animation.",
  },
} as const;

const LERP_TEXT = 0.06;  // текст реагирует быстрее
const LERP_TAG = 0.018;  // ЯДРО — длинное запаздывание
const PARALLAX_STRENGTH = 14; // пикселей смещения

export default function HomeContent() {
  const { lang } = useLanguage();
  const t = CONTENT[lang];
  const coreRef = useRef<HTMLElement>(null);
  const [textOffset, setTextOffset] = useState(0);
  const [tagOffset, setTagOffset] = useState(0);
  const targetRef = useRef({ text: 0, tag: 0 });
  const smoothRef = useRef({ text: 0, tag: 0 });

  useEffect(() => {
    const onScroll = () => {
      const el = coreRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 когда секция внизу, 1 когда вверху
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      targetRef.current = {
        text: progress * PARALLAX_STRENGTH,  // текст смещается вниз навстречу
        tag: -progress * PARALLAX_STRENGTH,  // ЯДРО смещается вверх навстречу
      };
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf: number;
    const tick = () => {
      const { text: tT, tag: tG } = targetRef.current;
      const { text: sT, tag: sG } = smoothRef.current;
      smoothRef.current = {
        text: sT + (tT - sT) * LERP_TEXT,
        tag: sG + (tG - sG) * LERP_TAG,
      };
      setTextOffset(smoothRef.current.text);
      setTagOffset(smoothRef.current.tag);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)", fontFamily: "var(--font-body)" }}>
      <HomeBanner />

      <div className="content-container space-y-24 py-20">
        <section
          ref={coreRef}
          className="relative py-12 sm:py-16 px-6 sm:px-10 max-w-3xl"
          style={{ background: "var(--color-bg)" }}
        >
          <span
            className="absolute bottom-0 right-0 pb-0 pr-0 text-[clamp(7rem,22vw,18rem)] font-extrabold leading-[0.9] tracking-tighter select-none pointer-events-none"
            style={{
              color: "var(--color-border)",
              opacity: 0.35,
              fontFamily: "var(--font-body)",
              transform: `translate(calc(45% + ${tagOffset}px), calc(35% + ${tagOffset}px))`,
            }}
            aria-hidden
          >
            {t.coreTag.toUpperCase()}
          </span>
          <p
            className="relative z-10 text-xl sm:text-2xl md:text-3xl leading-relaxed italic max-w-xl"
            style={{ color: "var(--color-text)", transform: `translateY(${textOffset}px)` }}
          >
            {t.coreExplainer}
          </p>
        </section>
        <HomeJingles />
        <HomeConcepts />
        <HomeVideoSplashes />
        <HomeVisuals />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ImagePlaceholder aspect="4/3" label="[Изображение]" className="rounded-2xl w-full max-w-lg" />
          <div>
            <div className="inline-block text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--color-cta1)" }}>
              TRIBE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-6" style={{ color: "var(--color-text)" }}>
              {t.tribeSectionTitle}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {t.tribeInsights}
            </p>
          </div>
        </section>

        <DesignLoopSection />

        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
            {t.tastyTitle}
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--color-muted)" }}>
            {t.tastySubtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.tastyBlocks.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <article
                  className="rounded-xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
                >
                  <ImagePlaceholder aspect="square" label="[Изображение]" className="w-full mb-4" />
                  <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "var(--color-cta1)" }}>
                    {item.tag}
                  </span>
                  <h3 className="text-base font-bold mt-1 mb-2" style={{ color: "var(--color-text)" }}>
                    {item.keyIdea}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {item.use}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--color-cta1)" }}>
                    {t.openLink}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <Link href="/merch" className="group block">
            <article
              className="relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/assets/merch-banner-logo.png)" }}
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 md:p-10">
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                    Merch
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#fff" }}>
                    OneTribe Merch
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {t.merchDesc}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
                    style={{ color: "var(--color-cta1)" }}
                  >
                    {t.viewLink}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
            Bridge
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--color-muted)" }}>
            {t.bridgeSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.bridgeLandings.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <article
                  className="relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
                >
                  <div className="w-full overflow-hidden rounded-t-2xl">
                    <ImagePlaceholder aspect="video" label="[Изображение]" className="w-full rounded-none" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
                      {item.subtitle}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-muted)" }}>
                      {item.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium transition-all group-hover:gap-2.5"
                      style={{ color: "var(--color-cta1)" }}
                    >
                      {t.viewLink}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
            {t.resultsTitle}
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--color-muted)" }}>
            {t.resultsSubtitle}
          </p>
          <ul className="space-y-3 mb-8" style={{ color: "var(--color-text)" }}>
            <li className="flex gap-2">
              <span className="text-[var(--color-cta1)]">·</span>
              {t.resultSite}
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-cta1)]">·</span>
              {t.resultMerch}
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-cta1)]">·</span>
              {t.resultAudio}
            </li>
            <li className="flex gap-2" style={{ color: "var(--color-muted)" }}>
              <span className="text-[var(--color-cta1)]">·</span>
              {t.resultPlans}
            </li>
          </ul>
          <CursorAnthemBlock />
          <div className="mt-6">
            <UsefulButton targetId="results-products" targetType="section" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
            {t.futureTitle}
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--color-muted)" }}>
            {t.futureSubtitle}
          </p>
          <ul className="space-y-4 mb-10">
            {t.futureGoals.map((goal, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--color-cta1)", color: "#fff" }}>
                  {i + 1}
                </span>
                <span className="text-base leading-relaxed" style={{ color: "var(--color-text)" }}>
                  {goal}
                </span>
              </li>
            ))}
          </ul>
          <div
            className="rounded-2xl border p-6 sm:p-8 text-center"
            style={{ borderColor: "var(--color-border)", background: "linear-gradient(135deg, #F8F5FF 0%, #FFF5FC 50%, #F5F8FF 100%)" }}
          >
            <p className="text-lg font-medium mb-4" style={{ color: "var(--color-text)" }}>
              {t.futureHook}
            </p>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:gap-3"
              style={{ background: "var(--color-cta1)", color: "#fff" }}
            >
              Roadmap
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
