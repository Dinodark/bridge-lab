"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

export default function NumbersDontLie() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang === "ru" ? "ru" : lang === "de" ? "de" : "en"];
  const stats = [
    { value: "$592B", label: t.numbers1Label, delay: "0s" },
    { value: "$2.5B", label: t.numbers2Label, delay: "0.8s" },
    { value: "73%", label: t.numbers3Label, delay: "1.6s" },
    { value: "66%", label: t.numbers4Label, delay: "2.4s" },
  ];

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(139, 92, 246, 0.12), rgba(34, 211, 238, 0.06) 40%, transparent 70%)",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t.numbersTitle}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="p-6 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold numbers-shimmer mb-2" style={{ animationDelay: stat.delay }}>{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-white/60 text-center mt-12 max-w-2xl mx-auto">
          {t.numbersP}
        </p>
      </div>
    </section>
  );
}
