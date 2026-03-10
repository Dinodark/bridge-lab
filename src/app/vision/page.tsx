"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { incrementLocalCount } from "@/hooks/useAnalyticsCount";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";
import TribeFireCanvas from "@/components/tribe/TribeFireCanvas";
import SparksCanvas from "@/components/tribe/SparksCanvas";
import { getTribeFireCopyPrompt } from "@/lib/tribe/copyPrompt";
import UsefulButton from "@/components/UsefulButton";

const TICKER_ITEMS = [
  "One World",
  "One Tribe",
  "Building the Visual Identity of the DACH Community",
  "Bridge — Crypto Charity",
  "DAO Governance",
  "Real People · Real Connections",
  "New World Begins Now",
];

const CONTENT = {
  ru: {
    eyebrow: "Сообщество · Движение · Новый мир",
    title: "One",
    titleEm: "Tribe",
    desc: "Настоящие люди. Настоящие связи. Сообщество, которое строит мир завтрашнего дня — вместе.",
    ctaTribe: "Войти в Tribe →",
    ctaStrategy: "Узнать о проекте",
    bridgeTag: "Bridge · Crypto Charity",
    bridgeTitle: "Good Deeds",
    bridgeTitleEm: "On-chain",
    bridgeDesc:
      "Первая блокчейн-платформа благотворительности. Поддерживай проекты сообщества прозрачно — каждый донат навсегда в блокчейне.",
    statProjects: "Проектов",
    statMembers: "Участников",
    ctaBridge: "Открыть Bridge →",
    manifestoBg: "TRIBE",
    manifestoText: "Что-то заканчивается.\nО новом мире не спорят —",
    manifestoEm: "его строят.",
    sectionWhy: "Почему Tribe",
    feat1Num: "01 ·",
    feat1Title: "Настоящие связи",
    feat1Text:
      "Никаких ботов. Никакого алгоритма. Лайк здесь — не валюта. Это живое сообщество реальных людей.",
    feat2Num: "02 ·",
    feat2Title: "DAO — ты решаешь",
    feat2Text:
      "Децентрализованное управление. Каждый участник голосует за развитие платформы и своего сообщества.",
    feat3Num: "03 ·",
    feat3Title: "Bridge — добро в блокчейне",
    feat3Text:
      "Финансируй проекты сообщества. Каждый донат прозрачен, верифицирован и существует вечно.",
    feat2Link: "DAO →",
    feat3Link: "Узнать больше",
    bridgeSectionTitle: "Where Good Deeds",
    bridgeSectionTitleEm: "Become Digital Legacy",
    bridgeSectionDesc:
      "Bridge — инфраструктура финансовой поддержки внутри Tribe. NFT-driven благотворительность. Система доната и взаимной поддержки проектов. Community driven. Transparent. On web3.",
    bridgeStat1: "Активных проектов",
    bridgeStat2: "Блокчейн-прозрачность",
    bridgeStat3: "Digital Legacy",
    bridgeStat4: "Community Governed",
    roadmapLabel: "Roadmap",
    rm1: "Локализация RU / EN / ZH / DE — Tribe говорит на языке сообщества",
    rm2: "ИИ-агенты для поддержки и модерации — масштаб без потери качества",
    rm3: "Host-панели, аналитика, геймификация — инструменты для создателей",
    rm4: "Bridge × Tribe — благотворительность как часть идентичности движения",
    footerLogo: "OneBridge · 2025",
    tryHint: "Кликните на белый шарик — он полетит к костру.",
    copyLogo: "Скопировать логотип",
    copied: "Скопировано!",
    downloadSvg: "Скачать SVG",
    copyGameCode: "Скопировать код игры",
    authorSectionTitle: "От автора",
    authorProject: "Tribe — растущее DACH-сообщество в Web3.",
    authorRole: "Моя задача как арт-директора — создать аудиовизуальный язык, который объединит нас (несмотря на языковой барьер) и будет понятно транслировать ценности Tribe вовне и внутрь.",
    authorIdea: "Дизайн здесь — не просто красота, а инструмент роста community-driven продукта.",
  },
  de: {
    eyebrow: "Community · Bewegung · Neue Welt",
    title: "One",
    titleEm: "Tribe",
    desc: "Echte Menschen. Echte Verbindungen. Eine Community, die die Welt von morgen gemeinsam baut.",
    ctaTribe: "Zu Tribe →",
    ctaStrategy: "Über das Projekt erfahren",
    bridgeTag: "Bridge · Crypto Charity",
    bridgeTitle: "Good Deeds",
    bridgeTitleEm: "On-chain",
    bridgeDesc:
      "Die erste Blockchain-Wohltätigkeitsplattform. Unterstütze Community-Projekte transparent — jede Spende ist für immer in der Blockchain.",
    statProjects: "Projekte",
    statMembers: "Teilnehmer",
    ctaBridge: "Bridge öffnen →",
    manifestoBg: "TRIBE",
    manifestoText: "Etwas endet.\nÜber die neue Welt wird nicht diskutiert —",
    manifestoEm: "sie wird gebaut.",
    sectionWhy: "Warum Tribe",
    feat1Num: "01 ·",
    feat1Title: "Echte Verbindungen",
    feat1Text:
      "Keine Bots. Kein Algorithmus. Ein Like hier ist keine Währung. Es ist eine lebendige Community echter Menschen.",
    feat2Num: "02 ·",
    feat2Title: "DAO — du entscheidest",
    feat2Text:
      "Dezentrale Verwaltung. Jeder Teilnehmer stimmt über die Entwicklung der Plattform und seiner Community ab.",
    feat3Num: "03 ·",
    feat3Title: "Bridge — Gutes in der Blockchain",
    feat3Text:
      "Finanziere Community-Projekte. Jede Spende ist transparent, verifiziert und existiert ewig.",
    feat2Link: "DAO →",
    feat3Link: "Mehr erfahren",
    bridgeSectionTitle: "Where Good Deeds",
    bridgeSectionTitleEm: "Become Digital Legacy",
    bridgeSectionDesc:
      "Bridge — Infrastruktur für finanzielle Unterstützung innerhalb von Tribe. NFT-driven Wohltätigkeit. Community driven. Transparent. On web3.",
    bridgeStat1: "Aktive Projekte",
    bridgeStat2: "Blockchain-Transparenz",
    bridgeStat3: "Digital Legacy",
    bridgeStat4: "Community Governed",
    roadmapLabel: "Roadmap",
    rm1: "Lokalisierung RU / EN / ZH / DE — Tribe spricht die Sprache der Community",
    rm2: "KI-Agenten für Support und Moderation — Skalierung ohne Qualitätsverlust",
    rm3: "Host-Panels, Analytics, Gamification — Tools für Creator",
    rm4: "Bridge × Tribe — Wohltätigkeit als Teil der Identität der Bewegung",
    footerLogo: "OneBridge · 2025",
    tryHint: "Klicken Sie auf einen weißen Kreis — er fliegt zum Feuer.",
    copyLogo: "Logo kopieren",
    copied: "Kopiert!",
    downloadSvg: "SVG herunterladen",
    copyGameCode: "Spielcode kopieren",
    authorSectionTitle: "Vom Autor",
    authorProject: "Tribe — eine wachsende DACH-Community in Web3.",
    authorRole: "Meine Aufgabe als Art Director ist es, eine audiovisuelle Sprache zu schaffen, die uns verbindet (trotz Sprachbarrieren) und die Werte von Tribe nach innen und außen verständlich vermittelt.",
    authorIdea: "Design ist hier nicht nur Ästhetik, sondern ein Instrument für das Wachstum eines community-driven Produkts.",
  },
} as const;

export default function VisionPage() {
  const { lang } = useLanguage();
  const { trackCopy, trackDownload } = useAnalytics();
  const t = CONTENT[lang];
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [logoCopyFeedback, setLogoCopyFeedback] = useState(false);

  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getTribeFireCopyPrompt());
      trackCopy("tribe-fire-game", "code", "game");
      incrementLocalCount("tribe-fire-game", "copy");
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      setCopyFeedback(false);
    }
  }, [trackCopy]);

  const handleCopyLogo = useCallback(async () => {
    try {
      const res = await fetch("/tribe/OneTribeLogo.svg");
      const svg = await res.text();
      await navigator.clipboard.writeText(svg);
      trackCopy("one-tribe-logo", "svg", "logo");
      incrementLocalCount("one-tribe-logo", "copy");
      setLogoCopyFeedback(true);
      setTimeout(() => setLogoCopyFeedback(false), 2000);
    } catch {
      setLogoCopyFeedback(false);
    }
  }, [trackCopy]);

  const handleDownloadLogo = useCallback(async () => {
    try {
      const res = await fetch("/tribe/OneTribeLogo.svg");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "OneTribeLogo.svg";
      a.click();
      URL.revokeObjectURL(url);
      trackDownload("one-tribe-logo", "svg", "/tribe/OneTribeLogo.svg");
      incrementLocalCount("one-tribe-logo", "download");
    } catch {
      // ignore
    }
  }, [trackDownload]);

  return (
    <div
      className="min-h-screen bg-[#FCFCFC] text-[#1E1E1E] overflow-x-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Ticker — below header (h-14 = 56px) */}
      <div className="fixed top-14 left-0 right-0 z-[200] overflow-hidden bg-[#FF902F] py-1.5">
        <div className="flex whitespace-nowrap" style={{ animation: "ticker 25s linear infinite" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-mono text-[0.58rem] tracking-[0.3em] text-[#0D0A07] uppercase px-10">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero — pt accounts for header (h-14) + ticker */}
      <section className="relative min-h-[calc(100vh-3.5rem)] pt-20 grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,560px)_1fr] overflow-visible bg-[#0D0A07]">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0 opacity-70"
          style={{
            background: "radial-gradient(ellipse, rgba(255,144,47,0.12) 0%, transparent 65%)",
            animation: "breathe 5s ease-in-out infinite",
          }}
        />

        {/* Left panel */}
        <div className="relative z-[4] flex flex-col justify-center px-6 sm:px-8 lg:px-16 lg:pl-20 py-8 lg:py-12">
          <p className="font-mono text-[11px] font-semibold tracking-[0.1em] text-[#FF902F] uppercase mb-8 opacity-0" style={{ animation: "visionFadeIn 1s ease 0.4s forwards" }}>
            {t.eyebrow}
          </p>
          <div className="mb-8 opacity-0 max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]" style={{ animation: "visionFadeIn 1.2s ease 0.6s forwards" }}>
            <Image
              src="/tribe/OneTribeLogo.svg"
              alt="One Tribe"
              width={738}
              height={581}
              className="w-full h-auto"
              unoptimized
            />
          </div>
          <p className="text-base text-[#7A6B58] leading-relaxed max-w-[340px] tracking-[0.02em] mb-12 opacity-0" style={{ animation: "visionFadeIn 1s ease 0.9s forwards" }}>
            {t.desc}
          </p>
          <div className="flex flex-col gap-4 opacity-0" style={{ animation: "visionFadeIn 1s ease 1.1s forwards" }}>
            <span className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLogo}
                className="inline-flex font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[#0D0A07] bg-[#FF902F] py-3.5 px-8 w-fit transition-transform hover:-translate-y-0.5 rounded-lg"
              >
                {logoCopyFeedback ? t.copied : t.copyLogo}
              </button>
              <AnalyticsCountBadge targetId="one-tribe-logo" type="copy" className="text-[#7A6B58]" />
            </span>
            <span className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadLogo}
                className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[#7A6B58] border-b border-[#7A6B58]/30 pb-0.5 w-fit transition-colors hover:text-[#F0E8DC] hover:border-[#F0E8DC] text-left cursor-pointer"
              >
                {t.downloadSvg}
              </button>
              <AnalyticsCountBadge targetId="one-tribe-logo" type="download" className="text-[#7A6B58]" />
            </span>
          </div>
        </div>

        {/* Center — Tribe Fire Canvas */}
        <div className="relative z-[5] flex flex-col items-center justify-center px-6 py-8 lg:py-12">
          <div className="w-full max-w-[600px] rounded-2xl overflow-visible p-4">
            <TribeFireCanvas />
          </div>
          <p className="mt-4 text-center text-[12px] font-medium text-[#3D3020] tracking-[0.04em] max-w-md">
            {t.tryHint}
          </p>
        </div>

        {/* Right panel — Bridge */}
        <div className="relative z-[4] flex flex-col justify-center px-6 sm:px-8 lg:px-16 lg:pr-20 py-8 lg:py-12 lg:items-end lg:text-right">
          <p className="font-mono text-[11px] font-semibold tracking-[0.1em] text-[#FF902F]/80 uppercase mb-8 opacity-0" style={{ animation: "visionFadeIn 1s ease 0.5s forwards" }}>
            {t.bridgeTag}
          </p>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] font-bold text-[#F0E8DC] leading-[1.15] tracking-[-0.01em] mb-6 opacity-0" style={{ animation: "visionFadeIn 1.2s ease 0.7s forwards" }}>
            {t.bridgeTitle}
            <br />
            <em className="italic text-[#FF902F] not-italic block">{t.bridgeTitleEm}</em>
          </h2>
          <p className="text-[16px] text-[#7A6B58] leading-relaxed max-w-[300px] lg:ml-auto tracking-[0.02em] mb-10 opacity-0" style={{ animation: "visionFadeIn 1s ease 1s forwards" }}>
            {t.bridgeDesc}
          </p>
          <div className="flex gap-8 justify-end mb-10 opacity-0" style={{ animation: "visionFadeIn 1s ease 1.2s forwards" }}>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#F0E8DC] leading-none tracking-[-0.03em]">190</div>
              <div className="font-mono text-[12px] font-medium text-[#7A6B58] tracking-[0.04em] mt-1">{t.statProjects}</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#F0E8DC] leading-none tracking-[-0.03em]">50K</div>
              <div className="font-mono text-[12px] font-medium text-[#7A6B58] tracking-[0.04em] mt-1">{t.statMembers}</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 opacity-0" style={{ animation: "visionFadeIn 1s ease 1.3s forwards" }}>
            <button
              type="button"
              onClick={handleCopyCode}
              className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[#FF902F] border border-[#FF902F]/50 py-3.5 px-8 w-fit transition-colors hover:bg-[#FF902F]/10 hover:border-[#FF902F] rounded-lg"
            >
              {copyFeedback ? t.copied : t.copyGameCode}
            </button>
            <AnalyticsCountBadge targetId="tribe-fire-game" type="copy" className="text-[#7A6B58]" />
          </span>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative py-24 bg-[#0D0A07] border-t border-[#FF902F]/[0.08] text-center">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-light text-[#FF902F]/[0.025] tracking-[-0.05em] pointer-events-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {t.manifestoBg}
        </div>
        <p className="relative z-[1] text-[24px] sm:text-[30px] lg:text-[36px] font-light leading-[1.25] tracking-[-0.02em] text-[#F0E8DC] max-w-[780px] mx-auto px-6">
          {t.manifestoText.split("\n")[0]}
          <br />
          {t.manifestoText.split("\n")[1]}
          <br />
          <em className="italic text-[#FF902F] not-italic">{t.manifestoEm}</em>
        </p>
      </section>

      {/* Author Manifest */}
      <section className="relative py-20 bg-[#141008] border-t border-[#FF902F]/[0.08]">
        <div className="max-w-[780px] mx-auto px-6 sm:px-8">
          <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-[#FF902F] uppercase block mb-8">
            {t.authorSectionTitle}
          </span>
          <p className="text-[18px] sm:text-[20px] text-[#F0E8DC] leading-[1.6] mb-6">
            {t.authorProject}
          </p>
          <p className="text-[16px] sm:text-[18px] text-[#7A6B58] leading-[1.6] mb-6">
            {t.authorRole}
          </p>
          <p className="text-[18px] sm:text-[20px] font-medium text-[#FF902F] leading-[1.5]">
            {t.authorIdea}
          </p>
          <div className="mt-8">
            <UsefulButton targetId="manifest-author" targetType="section" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-content mx-auto px-6 sm:px-8 py-16 bg-[#FCFCFC]">
        <div className="flex items-center gap-6 mb-12">
          <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-[#FF902F] uppercase">{t.sectionWhy}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#FF902F]/30 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E6E6E6] rounded-xl overflow-hidden">
          {[
            { num: t.feat1Num, title: t.feat1Title, text: t.feat1Text, href: null, linkLabel: null },
            { num: t.feat2Num, title: t.feat2Title, text: t.feat2Text, href: "/dao", linkLabel: t.feat2Link },
            { num: t.feat3Num, title: t.feat3Title, text: t.feat3Text, href: "/blockchain", linkLabel: t.feat3Link },
          ].map((f) => (
            <div
              key={f.num}
              className="bg-white p-6 sm:p-8 relative overflow-hidden transition-colors hover:bg-[#FCFCFC] group"
            >
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF902F] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
              <div className="font-mono text-[11px] font-semibold text-[#FF902F]/80 tracking-[0.1em] mb-6">{f.num}</div>
              <div className="text-[24px] font-semibold text-[#1E1E1E] leading-[1.3] mb-4">{f.title}</div>
              <div className="text-[16px] text-[#808080] leading-[1.6] mb-4">{f.text}</div>
              {f.href && f.linkLabel && (
                <Link
                  href={f.href}
                  className="inline-flex items-center justify-center px-4 py-2.5 font-mono text-[12px] font-medium tracking-[0.1em] uppercase text-[#FF902F] bg-[#FF902F]/10 hover:bg-[#FF902F]/20 border border-[#FF902F]/40 hover:border-[#FF902F]/60 rounded-lg transition-colors"
                >
                  {f.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bridge section */}
      <section className="bg-white border-t border-[#E6E6E6] border-b border-[#E6E6E6] py-16">
        <div className="max-w-content mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#1E1E1E] leading-[1.2] tracking-[-0.01em] mb-6">
              {t.bridgeSectionTitle}
              <br />
              <em className="italic text-[#FF902F] not-italic">{t.bridgeSectionTitleEm}</em>
            </h2>
            <p className="text-[16px] text-[#808080] leading-[1.6] max-w-[380px]">
              {t.bridgeSectionDesc}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[#E6E6E6] rounded-xl overflow-hidden">
            {[
              { n: "190", l: t.bridgeStat1 },
              { n: "Web3", l: t.bridgeStat2, em: true },
              { n: "NFT", l: t.bridgeStat3 },
              { n: "DAO", l: t.bridgeStat4, em: true },
            ].map((s) => (
              <div key={s.l} className="bg-[#FCFCFC] p-6 sm:p-8">
                <div className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] tracking-[-0.03em] leading-none mb-2">
                  {s.em ? <em className="italic text-[#FF902F] not-italic">{s.n}</em> : s.n}
                </div>
                <div className="font-mono text-[12px] font-medium text-[#808080] tracking-[0.04em]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="w-full bg-[#1E1710] border-t border-[#FF902F]/10 border-b border-[#FF902F]/10 py-16 overflow-visible">
        <div className="max-w-content mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-6 mb-12">
            <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-[#FF902F] uppercase">{t.roadmapLabel}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#FF902F]/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-visible">
            <div className="order-2 lg:order-1 flex flex-col gap-0 border border-[#FF902F]/[0.07] rounded-xl overflow-hidden bg-[#141008]">
              {[
                { num: "01 ·", text: t.rm1 },
                { num: "02 ·", text: t.rm2 },
                { num: "03 ·", text: t.rm3 },
                { num: "04 ·", text: t.rm4 },
              ].map((r) => (
                <div
                  key={r.num}
                  className="p-6 sm:p-8 border-b border-[#FF902F]/[0.07] last:border-b-0 relative group hover:before:bg-[#FF902F] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-transparent before:transition-colors"
                >
                  <div className="font-mono text-[11px] font-semibold text-[#FF902F] tracking-[0.1em] mb-4">{r.num}</div>
                  <div className="text-[16px] text-[#7A6B58] leading-[1.6]">{r.text}</div>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2 flex justify-center overflow-visible">
              <div className="w-48 sm:w-56 md:w-64 aspect-[5/4] drop-shadow-[0_0_40px_rgba(255,144,47,0.4)] overflow-visible">
                <SparksCanvas />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E6E6E6] py-12 px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white">
        <div className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#808080]">{t.footerLogo}</div>
        <div className="flex gap-8">
          <Link href="/tribe" className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#808080] hover:text-[#FF902F] transition-colors">
            Tribe
          </Link>
          <Link href="/dao" className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#808080] hover:text-[#FF902F] transition-colors">
            DAO
          </Link>
          <Link href="/blockchain" className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#808080] hover:text-[#FF902F] transition-colors">
            Bridge
          </Link>
          <Link href="/media" className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#808080] hover:text-[#FF902F] transition-colors">
            Media
          </Link>
          <Link href="/roadmap" className="font-mono text-[12px] font-medium tracking-[0.04em] text-[#808080] hover:text-[#FF902F] transition-colors">
            Roadmap
          </Link>
        </div>
      </footer>

    </div>
  );
}
