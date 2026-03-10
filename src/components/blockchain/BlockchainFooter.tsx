"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { BLOCKCHAIN_TRANSLATIONS } from "@/app/blockchain/translations";

export default function BlockchainFooter() {
  const { lang } = useLanguage();
  const t = BLOCKCHAIN_TRANSLATIONS[lang];
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-content mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          <div>
            <div className="text-xl font-bold text-white tracking-widest mb-2">BRIDGE</div>
            <p className="text-white/60 text-sm mb-4">{t.footerTagline}</p>
            <p className="text-white/40 text-sm">{t.footerRights}</p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="font-semibold text-white mb-3">{t.footerContact}</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/contact" className="hover:text-white">{t.footerEmail}</Link></li>
                <li><Link href="/privacy" className="hover:text-white">{t.footerPrivacy}</Link></li>
                <li><Link href="/terms" className="hover:text-white">{t.footerTerms}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t.footerFollow}</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Medium</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
