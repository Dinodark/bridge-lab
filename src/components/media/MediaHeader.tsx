"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";

export default function MediaHeader() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <header className="border-b border-white/10 bg-[#0f0a1e]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-2"
          style={{ lineHeight: 1.4 }}
        >
          Media
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t.pageTitle}
        </h1>
        <p className="mt-2 text-white/70 text-base sm:text-lg max-w-2xl" style={{ lineHeight: 1.6 }}>
          {t.pageSubtitle}
        </p>
      </div>
    </header>
  );
}
