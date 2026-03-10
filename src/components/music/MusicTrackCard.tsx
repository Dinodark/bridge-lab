"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";

const TRACKS = [
  {
    src: `/Music/${encodeURIComponent("PROD (Lounge Edition) — Cursor In The Dark.mp3")}`,
    cover: "/assets/music-cursor-in-the-dark-cover.png",
    title: "Cursor In The Dark",
    subtitle: "PROD (Lounge Edition)",
    desc: {
      ru: "Cursor, код, Deutschland × Россия. Lounge-версия нашего гимна.",
      de: "Cursor, Code, Deutschland × Russland. Lounge-Version unserer Hymne.",
    },
  },
  {
    src: `/Music/${encodeURIComponent("PROD _ ПРОД (Push It To Prod).mp3")}`,
    cover: "/assets/music-push-it-to-prod-cover.png",
    title: "Push It To Prod",
    subtitle: "PROD · ПРОД",
    desc: {
      ru: "Cursor, код, Deutschland × Россия. Новое время, новые технологии. Наш гимн.",
      de: "Cursor, Code, Deutschland × Russland. Neue Zeit, neue Technologien. Unsere Hymne.",
    },
  },
];

export function getCoverForTrack(src: string | null): string | null {
  if (!src) return null;
  const t = TRACKS.find((x) => x.src === src);
  return t?.cover ?? null;
}

const DOWNLOAD_BTN = { ru: "Скачать трек", de: "Track herunterladen" };

export default function MusicTrackCard({ trackIndex }: { trackIndex: number }) {
  const { lang } = useLanguage();
  const { currentTrack, isPlaying, progress, duration, playTrack, seek } = useMusicPlayer();
  const { trackPlay, trackDownload } = useAnalytics();
  const track = TRACKS[trackIndex];
  const isActive = currentTrack === track.src;
  const playing = isActive && isPlaying;
  const targetId = `music-track-${trackIndex}`;

  const handlePlay = () => {
    if (!playing) trackPlay(targetId, "audio", track.src);
    playTrack(track.src);
  };

  const handleDownload = () => {
    trackDownload(targetId, "audio", track.src);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    seek(pct);
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <section className="rounded-2xl overflow-hidden border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0">
        <div className="relative aspect-square md:aspect-auto md:min-h-[280px] overflow-hidden">
          <MusicTrackCover trackIndex={trackIndex} />
        </div>

        <div className="flex flex-col p-6 sm:p-8 backdrop-blur-xl bg-white/5">
          <span className="text-xs font-bold tracking-widest uppercase mb-1 text-[#B289F9]">
            {track.subtitle}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mb-1 text-white">
            {track.title}
          </h3>
          <p className="text-sm mb-4 text-white/75">
            {track.desc[lang]}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
              <AnalyticsCountBadge targetId={targetId} type="play" className="text-white/60" />
              <span>plays</span>
            </span>
            <a
              href={track.src}
              download
              onClick={handleDownload}
              className="text-xs font-medium px-3 py-1.5 rounded-md transition-opacity hover:opacity-80"
              style={{ background: "var(--color-cta1)", color: "#fff" }}
            >
              {DOWNLOAD_BTN[lang]}
            </a>
            <AnalyticsCountBadge targetId={targetId} type="download" className="text-white/60" />
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <button
              type="button"
              onClick={handlePlay}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={{ background: "var(--color-cta1)", color: "#fff" }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {isActive && (
              <div className="flex-1 min-w-0">
                <div
                  className="h-2 rounded-full cursor-pointer overflow-hidden bg-white/20"
                  onClick={handleSeek}
                  role="progressbar"
                  aria-valuenow={duration ? (progress / duration) * 100 : 0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: duration ? `${(progress / duration) * 100}%` : "0%",
                      background: "var(--color-cta1)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-white/60">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicTrackCover({ trackIndex }: { trackIndex: number }) {
  const cover = TRACKS[trackIndex];
  return (
    <Image
      src={cover.cover}
      alt={`${cover.title} — cover`}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 280px"
    />
  );
}
