"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const T = {
  ru: {
    tag: "Strategy",
    title: "Стратегия",
    subtitle: "Видение, цели и направления. Как мы движемся.",
    visionTitle: "Видение",
    visionDesc: "Материал в разработке. Здесь будет описание видения Tribe и Bridge.",
    goalsTitle: "Цели",
    goalsDesc: "Ключевые цели и метрики. В процессе наполнения.",
    directionsTitle: "Направления",
    directionsDesc: "Основные направления развития. Детализация — в Roadmap.",
  },
  de: {
    tag: "Strategie",
    title: "Strategie",
    subtitle: "Vision, Ziele und Richtungen. Wie wir uns bewegen.",
    visionTitle: "Vision",
    visionDesc: "Material in Entwicklung. Hier wird die Vision von Tribe und Bridge beschrieben.",
    goalsTitle: "Ziele",
    goalsDesc: "Kernziele und Metriken. In Bearbeitung.",
    directionsTitle: "Richtungen",
    directionsDesc: "Hauptentwicklungsrichtungen. Details im Roadmap.",
  },
} as const;

export default function StrategyPage() {
  const { palette } = useTheme();
  const { lang } = useLanguage();
  const t = T[lang === "de" ? "de" : "ru"];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--color-bg)",
        fontFamily: "'Inter Tight', Inter, sans-serif",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
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
          <p className="text-lg" style={{ color: "var(--color-muted)" }}>
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.visionTitle}
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {t.visionDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.goalsTitle}
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {t.goalsDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.directionsTitle}
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {t.directionsDesc}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
