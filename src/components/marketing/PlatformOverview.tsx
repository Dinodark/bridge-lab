"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "Обзор платформы tribe.de",
    desc: "tribe.de — all-in-one платформа для создания и монетизации сообществ, ориентированная на креаторов, коучей и маркетологов в Германии и Европе. Позиционируется как «движение» против фейковых сетей, с акцентом на реальные взаимодействия, DAO-управление и Share2Earn.",
    onetribe: "ONETRIBE: бесплатное сообщество 50 000+ участников, ежедневные LIVE-воркшопы, оффлайн-ивенты (Базель, Цюрих, Берлин), DAO для децентрализованного голосования, Share2Earn для заработка на рефералах без вложений.",
    creators: "Для креаторов: all-in-one инструмент для курсов, коучинга, чатов, аналитики, маркетинга и продаж за 99€/мес (без комиссий, 0% на продажи). Заменяет множество инструментов, фокус на масштабировании до 6–8-значных бизнесов.",
    tech: "Технические фичи: кастомизация, геймификация, дашборды, интеграции; для админов и мемберов — посты, видео, опросы, networking.",
  },
  de: {
    title: "Plattformüberblick tribe.de",
    desc: "tribe.de — All-in-One-Plattform für den Aufbau und die Monetarisierung von Communities, ausgerichtet auf Kreative, Coaches und Vermarkter in Deutschland und Europa. Positioniert sich als «Bewegung» gegen Fake-Netzwerke, mit Fokus auf echte Interaktionen, DAO-Governance und Share2Earn.",
    onetribe: "ONETRIBE: kostenlose Community mit 50.000+ Mitgliedern, tägliche LIVE-Workshops, Offline-Events (Basel, Zürich, Berlin), DAO für dezentrales Voting, Share2Earn zum Verdienen durch Empfehlungen ohne Investition.",
    creators: "Für Kreative: All-in-One-Tool für Kurse, Coaching, Chats, Analytics, Marketing und Verkauf für 99€/Monat (ohne Provisionen, 0% auf Verkäufe). Ersetzt viele Tools, Fokus auf Skalierung bis 6–8-stellige Unternehmen.",
    tech: "Technische Features: Anpassung, Gamification, Dashboards, Integrationen; für Admins und Mitglieder — Posts, Videos, Umfragen, Networking.",
  },
} as const;

export default function PlatformOverview() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "var(--color-border)" }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
        {t.title}
      </h2>
      <p className="leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
        {t.desc}
      </p>
      <ul className="space-y-3 list-none">
        <li className="flex gap-2">
          <span style={{ color: "var(--color-cta1)" }}>·</span>
          <span style={{ color: "var(--color-text)" }}>{t.onetribe}</span>
        </li>
        <li className="flex gap-2">
          <span style={{ color: "var(--color-cta1)" }}>·</span>
          <span style={{ color: "var(--color-text)" }}>{t.creators}</span>
        </li>
        <li className="flex gap-2">
          <span style={{ color: "var(--color-cta1)" }}>·</span>
          <span style={{ color: "var(--color-text)" }}>{t.tech}</span>
        </li>
      </ul>
    </section>
  );
}
