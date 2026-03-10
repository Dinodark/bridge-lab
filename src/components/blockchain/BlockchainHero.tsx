"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

const CAMPAIGN_KEYS = ["campaign1", "campaign2", "campaign3"] as const;
const campaignImages = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
];
const campaignProgress = [65, 40, 80];

const CARD_PARALLAX = [
  { base: 0, factor: 0.18 },
  { base: 12, factor: -0.12 },
  { base: 24, factor: 0.15 },
];

export default function BlockchainHero() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const campaigns = CAMPAIGN_KEYS.map((key, i) => ({
    id: i + 1,
    title: t[key],
    image: campaignImages[i],
    progress: campaignProgress[i],
  }));

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/25 via-transparent to-transparent backdrop-blur-sm" />
      <div className="absolute inset-0 hero-lilac-glow" />
      <div className="absolute inset-0 hero-cross-pattern hero-cross-pattern-base" />
      <div className="absolute inset-0 hero-cross-pattern hero-cross-pattern-flicker" />
      <div className="absolute inset-0 hero-darken" />

      <div className="relative w-full max-w-2xl sm:max-w-4xl lg:max-w-content mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 mb-12 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.heroTitle1}{" "}
            <span className="hero-title-blockchain">
              {t.heroTitle2}
            </span>{" "}
            {t.heroTitle3}
          </h1>
          <p className="text-xl text-cyan-300/90 mb-6">
            {t.heroSubtitle}
          </p>
          <p className="text-white/80 mb-8 max-w-xl">
            {t.heroDesc}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="relative inline-block">
              <div
                className="absolute -inset-4 rounded-full bg-violet-500/40 blur-2xl animate-[hero-arc-float_10s_ease-in-out_infinite]"
                aria-hidden
              />
              <button className="relative px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:from-violet-500 hover:to-purple-500 btn-gradient-glow">
                {t.btnJoin}
              </button>
            </div>
            <Link
              href="#how-it-works"
              className="px-6 py-3 rounded-lg font-medium btn-ghost-violet"
            >
              {t.btnLearn}
            </Link>
          </div>
        </div>
        <div className="flex-1 flex gap-4 justify-center lg:justify-end">
          {campaigns.map((campaign, i) => {
            const p = CARD_PARALLAX[i];
            const parallaxY = scrollY * p.factor * 0.4;
            return (
              <div
                key={campaign.id}
                className="w-48 sm:w-56 flex-shrink-0 transition-transform duration-[1000ms] ease-out"
                style={{ transform: `translateY(${p.base + parallaxY}px)` }}
              >
                <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-[4px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:border-violet-400/30">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className="object-cover grayscale"
                      sizes="224px"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white text-sm mb-2">{campaign.title}</h3>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full progress-bar-shimmer"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <button className="w-full py-2 text-sm font-medium text-violet-300 hover:text-violet-200 transition-colors">
                      {t.btnBrowse}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center animate-bounce">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
