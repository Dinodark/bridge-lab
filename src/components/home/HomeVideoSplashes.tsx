"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ImagePlaceholder } from "./ImagePlaceholder";

const CONTENT = {
  ru: {
    title: "Видео-заставки",
    subtitle: "Горизонтальные и вертикальные форматы для видео.",
    horizontal: ["Горизонтальная заставка 1", "Горизонтальная заставка 2"],
    vertical: ["Вертикальная заставка 1", "Вертикальная заставка 2"],
  },
  de: {
    title: "Video-Splashs",
    subtitle: "Horizontale und vertikale Formate für Videos.",
    horizontal: ["Horizontale Splash 1", "Horizontale Splash 2"],
    vertical: ["Vertikale Splash 1", "Vertikale Splash 2"],
  },
} as const;

export default function HomeVideoSplashes() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="py-16 sm:py-24">
      <div className="content-container">
        <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-cta1)" }}>
          Video
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "var(--color-text)" }}>
          {t.title}
        </h2>
        <p className="text-base mb-12 max-w-2xl" style={{ color: "var(--color-muted)" }}>
          {t.subtitle}
        </p>

        <div className="space-y-12">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              16:9
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.horizontal.map((label, i) => (
                <div key={i}>
                  <ImagePlaceholder aspect="video" label={label} className="w-full" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              9:16
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {t.vertical.map((label, i) => (
                <div key={i} className="max-w-[180px] mx-auto">
                  <ImagePlaceholder aspect="vertical" label={label} className="w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
