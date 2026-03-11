"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "Гайд для разработчиков",
    subtitle: "Реклама, интеграции с инфлюенсерами, Share2Earn, API, UGC-челленджи.",
    ads: "Реклама и таргетинг",
    a1: "Таргет в Instagram/FB на «creator coaches Germany», «community building», «online courses»",
    a2: "Retargeting: посетители сайта, подписчики ONETRIBE",
    a3: "A/B-тесты баннеров и видео: «до/после», testimonials, Share2Earn",
    integrations: "Интеграции",
    i1: "Share2Earn: реферальные ссылки, трекинг, UTM-параметры",
    i2: "API tribe.de: embeddable widgets, block-builder для кастомных лендингов",
    i3: "SSO/social login: упрощение онбординга",
    influencers: "Инфлюенсеры и UGC",
    inf1: "Коллабы: testimonials, видео-челленджи (#ONETRIBE)",
    inf2: "Формат: 60–90 сек «моя история с Tribe», CTA в ONETRIBE",
    inf3: "Маркетологи, коучи по лидерству — аффилиат-программы",
    inf4: "TikTok/Reels: «до/после» монетизации, DAO-голосования в сторис",
  },
  de: {
    title: "Leitfaden für Entwickler",
    subtitle: "Werbung, Influencer-Integrationen, Share2Earn, API, UGC-Challenges.",
    ads: "Werbung und Targeting",
    a1: "Targeting auf Instagram/FB: «creator coaches Germany», «community building», «online courses»",
    a2: "Retargeting: Website-Besucher, ONETRIBE-Abonnenten",
    a3: "A/B-Tests von Bannern und Videos: «Vorher/Nachher», Testimonials, Share2Earn",
    integrations: "Integrationen",
    i1: "Share2Earn: Empfehlungslinks, Tracking, UTM-Parameter",
    i2: "tribe.de API: einbettbare Widgets, Block-Builder für Custom-Landings",
    i3: "SSO/Social Login: Onboarding vereinfachen",
    influencers: "Influencer und UGC",
    inf1: "Kollaborationen: Testimonials, Video-Challenges (#ONETRIBE)",
    inf2: "Format: 60–90 Sek «meine Tribe-Geschichte», CTA zu ONETRIBE",
    inf3: "Vermarkter, Leadership-Coaches — Affiliate-Programme",
    inf4: "TikTok/Reels: «Vorher/Nachher» Monetarisierung, DAO-Abstimmungen in Stories",
  },
} as const;

export default function DevGuide() {
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
            {t.ads}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.a1}</li>
            <li>{t.a2}</li>
            <li>{t.a3}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.integrations}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.i1}</li>
            <li>{t.i2}</li>
            <li>{t.i3}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.influencers}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.inf1}</li>
            <li>{t.inf2}</li>
            <li>{t.inf3}</li>
            <li>{t.inf4}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
