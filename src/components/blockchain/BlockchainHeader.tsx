"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

export default function BlockchainHeader() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang];
  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/blockchain" className="text-xl font-bold text-white tracking-widest">
          BRIDGE
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/blockchain" className="text-sm font-medium text-white/90 hover:text-white uppercase tracking-wider">
            {t.navHome}
          </Link>
          <Link href="/blockchain#about" className="text-sm font-medium text-white/90 hover:text-white uppercase tracking-wider">
            {t.navAbout}
          </Link>
          <Link href="/blockchain#roadmap" className="text-sm font-medium text-white/90 hover:text-white uppercase tracking-wider">
            {t.navRoadmap}
          </Link>
        </nav>
        <button className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-violet-500 hover:to-purple-500 btn-gradient-glow">
          {t.btnLaunch}
        </button>
      </div>
    </header>
  );
}
