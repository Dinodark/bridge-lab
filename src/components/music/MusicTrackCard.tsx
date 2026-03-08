"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

const TRACKS = [
  {
    src: `/Music/${encodeURIComponent("PROD (Lounge Edition) — Cursor In The Dark.mp3")}`,
    title: "Cursor In The Dark",
    subtitle: "PROD (Lounge Edition)",
    desc: {
      ru: "Cursor, код, Deutschland × Россия. Lounge-версия нашего гимна.",
      de: "Cursor, Code, Deutschland × Russland. Lounge-Version unserer Hymne.",
    },
  },
  {
    src: `/Music/${encodeURIComponent("PROD _ ПРОД (Push It To Prod).mp3")}`,
    title: "Push It To Prod",
    subtitle: "PROD · ПРОД",
    desc: {
      ru: "Cursor, код, Deutschland × Россия. Новое время, новые технологии. Наш гимн.",
      de: "Cursor, Code, Deutschland × Russland. Neue Zeit, neue Technologien. Unsere Hymne.",
    },
  },
];

export default function MusicTrackCard({ trackIndex }: { trackIndex: number }) {
  const { lang } = useLanguage();
  const { currentTrack, isPlaying, progress, duration, playTrack, seek } = useMusicPlayer();
  const track = TRACKS[trackIndex];
  const isActive = currentTrack === track.src;
  const playing = isActive && isPlaying;

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
    <section
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0">
        <div
          className={`relative aspect-square md:aspect-auto md:min-h-[280px] flex items-center justify-center overflow-hidden ${
            trackIndex === 0 ? "" : "anthem-cover-animate p-6"
          }`}
          style={{
            background: trackIndex === 0 ? undefined : "linear-gradient(145deg, #0a0a12 0%, #1a1a2e 40%, #2d1b4e 100%)",
          }}
        >
          <MusicTrackCover trackIndex={trackIndex} />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <span className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--color-cta1)" }}>
            {track.subtitle}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
            {track.title}
          </h3>
          <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>
            {track.desc[lang]}
          </p>

          <div className="flex items-center gap-4 mt-auto">
            <button
              type="button"
              onClick={() => playTrack(track.src)}
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
                  className="h-2 rounded-full cursor-pointer overflow-hidden"
                  style={{ background: "var(--color-border)" }}
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
                <div className="flex justify-between mt-1 text-xs" style={{ color: "var(--color-muted)" }}>
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
  if (trackIndex === 0) {
    return (
      <Image
        src="/assets/music-cursor-in-the-dark-cover.png"
        alt="Cursor In The Dark — cover"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 280px"
      />
    );
  }
  const id = `music-${trackIndex}`;
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full max-w-[200px] h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-grad1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#48e5ff" />
          <stop offset="50%" stopColor="#b289f9" />
          <stop offset="100%" stopColor="#f989b4" />
        </linearGradient>
        <linearGradient id={`${id}-grad2`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6E22F2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C752FF" stopOpacity="0.4" />
        </linearGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="100" cy="100" r="85" fill={`url(#${id}-grad2)`} opacity="0.12" />
      <circle cx="100" cy="100" r="70" fill="none" stroke={`url(#${id}-grad1)`} strokeWidth="1.5" opacity="0.35" />
      <circle cx="100" cy="100" r="50" fill="none" stroke={`url(#${id}-grad1)`} strokeWidth="1" opacity="0.25" />
      <g className="anthem-cursor-orbit" transform="translate(100, 79)" filter={`url(#${id}-glow)`}>
        <path d="M-10 -18 L10 2 L-2 6 L-14 -6 Z" fill={`url(#${id}-grad1)`} opacity="0.95" />
      </g>
      <g className="anthem-bracket-left" transform="translate(55, 102)">
        <text x="0" y="0" fill={`url(#${id}-grad1)`} fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="bold" opacity="0.85" textAnchor="middle" dominantBaseline="middle">
          {"{"}
        </text>
      </g>
      <g className="anthem-bracket-right" transform="translate(145, 102)">
        <text x="0" y="0" fill={`url(#${id}-grad1)`} fontSize="32" fontFamily="ui-monospace, monospace" fontWeight="bold" opacity="0.85" textAnchor="middle" dominantBaseline="middle">
          {"}"}
        </text>
      </g>
      {/* DE × RU — флаги */}
      <g transform="translate(65, 140)">
        <rect width="14" height="5" fill="#000" opacity="0.7" rx="1" />
        <rect y="5" width="14" height="5" fill="#DD0000" opacity="0.7" rx="1" />
        <rect y="10" width="14" height="5" fill="#FFCE00" opacity="0.7" rx="1" />
      </g>
      <text x="100" y="147.5" fill={`url(#${id}-grad1)`} fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" opacity="0.6">
        ×
      </text>
      <g transform="translate(121, 140)">
        <rect width="14" height="5" fill="#fff" opacity="0.6" rx="1" />
        <rect y="5" width="14" height="5" fill="#0039A6" opacity="0.7" rx="1" />
        <rect y="10" width="14" height="5" fill="#D52B1E" opacity="0.7" rx="1" />
      </g>
      <text x="100" y="185" fill={`url(#${id}-grad1)`} fontSize="16" fontWeight="800" textAnchor="middle" opacity="0.95" letterSpacing="3">
        PROD
      </text>
    </svg>
  );
}
