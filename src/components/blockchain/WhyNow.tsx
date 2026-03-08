"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

export default function WhyNow() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang === "ru" ? "ru" : lang === "de" ? "de" : "en"];
  const reasons = [
    { title: t.why1Title, desc: t.why1Desc },
    { title: t.why2Title, desc: t.why2Desc },
    { title: t.why3Title, desc: t.why3Desc },
  ];

  return (
    <section className="why-now-gradient-bg py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.04] backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t.whyTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="p-6 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-white/70">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
