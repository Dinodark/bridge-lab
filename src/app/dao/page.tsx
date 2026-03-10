"use client";

import { useState } from "react";
import { Inter_Tight } from "next/font/google";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";
import DaoWaves from "@/components/dao/DaoWaves";
import DaoSphere from "@/components/dao/DaoSphere";
import DaoParticles from "@/components/dao/DaoParticles";
import DaoPasswordModal from "@/components/dao/DaoPasswordModal";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const TRANSLATIONS = {
  ru: {
    tag: "Tribe Feature",
    title: "Сообщество\nрешает.",
    subtitle:
      "DAO — децентрализованная автономная организация. Не один человек определяет курс. Tribe определяет.",
    oldLabel: "Старый мир",
    oldTitle: "Немногие решают.\nВсе следуют.",
    oldList: [
      "Платформа диктует правила",
      "Алгоритм определяет охват",
      "Решения сверху вниз",
      "Сообщество = зрители",
      "Кулуарные решения вместо прозрачности",
    ],
    newLabel: "Tribe DAO",
    newTitle: "Tribe\nформирует себя сама.",
    newList: [
      "Сообщество голосует",
      "Идеи рождаются изнутри",
      "Решения снизу вверх",
      "Сообщество = создатели",
      "Прозрачность для всех",
    ],
    pillar1Title: "Прозрачность",
    pillar1Desc:
      "Каждый видит, по чему идёт голосование. Никаких скрытых решений. Всё открыто для сообщества.",
    pillar2Title: "Соучастие",
    pillar2Desc:
      "Участники имеют реальный голос. Не символический — а с прямым влиянием на развитие.",
    pillar3Title: "Децентрализация",
    pillar3Desc:
      "Решения рождаются из сообщества. Нет центра. Нет контроля. Живая структура.",
    howTitle: "Как это работает",
    step1Title: "Предложить идею",
    step1Desc:
      "Любой участник может вносить предложения — какие функции строить, какое направление выбирает Tribe.",
    step2Title: "Сообщество голосует",
    step2Desc:
      "Голосования проходят открыто и прозрачно. Каждый голос учитывается. Лучшие идеи побеждают.",
    step3Title: "Решение реализуется",
    step3Desc:
      "Что решит Tribe — то и будет построено. Развитие изнутри — не спущено сверху.",
    step4Title: "Tribe растёт вместе",
    step4Desc:
      "Каждое сообщество формирует свой путь. Результат принадлежит всем — не платформе.",
    who1Title: "Платформа Tribe",
    who1List: [
      "Какие функции строить",
      "Какое направление выбирает Tribe",
      "Какие ценности несёт платформа",
      "Приоритеты развития",
    ],
    who2Title: "Каждый Tribe Host",
    who2List: [
      "Создавать голосования",
      "Прозрачно приоритизировать идеи",
      "Демократично управлять развитием",
      "Формировать свою Tribe",
    ],
    statementQuote: "DAO — не фича.\nDAO — это заявление.",
    statementSub:
      "Сообщества больше не просто зрители.\nОни — создатели. Решающие. Владельцы направления.",
    statementSubBold:
      "Прозрачность вместо кулуаров. Соучастие вместо контроля. Общность вместо платформы.",
    passwordModalTitle: "Вход в систему",
    passwordModalHint: "Логина нет — только пароль. У каждого свой.",
    passwordModalPlaceholder: "Пароль",
    passwordModalErrorEmpty: "Введите пароль",
    passwordModalError: "Неверный пароль",
    passwordModalSubmit: "Войти",
    passwordModalCancel: "Отмена",
  },
  de: {
    tag: "Tribe Feature",
    title: "Die Community\nentscheidet.",
    subtitle:
      "DAO — Decentralized Autonomous Organization. Nicht ein Einzelner bestimmt den Kurs. Die Tribe bestimmt.",
    oldLabel: "Alte Welt",
    oldTitle: "Wenige entscheiden.\nAlle folgen.",
    oldList: [
      "Plattform bestimmt die Regeln",
      "Algorithmus bestimmt die Reichweite",
      "Entscheidungen von oben nach unten",
      "Community = Zuschauer",
      "Hinterzimmer statt Transparenz",
    ],
    newLabel: "Tribe DAO",
    newTitle: "Die Tribe\ngestaltet sich selbst.",
    newList: [
      "Community stimmt ab",
      "Ideen entstehen aus der Mitte",
      "Entscheidungen von unten nach oben",
      "Community = Gestalter",
      "Transparenz für alle sichtbar",
    ],
    pillar1Title: "Transparenz",
    pillar1Desc:
      "Jeder sieht, worüber abgestimmt wird. Keine versteckten Entscheidungen. Alles offen für die Community.",
    pillar2Title: "Mitbestimmung",
    pillar2Desc:
      "Mitglieder haben eine echte Stimme. Nicht symbolisch — sondern mit direktem Einfluss auf die Entwicklung.",
    pillar3Title: "Dezentralisierung",
    pillar3Desc:
      "Entscheidungen entstehen aus der Community heraus. Kein Zentrum. Keine Kontrolle. Lebendige Struktur.",
    howTitle: "So funktioniert's",
    step1Title: "Idee einbringen",
    step1Desc:
      "Jedes Mitglied kann Vorschläge machen — welche Features gebaut werden, welche Richtung die Tribe einschlägt.",
    step2Title: "Community stimmt ab",
    step2Desc:
      "Abstimmungen laufen offen und transparent. Jede Stimme zählt. Die besten Ideen setzen sich durch.",
    step3Title: "Entscheidung wird umgesetzt",
    step3Desc:
      "Was die Tribe entscheidet, wird gebaut. Entwicklung direkt aus der Mitte — nicht von oben verordnet.",
    step4Title: "Tribe wächst gemeinsam",
    step4Desc:
      "Jede Community gestaltet ihren eigenen Weg. Das Ergebnis gehört allen — nicht einer Plattform.",
    who1Title: "Tribe Plattform",
    who1List: [
      "Welche Features gebaut werden",
      "Welche Richtung Tribe einschlägt",
      "Welche Werte die Plattform trägt",
      "Prioritäten der Entwicklung",
    ],
    who2Title: "Jeder Tribe Host",
    who2List: [
      "Abstimmungen erstellen",
      "Ideen transparent priorisieren",
      "Entwicklung demokratisch steuern",
      "Eigene Tribe gestalten",
    ],
    statementQuote: "DAO ist kein Feature.\nDAO ist ein Statement.",
    statementSub:
      "Communities sind nicht mehr nur Zuschauer.\nSie sind Gestalter. Entscheider. Eigentümer der Richtung.",
    statementSubBold:
      "Transparenz statt Hinterzimmer. Mitbestimmung statt Kontrolle. Gemeinschaft statt Plattform.",
    passwordModalTitle: "Systemzugang",
    passwordModalHint: "Kein Login — nur Passwort. Jeder hat sein eigenes.",
    passwordModalPlaceholder: "Passwort",
    passwordModalErrorEmpty: "Passwort eingeben",
    passwordModalError: "Falsches Passwort",
    passwordModalSubmit: "Anmelden",
    passwordModalCancel: "Abbrechen",
  },
} as const;

type Lang = keyof typeof TRANSLATIONS;

export default function DaoPage() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const { trackLike } = useAnalytics();

  return (
    <div
      className={`${interTight.variable} min-h-screen bg-[#FCFCFC] text-[#1E1E1E] font-[family-name:var(--font-inter-tight)] overflow-x-hidden`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="content-container relative">
        {/* Header */}
        <header className="text-center mb-16 sm:mb-20 animate-fade-up">
          <div
            className="inline-block text-[11px] font-bold tracking-[3px] uppercase border border-[#B289F9] text-[#B289F9] px-4 py-1.5 rounded-sm mb-6"
          >
            {t.tag}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.0] tracking-tight mb-5">
            {t.title.split("\n").map((line, i) => (
              <span key={i}>
                {i === 1 ? (
                  <span
                    className="bg-gradient-to-r from-[#48E5FF] via-[#B289F9] to-[#F989B4] bg-clip-text text-transparent"
                  >
                    {line}
                  </span>
                ) : (
                  line
                )}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-[17px] text-[#808080] font-light max-w-[480px] mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </header>

        {/* Old vs New */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 rounded-xl overflow-hidden mb-16 animate-fade-up border border-[#E6E6E6]">
          <div className="relative overflow-hidden border-r border-white/20 p-8 md:p-9 dao-old-block">
            <img
              src="/assets/dao-old-world-bg.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-[top_right] dao-old-bg"
            />
            <div className="absolute inset-0 bg-[#0f0a1e]/88" />
            <div className="absolute inset-0 dao-old-grain" />
            <div className="relative z-10 dao-old-text">
            <div className="text-[10px] font-bold tracking-[3px] uppercase text-white/70 mb-5">
              {t.oldLabel}
            </div>
            <h2 className="text-[22px] font-bold mb-4 leading-snug text-white/90 whitespace-pre-line">
              {t.oldTitle}
            </h2>
            <ul className="space-y-0">
              {t.oldList.map((item, i) => (
                <li
                  key={i}
                  className="text-sm py-2 border-b border-white/15 flex items-center gap-2.5 text-white/65"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/35 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            </div>
          </div>
          <div
            className="p-8 md:p-9"
            style={{
              background:
                "linear-gradient(135deg, #F8F5FF 0%, #FFF5FC 50%, #F5F8FF 100%)",
            }}
          >
            <div className="text-[10px] font-bold tracking-[3px] uppercase text-[#6E22F2] mb-5">
              {t.newLabel}
            </div>
            <h2 className="text-[22px] font-bold mb-4 leading-snug text-[#1E1E1E] whitespace-pre-line">
              {t.newTitle}
            </h2>
            <ul className="space-y-0">
              {t.newList.map((item, i) => (
                <li
                  key={i}
                  className="text-sm py-2 border-b border-[#E6E6E6] flex items-center gap-2.5 text-[#444]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B289F9] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* DAO Center — волны, кружки (при hover на шарик), шарик (поверх) */}
      <div className="dao-sphere-waves-block relative flex justify-center items-center min-h-[280px] py-10 mb-24 sm:mb-32 overflow-visible">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-40 sm:h-52 min-h-[160px] z-0 pointer-events-none">
          <DaoWaves overlay />
        </div>
        <div
          className="group relative z-10 w-32 h-32 flex flex-col justify-center items-center overflow-visible cursor-pointer gap-2"
          onClick={() => {
            trackLike("dao-sphere", "dao");
            setPasswordModalOpen(true);
          }}
        >
          {/* Кружки под шариком при hover — 360×360, центр совпадает */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[360px] h-[360px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
            <DaoParticles />
          </div>
          <DaoSphere />
          <AnalyticsCountBadge targetId="dao-sphere" type="like" className="text-[10px] text-[#6E22F2]/80" />
        </div>
      </div>

      <DaoPasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={() => setPasswordModalOpen(false)}
        title={t.passwordModalTitle}
        hint={t.passwordModalHint}
        placeholder={t.passwordModalPlaceholder}
        errorEmpty={t.passwordModalErrorEmpty}
        errorWrong={t.passwordModalError}
        submitLabel={t.passwordModalSubmit}
        cancelLabel={t.passwordModalCancel}
      />

      <div className="content-container relative">
        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            {
              icon: (
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-28 h-28 text-[#B289F9]">
                  <ellipse cx="16" cy="16" rx="8" ry="5" />
                  <circle cx="16" cy="16" r="2.5" />
                  <path d="M16 4v3M16 25v3M4 16h3M25 16h3M8 8l2 2M24 8l-2 2M24 24l-2-2M8 24l2-2" />
                </svg>
              ),
              title: t.pillar1Title,
              desc: t.pillar1Desc,
            },
            {
              icon: (
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-28 h-28 text-[#B289F9]">
                  <path d="M6 22 C6 10 10 8 16 12" />
                  <path d="M26 22 C26 10 22 8 16 12" />
                </svg>
              ),
              title: t.pillar2Title,
              desc: t.pillar2Desc,
            },
            {
              icon: (
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-28 h-28 text-[#B289F9]">
                  <circle cx="16" cy="16" r="10" />
                  <path d="M16 6v20M6 16h20" />
                  <path d="M8 10l16 12M24 10L8 22" />
                  <circle cx="16" cy="16" r="2" strokeWidth="0.75" />
                </svg>
              ),
              title: t.pillar3Title,
              desc: t.pillar3Desc,
            },
          ].map((p) => (
            <div
              key={p.title}
              className="bg-white border border-[#E6E6E6] rounded-xl p-7 relative overflow-hidden transition-all duration-300 hover:border-[#B289F9] hover:-translate-y-1 group shadow-sm"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#48E5FF] via-[#B289F9] to-[#F989B4] opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="block mb-3">{p.icon}</span>
              <span className="text-base font-bold text-[#1E1E1E] block mb-2">
                {p.title}
              </span>
              <p className="text-[13px] text-[#808080] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px my-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E6E6E6, transparent)",
          }}
        />

        {/* How it works */}
        <div className="mb-16">
          <div className="text-[13px] font-bold tracking-[3px] uppercase text-[#B289F9] mb-8">
            {t.howTitle}
          </div>
          <div className="space-y-0">
            {[
              { num: 1, title: t.step1Title, desc: t.step1Desc },
              { num: 2, title: t.step2Title, desc: t.step2Desc },
              { num: 3, title: t.step3Title, desc: t.step3Desc },
              { num: 4, title: t.step4Title, desc: t.step4Desc },
            ].map((s, i) => (
              <div
                key={s.num}
                className="grid grid-cols-[64px_1fr] gap-6 relative"
              >
                {i < 3 && (
                  <div
                    className="absolute left-8 top-14 w-px h-[calc(100%+24px)] bg-gradient-to-b from-[#B289F9] to-transparent"
                  />
                )}
                <div className="flex justify-center pt-1">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-[#B289F9] flex items-center justify-center text-lg font-extrabold text-[#B289F9] bg-[#FCFCFC] relative z-10"
                  >
                    {s.num}
                  </div>
                </div>
                <div className="pb-10">
                  <div className="text-lg font-bold mb-2 text-[#1E1E1E]">{s.title}</div>
                  <p className="text-sm text-[#808080] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who can */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-7 shadow-sm">
            <div className="text-sm font-bold tracking-wider uppercase text-[#6E22F2] mb-4">
              {t.who1Title}
            </div>
            <ul className="space-y-0">
              {t.who1List.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-[#444] py-2 border-b border-[#E6E6E6] flex items-center gap-2.5 last:border-0"
                >
                  <span className="text-[#B289F9] text-xs">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#E6E6E6] rounded-xl p-7 shadow-sm">
            <div className="text-sm font-bold tracking-wider uppercase text-[#6E22F2] mb-4">
              {t.who2Title}
            </div>
            <ul className="space-y-0">
              {t.who2List.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-[#444] py-2 border-b border-[#E6E6E6] flex items-center gap-2.5 last:border-0"
                >
                  <span className="text-[#B289F9] text-xs">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statement */}
        <div
          className="rounded-2xl p-12 md:p-14 text-center relative overflow-hidden border border-[#E6E6E6] dao-statement-bg"
        >
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "200px",
              fontWeight: 800,
              color: "rgba(178,137,249,0.08)",
              whiteSpace: "nowrap",
            }}
          >
            DAO
          </div>
          <div className="relative z-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-5 whitespace-pre-line text-[#1E1E1E]">
              {lang === "de" ? (
                <>
                  DAO ist kein Feature.
                  <br />
                  DAO ist ein{" "}
                  <span
                className="font-bold"
                style={{
                  backgroundImage: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Statement.
              </span>
                </>
              ) : (
                <>
                  DAO — не фича.
                  <br />
                  DAO — это{" "}
                <span
                  className="font-bold"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  заявление.
                </span>
                </>
              )}
            </div>
            <p className="text-sm text-[#808080] leading-relaxed whitespace-pre-line">
              {t.statementSub.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.statementSub.split("\n").length - 1 && <br />}
                </span>
              ))}
              <br />
              <br />
              <strong className="text-[#1E1E1E] font-semibold">
                {t.statementSubBold}
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* DAO Center — дубликат в конце страницы */}
      <div className="dao-sphere-waves-block relative flex justify-center items-center min-h-[280px] py-10 mb-24 sm:mb-32 overflow-visible">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-40 sm:h-52 min-h-[160px] z-0 pointer-events-none">
          <DaoWaves overlay />
        </div>
        <div
          className="group relative z-10 w-32 h-32 flex flex-col justify-center items-center overflow-visible cursor-pointer gap-2"
          onClick={() => {
            trackLike("dao-sphere", "dao");
            setPasswordModalOpen(true);
          }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[360px] h-[360px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
            <DaoParticles />
          </div>
          <DaoSphere />
          <AnalyticsCountBadge targetId="dao-sphere" type="like" className="text-[10px] text-[#6E22F2]/80" />
        </div>
      </div>
    </div>
  );
}
