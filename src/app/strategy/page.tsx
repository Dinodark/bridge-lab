"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function StrategyPage() {
  const { palette } = useTheme();

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
            style={{ color: palette?.accent || "var(--color-cta1)" }}
          >
            Strategy
          </span>
          <h1
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Стратегия
          </h1>
          <p className="text-lg" style={{ color: "var(--color-muted)" }}>
            Видение, цели и направления. Как мы движемся.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              Видение
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Материал в разработке. Здесь будет описание видения Tribe и Bridge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              Цели
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Ключевые цели и метрики. В процессе наполнения.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              Направления
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Основные направления развития. Детализация — в Roadmap.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
