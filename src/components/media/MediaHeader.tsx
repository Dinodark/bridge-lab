"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";

export default function MediaHeader() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <header className="border-b bg-[var(--color-bg-header)]" style={{ borderColor: "var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2"
          style={{ color: "var(--color-cta1)", lineHeight: 1.4 }}
        >
          Media
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold"
          style={{
            background: "var(--color-gradient1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t.pageTitle}
        </h1>
        <p className="mt-2 text-base sm:text-lg max-w-2xl" style={{ color: "var(--color-muted)", lineHeight: 1.6 }}>
          {t.pageSubtitle}
        </p>
      </div>
    </header>
  );
}
