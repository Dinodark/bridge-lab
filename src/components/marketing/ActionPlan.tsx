"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "План действий",
    channels: "Каналы и тактики",
    ch1: "Соцсети (IG/TikTok): Shorts «до/после» монетизации, сторис с DAO-голосованиями. KPI: Engagement >5%, рефералы.",
    ch2: "LIVE/События: еженедельные воркшопы, networking в CH/DE. KPI: посещаемость 100+, конверсия в платные трибы 10%.",
    ch3: "Email/DAO: рассылки с эксклюзивом, голосования за фичи. KPI: Open rate 30%, retention 70%.",
    ch4: "Партнёрства: аффилиат с маркетологами, интеграции (Uniswap для crypto-хайпа). KPI: новые трибы/мес +20%.",
    templates: "Шаблоны и форматы",
    t1: "Чек-лист запуска: онбординг, первый LIVE, Share2Earn-ссылка.",
    t2: "Формат поста: «до/после» монетизации, testimonial, CTA в ONETRIBE.",
    t3: "Видео-онбординг: 60–90 сек, ключевые фичи, призыв к действию.",
    t4: "UGC-челлендж: #ONETRIBE-тег, репосты лучших сторис.",
  },
  de: {
    title: "Aktionsplan",
    channels: "Kanäle und Taktiken",
    ch1: "Soziale Medien (IG/TikTok): Shorts «Vorher/Nachher» Monetarisierung, Stories mit DAO-Abstimmungen. KPI: Engagement >5%, Empfehlungen.",
    ch2: "LIVE/Events: wöchentliche Workshops, Networking in CH/DE. KPI: Teilnahme 100+, Konversion zu kostenpflichtigen Tribes 10%.",
    ch3: "E-Mail/DAO: Newsletter mit Exklusivem, Abstimmungen für Features. KPI: Open rate 30%, Retention 70%.",
    ch4: "Partnerschaften: Affiliate mit Vermarktern, Integrationen (Uniswap für Crypto-Hype). KPI: neue Tribes/Monat +20%.",
    templates: "Vorlagen und Formate",
    t1: "Launch-Checkliste: Onboarding, erster LIVE, Share2Earn-Link.",
    t2: "Post-Format: «Vorher/Nachher» Monetarisierung, Testimonial, CTA zu ONETRIBE.",
    t3: "Video-Onboarding: 60–90 Sek, Kernfunktionen, Call-to-Action.",
    t4: "UGC-Challenge: #ONETRIBE-Tag, Reposts der besten Stories.",
  },
} as const;

export default function ActionPlan() {
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
            {t.channels}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.ch1}</li>
            <li>{t.ch2}</li>
            <li>{t.ch3}</li>
            <li>{t.ch4}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.templates}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.t1}</li>
            <li>{t.t2}</li>
            <li>{t.t3}</li>
            <li>{t.t4}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
