"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

export default function CharityParadox() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang];
  const stats = [
    { value: t.paradox1Value, label: t.paradox1Label, desc: t.paradox1Desc },
    { value: t.paradox2Value, label: t.paradox2Label, desc: t.paradox2Desc },
    { value: t.paradox3Value, label: t.paradox3Label, desc: t.paradox3Desc },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t.paradoxTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center p-6 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10">
              <div className="text-3xl font-bold text-violet-400 mb-2">{stat.value}</div>
              <div className="text-white font-medium mb-3">{stat.label}</div>
              <p className="text-white/60 text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
