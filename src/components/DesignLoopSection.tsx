"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import UsefulButton from "@/components/UsefulButton";

const CONTENT = {
  ru: {
    tag: "Community-Driven Design",
    title: "Design Loop",
    subtitle: "Я создаю контент. Сообщество лайкает и скачивает то, что реально нужно. Аналитика собирает данные. Я вижу тренды и создаю то, что востребовано. Мы строим бренд вместе.",
    step1: "Контент",
    step2: "Обратная связь",
    step3: "Аналитика",
    step4: "Новый контент",
    step2Hint: "лайки · скачивания",
  },
  de: {
    tag: "Community-Driven Design",
    title: "Design Loop",
    subtitle: "Ich erstelle Content. Die Community liked und lädt herunter, was wirklich gebraucht wird. Analytics sammelt Daten. Ich sehe Trends und erstelle, was gefragt ist. Wir bauen die Marke gemeinsam.",
    step1: "Content",
    step2: "Feedback",
    step3: "Analytics",
    step4: "Neuer Content",
    step2Hint: "Likes · Downloads",
  },
} as const;

export default function DesignLoopSection() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}>
      <span className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: "var(--color-cta1)" }}>
        {t.tag}
      </span>
      <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        {t.title}
      </h2>
      <p className="text-base leading-relaxed mb-8 w-full" style={{ color: "var(--color-muted)" }}>
        {t.subtitle}
      </p>

      {/* Flow diagram */}
      <div className="flex flex-wrap items-stretch gap-3 sm:gap-4 w-full">
        <div
          className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center text-center"
          style={{ background: "var(--color-cta1)", color: "#fff" }}
        >
          {t.step1}
        </div>
        <div className="flex flex-1 items-center justify-center" style={{ color: "var(--color-muted)" }}>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <div
          className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm border flex flex-col items-center justify-center text-center"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        >
          {t.step2}
          <span className="block text-xs font-normal mt-0.5 opacity-80" style={{ color: "var(--color-muted)" }}>
            {t.step2Hint}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center" style={{ color: "var(--color-muted)" }}>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <div
          className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm border flex items-center justify-center text-center"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        >
          {t.step3}
        </div>
        <div className="flex flex-1 items-center justify-center" style={{ color: "var(--color-muted)" }}>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <div
          className="flex-1 px-4 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center text-center"
          style={{ background: "var(--color-cta1)", color: "#fff" }}
        >
          {t.step4}
        </div>
      </div>
      <div className="mt-6">
        <UsefulButton targetId="design-loop" targetType="section" />
      </div>
    </section>
  );
}
