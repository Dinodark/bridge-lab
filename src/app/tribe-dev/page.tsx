"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "./translations";

export default function TribeDevPage() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <div className="content-container">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-[#1E1E1E] mb-2">{t.pageTitle}</h1>
        <p className="text-[#808080]">{t.pageDesc}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/tribe-dev/discovery"
          className="block p-6 rounded-xl border border-[#E6E6E6] bg-white hover:border-[#0866FF]/30 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0055FF] flex items-center justify-center text-white text-xl">
              🔍
            </div>
            <h2 className="text-lg font-semibold text-[#1E1E1E]">{t.discovery}</h2>
          </div>
          <p className="text-sm text-[#808080] leading-relaxed">{t.discoveryDesc}</p>
        </Link>

        <Link
          href="/tribe-dev/events"
          className="block p-6 rounded-xl border border-[#E6E6E6] bg-white hover:border-[#0866FF]/30 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#0055FF] flex items-center justify-center text-white text-xl">
              📅
            </div>
            <h2 className="text-lg font-semibold text-[#1E1E1E]">{t.events}</h2>
          </div>
          <p className="text-sm text-[#808080] leading-relaxed">{t.eventsDesc}</p>
        </Link>
      </div>

      <div className="mt-12 p-4 rounded-lg bg-[#f2f7ff] border border-[#E6E6E6]">
        <p className="text-sm text-[#4D4D4D]">
          <strong>Quill Editor</strong> — {t.quillNote} <code className="bg-white px-1 rounded">react-quill</code>.
        </p>
      </div>
    </div>
  );
}
