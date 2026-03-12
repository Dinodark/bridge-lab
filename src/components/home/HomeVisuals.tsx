"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ImagePlaceholder } from "./ImagePlaceholder";
import VisibilityBlock from "@/components/VisibilityBlock";

const PHONE_WALLPAPERS = [
  { src: null, label: "[Обои 2]" },
  { src: null, label: "[Обои 3]" },
];

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
    <>
      <section className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "var(--color-border)" }}>
      <div>
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {PHONE_WALLPAPERS.map((item, i) => (
                <div key={i} className="w-[180px] justify-self-start">
                  <VisibilityBlock entityId={`visual-wallpaper-phone-${i + 2}`}>
                    <div className="max-w-[180px] mx-auto">
                      {item.src ? (
                        <div className="aspect-[9/17] rounded-xl overflow-hidden w-full bg-[var(--color-border)]/30">
                          <img
                            src={item.src}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <ImagePlaceholder aspect="vertical" label={item.label} className="w-full !aspect-[9/17]" />
                      )}
                    </div>
                  </VisibilityBlock>
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
                <VisibilityBlock key={i} entityId={`visual-wallpaper-desktop-${i}`}>
                  <ImagePlaceholder aspect="video" label={`[Обои ${i}]`} className="w-full" />
                </VisibilityBlock>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.stickers}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <VisibilityBlock key={i} entityId={`visual-sticker-${i}`}>
                  <ImagePlaceholder aspect="square" label={`[Стикер ${i}]`} className="w-full" />
                </VisibilityBlock>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
              {t.memes}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {[1, 2].map((i) => (
                <VisibilityBlock key={i} entityId={`visual-meme-${i}`}>
                  <ImagePlaceholder aspect="square" label={`[Мем ${i}]`} className="w-full" />
                </VisibilityBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
