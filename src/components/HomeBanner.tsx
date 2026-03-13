"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import BridgeTribeWord from "@/components/home/BridgeTribeWord";

const BANNER_TITLE = {
  ru: "Одно ядро. Бесконечные воплощения.",
  de: "Ein Kern. Unendliche Verkörperungen.",
};

const BANNER_SUBTITLE_REST = {
  ru: " — где сообщество встречает технологию",
  de: " — wo Community auf Technologie trifft",
};

const CTA_TRIBE = { ru: "В Tribe", de: "In Tribe" };
const CTA_VISION = { ru: "Смотреть Vision", de: "Vision ansehen" };

function TribeLogoIcon({ className = "", gradientId = "home-banner-logo" }: { className?: string; gradientId?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 48, height: 48 }}
    >
      <rect width="77.9" height="77.9" rx="10" fill={`url(#${gradientId})`} />
      <path
        d="M42.05 18.18c.38 0 .71.14.98.41.27.27.4.62.4 1.04v9.57h3.08c.04 0 .08 0 .12 0h.04c.04 0 .08 0 .12 0h2.72c.46 0 .84.14 1.14.41.29.27.44.57.44.95v5.06c0 .39-.15.72-.44.99-.29.27-.68.41-1.14.41h-6.05v9.84c0 1.47.27 2.62.8 3.45.54.83 1.44 1.25 2.7 1.25h.17c.42 0 .77.14 1.04.41.27.27.4.57.4.95v4.28c0 .42-.13.77-.4 1.04-.27.27-.62.4-1.04.4h-.98c-2.37 0-4.39-.4-6.06-1.19-1.66-.79-2.94-2.02-3.82-3.66-.88-1.66-1.32-3.75-1.32-6.26v-9.83c-.05-.68-.53-1.23-1.2-1.29h-.01l-.02.01h-.01l-.01 0h-.01l-.01 0h-.01l-.01 0h-.01l-.01 0h-.01l-.01 0h-.01l-.01 0h-.01l-.01 0h-.01l-.01 0h-.02l-.01 0H29.41l-.01 0h-.01l-.01 0h-.01l-.02-.01c-.07 0-.14-.01-.21-.02-.15-.02-.28-.06-.4-.09-.16-.07-.32-.14-.47-.22-.35-.27-.59-.6-.71-.99l-1.62-5.05c-.14-.42-.12-.77.06-1.04.18-.27.48-.4.9-.4 2.56 0 4.1-.02 6.66-.02.72-.01 1.3-.57 1.35-1.29v-8.27c0-.42-.14-.77-.41-1.04-.27-.27-.62-.41-1.04-.41h5.68z"
        fill="white"
      />
      <defs>
        <linearGradient id={gradientId} x1="70" y1="-56" x2="136" y2="-2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#48E5FF" />
          <stop offset="0.36" stopColor="#B289F9" />
          <stop offset="0.65" stopColor="#F989B4" />
          <stop offset="1" stopColor="#FFBC6F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HomeBanner() {
  const { lang } = useLanguage();

  return (
    <div
      className="home-banner relative overflow-hidden w-full rounded-b-xl"
      style={{
        borderColor: "var(--color-border)",
        borderWidth: 1,
        borderStyle: "solid",
        borderTopWidth: 0,
        minHeight: 120,
        background: "#000",
      }}
    >
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
        >
          <source src="/concepts/horse/firehorse.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Glitch overlay — RGB split on blur */}
      <div className="home-banner-glitch absolute inset-0 pointer-events-none opacity-60" aria-hidden />

      {/* Darkening overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0, 0, 0, 0.38)", zIndex: 2 }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[65vh] px-6 py-12 text-center">
        <div className="home-banner-logo-pulse mb-4">
          <TribeLogoIcon />
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          {BANNER_TITLE[lang]}
        </h2>
        <p
          className="text-base sm:text-lg text-white/90 max-w-lg font-light mb-8"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
        >
          <BridgeTribeWord />
          {BANNER_SUBTITLE_REST[lang]}
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <Link
            href="/tribe"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:gap-3"
            style={{ background: "var(--color-cta1)", color: "#fff" }}
          >
            {CTA_TRIBE[lang]}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/vision"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all hover:gap-3"
            style={{ borderColor: "rgba(255,255,255,0.8)", color: "#fff" }}
          >
            {CTA_VISION[lang]}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
