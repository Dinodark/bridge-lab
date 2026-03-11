"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "Слоганы и фразы",
    subtitle: "Для баннеров, видео, UGC и маркетинговых материалов.",
    banners: "Баннеры и заголовки",
    b1: "The fire is burning. Are you in?",
    b2: "Преврати страсть в бизнес",
    b3: "One World. One Tribe. Bridge.",
    b4: "Real people. Real connections.",
    b5: "50k+ creators. Zero fake.",
    b6: "All-in-one. One price. 99€.",
    video: "Video / UGC",
    v1: "Из 1:1 коучинга к стабильному доходу",
    v2: "TRIBE полностью адаптируется под бренд — как своя платформа",
    v3: "Люди с визией, а не скроллеры",
    v4: "Бесплатные мастер-классы. Коллаб без конкуренции.",
    v5: "Создала Yoga Tribe с 1000+ мемберами за месяцы",
  },
  de: {
    title: "Slogans und Phrasen",
    subtitle: "Für Banner, Videos, UGC und Marketing-Materialien.",
    banners: "Banner und Überschriften",
    b1: "The fire is burning. Are you in?",
    b2: "Leidenschaft in Business verwandeln",
    b3: "One World. One Tribe. Bridge.",
    b4: "Real people. Real connections.",
    b5: "50k+ Kreative. Zero Fake.",
    b6: "All-in-one. One price. 99€.",
    video: "Video / UGC",
    v1: "Von 1:1-Coaching zu stabilem Einkommen",
    v2: "TRIBE passt sich komplett der Marke an — wie eine eigene Plattform",
    v3: "Menschen mit Vision, keine Scroller",
    v4: "Kostenlose Meisterkurse. Kollab ohne Konkurrenz.",
    v5: "Yoga Tribe mit 1000+ Mitgliedern in Monaten erstellt",
  },
} as const;

export default function SlogansPhrases() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "var(--color-border)" }}>
      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
        {t.title}
      </h2>
      <p className="text-base mb-6" style={{ color: "var(--color-muted)" }}>
        {t.subtitle}
      </p>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.banners}
          </h3>
          <ul className="space-y-2 list-none">
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.b1}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.b2}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.b3}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.b4}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.b5}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.b6}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.video}
          </h3>
          <ul className="space-y-2 list-none">
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.v1}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.v2}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.v3}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.v4}</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: "var(--color-cta1)" }}>·</span>
              <span style={{ color: "var(--color-text)" }}>{t.v5}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
