"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "Гайд для дизайнеров",
    subtitle: "Аудиовизуальные образы, мудборды, тональность. Подбор визуалов для коммуникации с аудиторией.",
    tone: "Тональность и бренд-голос",
    toneDesc: 'Энергичный, мотивирующий («The fire is burning. Are you in?»). Акцент на реальные связи, рост, монетизацию страсти. Отзывы подчёркивают простоту, поддержку, переход от «одиночества» к стабильному доходу.',
    visuals: "Визуальные образы",
    v1: "Огонь, тепло, костёр — community, энергия",
    v2: "Реальные люди, networking, оффлайн-ивенты (Базель, Цюрих, Берлин)",
    v3: "До/после: монетизация, рост до 6–8 цифр",
    v4: "LIVE-воркшопы, мастер-классы — динамика, обучение",
    v5: "DAO, Share2Earn — визуализация «децентрализации» и «вирусного» роста",
    moodboard: "Мудборд",
    m1: "Цвета: тёплые, энергичные (оранж, красный, фиолетовый) + нейтральные для контраста",
    m2: "Типографика: смелая, читаемая (заголовки), дружелюбная (body)",
    m3: "Фото: реальные люди, события, экраны платформы",
    m4: "Иконки: минимализм, community-символы (огонь, люди, соединения)",
  },
  de: {
    title: "Leitfaden für Designer",
    subtitle: "Audiovisuelle Bilder, Moodboards, Tonalität. Auswahl von Visuals für die Kommunikation mit der Zielgruppe.",
    tone: "Tonalität und Brand Voice",
    toneDesc: 'Energisch, motivierend («The fire is burning. Are you in?»). Fokus auf echte Verbindungen, Wachstum, Monetarisierung von Leidenschaft. Bewertungen betonen Einfachheit, Support, Übergang von «Einsamkeit» zu stabilem Einkommen.',
    visuals: "Visuelle Bilder",
    v1: "Feuer, Wärme, Lagerfeuer — Community, Energie",
    v2: "Echte Menschen, Networking, Offline-Events (Basel, Zürich, Berlin)",
    v3: "Vorher/Nachher: Monetarisierung, Wachstum bis 6–8 Stellen",
    v4: "LIVE-Workshops, Meisterkurse — Dynamik, Lernen",
    v5: "DAO, Share2Earn — Visualisierung von «Dezentralisierung» und «viralem» Wachstum",
    moodboard: "Moodboard",
    m1: "Farben: warm, energisch (Orange, Rot, Lila) + neutrale für Kontrast",
    m2: "Typografie: mutig, lesbar (Überschriften), freundlich (Body)",
    m3: "Fotos: echte Menschen, Events, Plattform-Screens",
    m4: "Icons: Minimalismus, Community-Symbole (Feuer, Menschen, Verbindungen)",
  },
} as const;

export default function DesignGuide() {
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
            {t.tone}
          </h3>
          <p className="leading-relaxed" style={{ color: "var(--color-muted)" }}>
            {t.toneDesc}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.visuals}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.v1}</li>
            <li>{t.v2}</li>
            <li>{t.v3}</li>
            <li>{t.v4}</li>
            <li>{t.v5}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.moodboard}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.m1}</li>
            <li>{t.m2}</li>
            <li>{t.m3}</li>
            <li>{t.m4}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
