"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "Целевая аудитория и триггеры",
    who: "Кто они: 25–45 лет, креаторы, коучи, инфлюенсеры, маркетологи, предприниматели (YouTuber, digital natives). Фрилансеры и малый бизнес: мамы-креаторы, видеографы, коучи по маркетингу/лидерству. Экспертиза в digital marketing, sales, mindset.",
    motivation: "Мотивация: рост до 6-значных доходов, networking (IBM, Pipedrive, ASUS), переход от нестабильного дохода к recurring revenue.",
    behavior: "Поведение: активны в Instagram/TikTok, ищут all-in-one (community + курсы), фокус на DE/CH (ивенты в Берлине/Цюрихе).",
    triggers: "Триггеры аудитории",
    t1: "Усталость от фейка, алгоритмов, фрагментированных инструментов (Discord + Teachable)",
    t2: "«Преврати страсть в бизнес» — резонирует с креаторами",
    t3: "Recurring revenue и стабильность вместо одиночества",
    t4: "Реальные связи, networking, поддержка (мастер-классы, коучинг)",
    t5: "Простота и кастомизация — «как своя платформа»",
  },
  de: {
    title: "Zielgruppe und Trigger",
    who: "Wer sie sind: 25–45 Jahre, Kreative, Coaches, Influencer, Vermarkter, Unternehmer (YouTuber, Digital Natives). Freelancer und KMU: Mama-Kreative, Videografen, Marketing-/Leadership-Coaches. Expertise in Digital Marketing, Sales, Mindset.",
    motivation: "Motivation: Wachstum bis 6-stellige Einnahmen, Networking (IBM, Pipedrive, ASUS), Übergang von instabilem Einkommen zu wiederkehrenden Einnahmen.",
    behavior: "Verhalten: aktiv auf Instagram/TikTok, suchen All-in-One (Community + Kurse), Fokus auf DE/CH (Events in Berlin/Zürich).",
    triggers: "Audience-Trigger",
    t1: "Müdigkeit von Fake, Algorithmen, fragmentierten Tools (Discord + Teachable)",
    t2: "«Leidenschaft in Business verwandeln» — spricht Kreative an",
    t3: "Wiederkehrende Einnahmen und Stabilität statt Einsamkeit",
    t4: "Echte Verbindungen, Networking, Support (Meisterkurse, Coaching)",
    t5: "Einfachheit und Anpassung — «wie eine eigene Plattform»",
  },
} as const;

export default function AudienceTriggers() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "var(--color-border)" }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        {t.title}
      </h2>
      <p className="leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
        {t.who}
      </p>
      <p className="leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
        {t.motivation}
      </p>
      <p className="leading-relaxed mb-6" style={{ color: "var(--color-muted)" }}>
        {t.behavior}
      </p>
      <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-text)" }}>
        {t.triggers}
      </h3>
      <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
        <li>{t.t1}</li>
        <li>{t.t2}</li>
        <li>{t.t3}</li>
        <li>{t.t4}</li>
        <li>{t.t5}</li>
      </ul>
    </section>
  );
}
