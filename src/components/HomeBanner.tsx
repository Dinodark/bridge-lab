"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PHRASES = {
  ru: [
    "One World · One Tribe",
    "Community · Identity · Charity",
    "Одно ядро. Бесконечные воплощения.",
  ],
  de: [
    "One World · One Tribe",
    "Community · Identity · Charity",
    "Ein Kern. Unendliche Verkörperungen.",
  ],
};

const BANNER_SUBTITLE = {
  ru: "Bridge — где сообщество встречает технологию",
  de: "Bridge — wo Community auf Technologie trifft",
};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    setDisplay(
      text
        .split("")
        .map((c) => (c === " " || c === "·" ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("")
    );
    let frame = 0;
    const duration = 50;
    const scramble = () => {
      if (frame < duration) {
        setDisplay(
          text
            .split("")
            .map((c, i) => {
              if (c === " " || c === "·") return c;
              if (i < (frame / duration) * text.length) return c;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        frame++;
        requestAnimationFrame(scramble);
      } else {
        setDisplay(text);
      }
    };
    requestAnimationFrame(scramble);
  }, [text]);

  return <span className={className}>{display}</span>;
}

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
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = PHRASES[lang];

  useEffect(() => {
    const t = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(t);
  }, [phrases.length]);

  return (
    <div
      className="home-banner relative overflow-hidden w-full rounded-b-xl"
      style={{
        borderColor: "var(--color-border)",
        borderWidth: 1,
        borderStyle: "solid",
        borderTopWidth: 0,
        /* Golden ratio: 1/φ ≈ 61.8% of viewport (Fibonacci 55/89) */
        height: "61.8vh",
        minHeight: 240,
      }}
    >
      {/* Blurred background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/home-feed-illustration.webp"
          alt=""
          fill
          className="object-cover scale-110"
          sizes="(max-width: 672px) 100vw, 672px"
          priority
        />
        <div
          className="absolute inset-0 backdrop-blur-[8px] sm:backdrop-blur-[12px]"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)" }}
        />
      </div>

      {/* Glitch overlay — RGB split on blur */}
      <div className="home-banner-glitch absolute inset-0 pointer-events-none opacity-60" aria-hidden />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8 text-center">
        <div className="home-banner-logo-pulse mb-4">
          <TribeLogoIcon />
        </div>
        <h2
          className="home-banner-text-glitch text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white"
        >
          <ScrambleText text={phrases[phraseIndex]} />
        </h2>
        <p
          className="text-sm sm:text-base text-white/90 max-w-md font-light"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
        >
          {BANNER_SUBTITLE[lang]}
        </p>
      </div>
    </div>
  );
}
