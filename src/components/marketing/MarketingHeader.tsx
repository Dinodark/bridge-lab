"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const CONTENT = {
  ru: {
    tag: "Marketing",
    title: "Маркетинговый план tribe.de",
    subtitle: "Анализ платформы, план действий, слоганы, NLP/архетипы и гайды для дизайнеров и разработчиков.",
  },
  de: {
    tag: "Marketing",
    title: "Marketingplan tribe.de",
    subtitle: "Plattformanalyse, Aktionsplan, Slogans, NLP/Archetypen und Leitfäden für Designer und Entwickler.",
  },
} as const;

export default function MarketingHeader() {
  const { lang } = useLanguage();
  const { palette } = useTheme();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <div className="mb-12">
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: palette?.accent1 || "var(--color-cta1)" }}
      >
        {t.tag}
      </span>
      <h1
        className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4"
        style={{ color: "var(--color-text)" }}
      >
        {t.title}
      </h1>
      <p className="text-lg max-w-2xl" style={{ color: "var(--color-muted)" }}>
        {t.subtitle}
      </p>
    </div>
  );
}
