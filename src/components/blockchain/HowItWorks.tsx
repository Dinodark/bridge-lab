"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

const STEP_ICONS = [
  <svg key="1" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="2" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="3" className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
];

export default function HowItWorks() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang === "ru" ? "ru" : lang === "de" ? "de" : "en"];
  const steps = [
    { icon: STEP_ICONS[0], title: t.how1Title, desc: t.how1Desc },
    { icon: STEP_ICONS[1], title: t.how2Title, desc: t.how2Desc },
    { icon: STEP_ICONS[2], title: t.how3Title, desc: t.how3Desc },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          {t.howTitle}
        </h2>
        <p className="text-white/70 text-center mb-16 max-w-2xl mx-auto">
          {t.howSubtitle}
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-violet-500/20 text-violet-400 mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
