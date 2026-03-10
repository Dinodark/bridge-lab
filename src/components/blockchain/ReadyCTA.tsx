"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

export default function ReadyCTA() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-content mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          {t.readyTitle}
        </h2>
        <p className="text-white/80 mb-8">
          {t.readyP}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:from-violet-500 hover:to-purple-500 btn-gradient-glow">
            {t.btnTelegram}
          </button>
          <button className="px-6 py-3 rounded-lg font-medium btn-ghost-violet">
            {t.btnDeck}
          </button>
        </div>
      </div>
    </section>
  );
}
