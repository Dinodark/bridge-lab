"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "Сильные стороны и возможности",
    strengths: "Сильные стороны",
    s1: "Trustpilot 4.8+ (28 отзывов) — networking, заработок, энергия",
    s2: "GetApp/G2 4.5–5.0 — onboarding, поддержка, фичи",
    s3: "Простота и кастомизация — «удвоили ценность комьюнити за 2 недели»",
    s4: "Share2Earn — вирусный спред без вложений",
    s5: "Бесплатные мастер-классы от топ-маркетологов Германии",
    opportunities: "Возможности для развития",
    o1: "Расширение на crypto/DeFi (DAO-хайп), мультиязычность (RU/UA)",
    o2: "Аудиовизуал: подкасты, AR-фильтры, TikTok-челленджи (#ONETRIBE)",
    o3: "NFT-дропы, токены, партнёрства с Uniswap-ботами",
    o4: "Глобал: VK/TikTok-тренды, мемы, коллаб с martial arts инфлюенсерами",
  },
  de: {
    title: "Stärken und Chancen",
    strengths: "Stärken",
    s1: "Trustpilot 4.8+ (28 Bewertungen) — Networking, Verdienst, Energie",
    s2: "GetApp/G2 4.5–5.0 — Onboarding, Support, Features",
    s3: "Einfachheit und Anpassung — «Community-Wert in 2 Wochen verdoppelt»",
    s4: "Share2Earn — virale Verbreitung ohne Investition",
    s5: "Kostenlose Meisterkurse von Top-Marketing-Experten Deutschlands",
    opportunities: "Entwicklungsmöglichkeiten",
    o1: "Ausweitung auf Crypto/DeFi (DAO-Hype), Mehrsprachigkeit (RU/UA)",
    o2: "Audiovisuell: Podcasts, AR-Filter, TikTok-Challenges (#ONETRIBE)",
    o3: "NFT-Drops, Tokens, Partnerschaften mit Uniswap-Bots",
    o4: "Global: VK/TikTok-Trends, Memes, Kollab mit Martial-Arts-Influencern",
  },
} as const;

export default function StrengthsOpportunities() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "var(--color-border)" }}>
      <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
        {t.title}
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.strengths}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.s1}</li>
            <li>{t.s2}</li>
            <li>{t.s3}</li>
            <li>{t.s4}</li>
            <li>{t.s5}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.opportunities}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.o1}</li>
            <li>{t.o2}</li>
            <li>{t.o3}</li>
            <li>{t.o4}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
