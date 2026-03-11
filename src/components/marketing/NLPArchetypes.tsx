"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "NLP и архетипы",
    subtitle: "Разбор по Юнгу/архетипам (Creator, Ruler, Magician, Hero), Spirit/профайлинг. На какие места надавить, чем вдохновить.",
    creator: "Creator (Творец)",
    creatorDesc: "«Создай своё», «твой бренд», «как своя платформа». Кастомизация, white-label, аутентичность.",
    hero: "Hero (Герой)",
    heroDesc: "«Масштабируй до 6–8 цифр», «преодолей одиночество», «рост». Переход от нестабильного дохода к recurring revenue.",
    magician: "Magician (Маг)",
    magicianDesc: "«Share2Earn без вложений», «DAO — ты решаешь». Трансформация, «волшебство» community-driven роста.",
    ruler: "Ruler (Правитель)",
    rulerDesc: "«Recurring revenue», «стабильный доход», «контроль». Управление своим бизнесом, без алгоритмов соцсетей.",
    pressure: "На что надавить",
    p1: "Усталость от фейка, алгоритмов, фрагментации → предложить «реальное» и «всё в одном».",
    p2: "Желание стабильности → recurring revenue, Share2Earn как «пассивный» доход.",
    p3: "Социальное доказательство → testimonials, 50k+, IBM/Pipedrive.",
    inspire: "Чем вдохновить",
    i1: "«Преврати страсть в бизнес» — эмоциональный хук.",
    i2: "«Люди с визией, а не скроллеры» — идентичность.",
    i3: "«Бесплатные мастер-классы» — доступность и поддержка.",
  },
  de: {
    title: "NLP und Archetypen",
    subtitle: "Analyse nach Jung/Archetypen (Creator, Ruler, Magician, Hero), Spirit/Profiling. Wo aufsetzen, womit inspirieren.",
    creator: "Creator (Schöpfer)",
    creatorDesc: "«Erschaffe dein Eigenes», «deine Marke», «wie eine eigene Plattform». Anpassung, White-Label, Authentizität.",
    hero: "Hero (Held)",
    heroDesc: "«Skaliere bis 6–8 Stellen», «überwinde Einsamkeit», «Wachstum». Übergang von instabilem Einkommen zu wiederkehrenden Einnahmen.",
    magician: "Magician (Magier)",
    magicianDesc: "«Share2Earn ohne Investition», «DAO — du entscheidest». Transformation, «Magie» des community-driven Wachstums.",
    ruler: "Ruler (Herrscher)",
    rulerDesc: "«Recurring revenue», «stabiles Einkommen», «Kontrolle». Eigenes Business verwalten, ohne Social-Media-Algorithmen.",
    pressure: "Worauf setzen",
    p1: "Müdigkeit von Fake, Algorithmen, Fragmentierung → «echt» und «alles in einem» anbieten.",
    p2: "Wunsch nach Stabilität → recurring revenue, Share2Earn als «passives» Einkommen.",
    p3: "Sozialer Beweis → Testimonials, 50k+, IBM/Pipedrive.",
    inspire: "Womit inspirieren",
    i1: "«Leidenschaft in Business verwandeln» — emotionaler Hook.",
    i2: "«Menschen mit Vision, keine Scroller» — Identität.",
    i3: "«Kostenlose Meisterkurse» — Zugänglichkeit und Support.",
  },
} as const;

export default function NLPArchetypes() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--color-border)" }}>
            <h4 className="font-bold mb-2" style={{ color: "var(--color-cta1)" }}>{t.creator}</h4>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>{t.creatorDesc}</p>
          </div>
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--color-border)" }}>
            <h4 className="font-bold mb-2" style={{ color: "var(--color-cta1)" }}>{t.hero}</h4>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>{t.heroDesc}</p>
          </div>
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--color-border)" }}>
            <h4 className="font-bold mb-2" style={{ color: "var(--color-cta1)" }}>{t.magician}</h4>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>{t.magicianDesc}</p>
          </div>
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--color-border)" }}>
            <h4 className="font-bold mb-2" style={{ color: "var(--color-cta1)" }}>{t.ruler}</h4>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>{t.rulerDesc}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.pressure}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.p1}</li>
            <li>{t.p2}</li>
            <li>{t.p3}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-cta1)" }}>
            {t.inspire}
          </h3>
          <ul className="space-y-2 list-disc list-inside" style={{ color: "var(--color-muted)" }}>
            <li>{t.i1}</li>
            <li>{t.i2}</li>
            <li>{t.i3}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
