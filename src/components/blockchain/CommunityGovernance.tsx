"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

export default function CommunityGovernance() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang === "ru" ? "ru" : lang === "de" ? "de" : "en"];
  const revenueItems = [t.govItem1, t.govItem2, t.govItem3, t.govItem4];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.04] backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t.govTitle}
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-white/80 mb-4">
              {t.govP1}
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              {t.govP2}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{t.govRevenue}</h3>
            <ul className="space-y-3">
              {revenueItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-8 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:from-violet-500 hover:to-purple-500 btn-gradient-glow">
              {t.btnToken}
            </button>
            <p className="text-white/50 text-sm mt-2">{t.govHint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
