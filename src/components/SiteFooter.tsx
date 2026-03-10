"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_CONFIG } from "@/lib/site-config";

const CONTENT = {
  ru: {
    partnersLabel: "Хотите обсудить коллаборацию?",
    partnersCta: "Написать",
    tribeLabel: "Есть идея для контента?",
    tribeCta: "В чат",
    followLabel: "Следить за обновлениями",
    followCta: "Telegram",
    copyright: "OneBridge · 2025",
  },
  de: {
    partnersLabel: "Möchten Sie über eine Kollaboration sprechen?",
    partnersCta: "Schreiben",
    tribeLabel: "Haben Sie eine Idee für Content?",
    tribeCta: "Zum Chat",
    followLabel: "Updates folgen",
    followCta: "Telegram",
    copyright: "OneBridge · 2025",
  },
} as const;

export default function SiteFooter() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];
  const config = SITE_CONFIG;

  return (
    <footer
      className="border-t py-12 px-6 sm:px-8"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
    >
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
              {t.partnersLabel}
            </p>
            <a
              href={config.partnersContact.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:gap-2.5"
              style={{ color: "var(--color-cta1)" }}
            >
              {t.partnersCta}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
              {t.tribeLabel}
            </p>
            <a
              href={config.tribeContact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:gap-2.5"
              style={{ color: "var(--color-cta1)" }}
            >
              {t.tribeCta}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
              {t.followLabel}
            </p>
            <a
              href={config.followContact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:gap-2.5"
              style={{ color: "var(--color-cta1)" }}
            >
              {t.followCta}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t" style={{ borderColor: "var(--color-border)" }}>
          <span className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>
            {t.copyright}
          </span>
          <div className="flex gap-6">
            <Link href="/tribe" className="text-xs font-medium hover:underline" style={{ color: "var(--color-muted)" }}>
              Tribe
            </Link>
            <Link href="/dao" className="text-xs font-medium hover:underline" style={{ color: "var(--color-muted)" }}>
              DAO
            </Link>
            <Link href="/blockchain" className="text-xs font-medium hover:underline" style={{ color: "var(--color-muted)" }}>
              Bridge
            </Link>
            <Link href="/roadmap" className="text-xs font-medium hover:underline" style={{ color: "var(--color-muted)" }}>
              Roadmap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
