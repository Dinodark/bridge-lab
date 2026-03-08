"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import MusicTrackCard from "@/components/music/MusicTrackCard";

const PAGE_DESC = { ru: "Cursor In The Dark, Push It To Prod. Наша музыка.", de: "Cursor In The Dark, Push It To Prod. Unsere Musik." };

export default function MusicPage() {
  const { lang } = useLanguage();
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg)", fontFamily: "'Inter Tight', Inter, sans-serif" }}
    >
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-24">
        <div className="inline-block text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--color-cta1)" }}>
          Music
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
          PROD · Anthem & Lounge
        </h1>
        <p className="text-lg mb-12" style={{ color: "var(--color-muted)" }}>
          {PAGE_DESC[lang]}
        </p>

        <MusicPlayerProvider>
          <div className="space-y-8">
            <MusicTrackCard trackIndex={0} />
            <MusicTrackCard trackIndex={1} />
          </div>
        </MusicPlayerProvider>
      </div>
    </div>
  );
}
