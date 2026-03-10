"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ImagePlaceholder } from "./ImagePlaceholder";

const CONTENT = {
  ru: {
    title: "Звук Tribe",
    subtitle: "Джинглы для бренда. Тексты для генерации аудио.",
    jingles: [
      { id: "anthem-short", name: "Anthem Short", text: "Cursor, код, PROD — Push It To Prod!" },
      { id: "tribe", name: "Tribe", text: "One World. One Tribe. Bridge." },
      { id: "community", name: "Community", text: "Community. Identity. Charity. Together." },
      { id: "lounge", name: "Lounge", text: "Cursor In The Dark — Lounge Edition." },
    ],
  },
  de: {
    title: "Sound of Tribe",
    subtitle: "Jingles für die Marke. Texte für Audio-Generierung.",
    jingles: [
      { id: "anthem-short", name: "Anthem Short", text: "Cursor, Code, PROD — Push It To Prod!" },
      { id: "tribe", name: "Tribe", text: "One World. One Tribe. Bridge." },
      { id: "community", name: "Community", text: "Community. Identity. Charity. Together." },
      { id: "lounge", name: "Lounge", text: "Cursor In The Dark — Lounge Edition." },
    ],
  },
} as const;

export default function HomeJingles() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="py-16 sm:py-24">
      <div className="content-container">
        <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-cta1)" }}>
          Audio
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "var(--color-text)" }}>
          {t.title}
        </h2>
        <p className="text-base mb-12 max-w-2xl" style={{ color: "var(--color-muted)" }}>
          {t.subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.jingles.map((jingle) => (
            <article
              key={jingle.id}
              className="group rounded-2xl border p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
            >
              <ImagePlaceholder
                aspect="square"
                label="[Аудио]"
                className="mb-4 w-full"
              />
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "var(--color-cta1)" }}>
                {jingle.name}
              </span>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-text)" }}>
                {jingle.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
