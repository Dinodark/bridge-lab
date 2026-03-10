"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ImagePlaceholder } from "./ImagePlaceholder";

const CONTENT = {
  ru: {
    title: "Визуалы",
    subtitle: "Обои, стикеры, мемы — для телефона и компьютера.",
    wallpapersPhone: "Обои для телефона",
    wallpapersDesktop: "Обои для компьютера",
    stickers: "Стикеры",
    memes: "Мемы",
  },
  de: {
    title: "Visuals",
    subtitle: "Wallpapers, Sticker, Memes — für Handy und Computer.",
    wallpapersPhone: "Handy-Wallpapers",
    wallpapersDesktop: "Desktop-Wallpapers",
    stickers: "Sticker",
    memes: "Memes",
  },
} as const;

export default function HomeVisuals() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="py-16 sm:py-24">
      <div className="content-container">
        <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-cta1)" }}>
          Assets
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "var(--color-text)" }}>
          {t.title}
        </h2>
        <p className="text-base mb-12 max-w-2xl" style={{ color: "var(--color-muted)" }}>
          {t.subtitle}
        </p>

        <div className="space-y-16">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.wallpapersPhone}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="max-w-[180px] mx-auto">
                  <ImagePlaceholder aspect="vertical" label={`[Обои ${i}]`} className="w-full" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.wallpapersDesktop}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <ImagePlaceholder key={i} aspect="video" label={`[Обои ${i}]`} className="w-full" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.stickers}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <ImagePlaceholder key={i} aspect="square" label={`[Стикер ${i}]`} className="w-full" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.memes}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {[1, 2].map((i) => (
                <ImagePlaceholder key={i} aspect="square" label={`[Мем ${i}]`} className="w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
