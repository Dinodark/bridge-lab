"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "../translations";

export default function DiscoveryPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const categories = t.categoryList;
  const tribes = t.mockTribes;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categories[0]);

  return (
    <div className="max-w-[1116px] mx-auto px-4 sm:px-6 py-8">
      <Link href="/tribe-dev" className="inline-flex items-center gap-2 text-sm text-[#0866FF] hover:underline mb-8">
        {t.backToTribeDev}
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">{t.tribeDiscovery}</h1>
          <p className="text-[#808080] mt-1">{t.discoverTribes}</p>
        </div>
        <div className="relative w-full sm:w-80">
          <input
            type="search"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-4 pr-12 rounded-lg border border-[#CCCCCC] bg-white text-[#1A1A1A] placeholder:text-[#808080] focus:border-[#4D4D4D] focus:ring-2 focus:ring-[#E6E6E6] outline-none"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              category === cat
                ? "bg-[#D0E6FC] border border-[#0866FF] text-[#1E1E1E]"
                : "bg-white border border-[#E6E6E6] text-[#808080] hover:bg-[#F2F2F2] hover:border-[#CCCCCC]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#E6E6E6] bg-white p-6 mb-8" style={{ background: "linear-gradient(90.84deg, #00caf5 -0.59%, #0055ff 99.34%)" }}>
        <div className="text-white">
          <h2 className="text-lg font-semibold mb-1">{t.findNotChance}</h2>
          <p className="text-white/90 text-sm">{t.findNotChanceDesc}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {tribes.map((tribe, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-[#E6E6E6] bg-white hover:border-[#0866FF]/30 transition-colors"
          >
            <h3 className="font-semibold text-[#1E1E1E]">{tribe.name}</h3>
            <p className="text-sm text-[#808080] mt-1">{tribe.desc}</p>
            <span className="inline-block mt-2 text-xs text-[#0866FF]">{tribe.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
