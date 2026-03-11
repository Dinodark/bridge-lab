"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import MusicTrackCard from "@/components/music/MusicTrackCard";
import { getCoverForTrack } from "@/components/music/MusicTrackCard";

const PAGE_DESC = { ru: "Cursor In The Dark, Push It To Prod. Наша музыка.", de: "Cursor In The Dark, Push It To Prod. Unsere Musik." };

const COVERS = [
  "/assets/music-cursor-in-the-dark-cover.png",
  "/assets/music-push-it-to-prod-cover.png",
];

function MusicPageContent() {
  const { lang } = useLanguage();
  const { currentTrack } = useMusicPlayer();
  const coverIndex = currentTrack
    ? COVERS.indexOf(getCoverForTrack(currentTrack) ?? COVERS[0])
    : 0;
  const activeIndex = coverIndex >= 0 ? coverIndex : 0;

  return (
    <>
      {/* Fixed background — cover of playing track, 80% darkened, crossfade через чёрный */}
      <div className="fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-black" />
        {COVERS.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              transition: i === activeIndex
                ? "opacity 350ms ease-out"
                : "opacity 350ms ease-in 350ms",
            }}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="100vw" priority={i === 0} />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.8)" }} />
          </div>
        ))}
      </div>

      <div className="content-container relative">
        <div className="inline-block text-xs font-bold tracking-widest uppercase mb-4 text-[#B289F9]">
          Music
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-white">
          PROD · Anthem & Lounge
        </h1>
        <p className="text-lg mb-12 text-white/80">
          {PAGE_DESC[lang]}
        </p>

        <div className="space-y-8">
          <MusicTrackCard trackIndex={0} />
          <MusicTrackCard trackIndex={1} />
        </div>
      </div>
    </>
  );
}

export default function MusicPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <MusicPageContent />
    </div>
  );
}
