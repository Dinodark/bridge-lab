"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

const milestones = [
  { quarter: "Q2 2026", items: ["Beta launch", "Audit", "Marketing"] },
  { quarter: "Q3 2026", items: ["DAO formation", "Major exchange partnerships"] },
  { quarter: "Q4 2026", items: ["Global expansion", "Enterprise partnerships", "DAO driven"] },
];

export default function RoadmapSection() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang === "ru" ? "ru" : lang === "de" ? "de" : "en"];
  return (
    <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.04] backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t.roadmapTitle}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {milestones.map((m, i) => (
            <div key={m.quarter} className="flex items-center">
              <div className="text-center p-6 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 min-w-[180px]">
                <div className="font-bold text-violet-400 mb-2">{m.quarter}</div>
                <ul className="text-sm text-white/80 space-y-1">
                  {m.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {i < milestones.length - 1 && (
                <div className="hidden sm:block w-8 h-0.5 bg-white/30 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
