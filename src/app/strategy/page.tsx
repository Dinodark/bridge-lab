"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const T = {
  ru: {
    tag: "Strategy",
    title: "Стратегия",
    subtitle: "Видение, цели и направления. Как мы движемся.",
    visionTitle: "Видение",
    visionDesc:
      "Tribe — растущее DACH-сообщество в Web3. Bridge — инфраструктура благотворительности. Дизайн — не декор, а инструмент роста community-driven продукта. Аудиовизуальный язык объединяет нас и транслирует ценности вовне.",
    goalsTitle: "Цели и задачи",
    goalMain: "Увеличить вовлечённость и LTV сообщества через сильный бренд.",
    task1: "Айдентика — лого, цвета, типографика.",
    task2: "Мерч и физические артефакты.",
    task3: "Аудиовизуальный контент — гимн, видео, мемы.",
    task4: "Инструмент обратной связи — лайки, скачивания, аналитика.",
    directionsTitle: "Каналы коммуникации",
    ch1: "Этот сайт — хаб и портфолио-манифест.",
    ch2: "Внутренний чат — мемы, анонсы, поддержание вайба.",
    ch3: "Закрытые встречи — эксклюзивные презентации.",
    ch4: "Партнёрские материалы — лендинги, презентации.",
  },
  de: {
    tag: "Strategie",
    title: "Strategie",
    subtitle: "Vision, Ziele und Richtungen. Wie wir uns bewegen.",
    visionTitle: "Vision",
    visionDesc:
      "Tribe — eine wachsende DACH-Community in Web3. Bridge — Infrastruktur für Wohltätigkeit. Design ist kein Dekor, sondern ein Instrument für das Wachstum eines community-driven Produkts. Die audiovisuelle Sprache verbindet uns und vermittelt Werte nach außen.",
    goalsTitle: "Ziele und Aufgaben",
    goalMain: "Engagement und LTV der Community durch eine starke Marke steigern.",
    task1: "Identität — Logo, Farben, Typografie.",
    task2: "Merch und physische Artefakte.",
    task3: "Audiovisueller Content — Hymne, Video, Memes.",
    task4: "Feedback-Instrument — Likes, Downloads, Analytics.",
    directionsTitle: "Kommunikationskanäle",
    ch1: "Diese Website — Hub und Portfolio-Manifest.",
    ch2: "Interner Chat — Memes, Ankündigungen, Vibe.",
    ch3: "Geschlossene Treffen — exklusive Präsentationen.",
    ch4: "Partner-Materialien — Landings, Präsentationen.",
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
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="content-container">
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

        <div className="space-y-10">
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
            <p className="leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
              {t.goalMain}
            </p>
            <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
              <li>{t.task1}</li>
              <li>{t.task2}</li>
              <li>{t.task3}</li>
              <li>{t.task4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.directionsTitle}
            </h2>
            <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
              <li>{t.ch1}</li>
              <li>{t.ch2}</li>
              <li>{t.ch3}</li>
              <li>{t.ch4}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
