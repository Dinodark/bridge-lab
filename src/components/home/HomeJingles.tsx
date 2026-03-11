"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useJingleCover } from "@/hooks/useJingleCover";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { incrementLocalCount, decrementLocalCount } from "@/hooks/useAnalyticsCount";
import { useLiked } from "@/hooks/useLiked";
import FlameIcon from "@/components/icons/FlameIcon";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";
import VisibilityBlock from "@/components/VisibilityBlock";

const LYRICS = `(Intro)
Yo, Tribe! Feuer unter dem Asphalt.
Огонь, бро. Let's go.

(Part 1)
Для кого-то просто палец вверх, для кого-то сердечко
Для нас это огонёчек, для нас это искра навечно
Разбуди этот Feuer, покажи что ты смелый
Это Tribe здесь не спят, здесь строят своё дело

(Part 2)
Was geht ab in der Tribe, das ist kein Zufall nein
Это движение слышишь, мы горим как один
Под асфальтом das Feuer, мы взрываем этот Tag
Kein Plan B, nur die Mission und ein kühner Schlag

Sie war Mom und Träumerin, jetzt ist sie Entrepreneur
Был потерян а heute zieht er zehn andere hinterher
Keine Filter, kein Fake, только правда в глазах
Такая Freiheit, Bruder, findet man nicht auf Instagram

(Chorus)
Мы Tribe, Feuer unterm Asphalt
Feuer, Feuer, под ногами жар
Keiner schläft hier, мы строим свой Trap
Свой мир, свой путь, это главный дар

Freiheit im Blut, Erfolg in der DNA
В крови, в ДНК, навсегда, навсегда
Zusammen unschlagbar, мы Tribe, oh yeah
Tribe, oh yeah, слышишь наш набат

(Part 3)
Warum guckst du noch zu, komm beweg dich los jetzt
Hier wird nicht gepostet, hier wird Action gesetzt
Wir sind raus aus dem System, wir machen Lärm und Sturm
Keine Grenzen, keine Bosse, только небо, только Turm

Stille Stimmen, Gänsehaut, всё реально на сто
Это связь крепче Zahlen, крепче чем просто
Fühlst du dass du anders bist, dann komm in den Kreis
Der Rest wird sich zeigen, keine Eile, kein Preis

(Chorus)
Мы Tribe, Feuer unterm Asphalt
В атаку, огонь, племя взяло старт
Keiner schläft hier, мы строим свой Trap
Свой мир, свою власть, это наша карта

Freiheit im Blut, Erfolg in der DNA
Горим как один, и иначе нельзя
Zusammen unschlagbar, мы Tribe, oh yeah
Tribe, oh yeah, огонь, бро, навсегда

(Outro)
One Tribe, Feuer
Огонь, огонёк
Feuer, Glut, Licht
Tribe, Tribe, oh yeah

Feuer unter dem Asphalt
Огонь, бро
Tribe`;

const JINGLE_FILES = [
  "Wir sind Tribe von Chris Wolten x Tribe (Mashup)-1.mp3",
  "Wir sind Tribe von Chris Wolten x Tribe (Mashup)-2.mp3",
  "Wir sind Tribe von Chris Wolten x Tribe (Mashup)-3.mp3",
  "Wir sind Tribe von Chris Wolten x Tribe (Mashup)-4.mp3",
];

const VOICE_FILES = [
  "One World One Tribe Bridge.flac",
  "50k+ creators Zero fake.flac",
  "All-in-one One price 99€.flac",
  "Real people Real connections.flac",
];

const VOICE_PHRASES = [
  { id: "one-world-tribe", name: "One World. One Tribe. Bridge.", text: "One World. One Tribe. Bridge." },
  { id: "50k-creators", name: "50k+ creators. Zero fake.", text: "50k+ creators. Zero fake." },
  { id: "all-in-one", name: "All-in-one. One price. 99€.", text: "All-in-one. One price. 99€." },
  { id: "real-people", name: "Real people. Real connections.", text: "Real people. Real connections." },
];

const VOICE_CARD_IMAGES = [
  "/assets/voice/voice-one-world-tribe-bridge.webp",
  "/assets/voice/voice-50k-creators-zero-fake.webp",
  "/assets/voice/voice-all-in-one-99.webp",
  "/assets/voice/voice-real-people-connections.webp",
];

const CONTENT = {
  ru: {
    title: "Звук Tribe",
    subtitle: "Джинглы для бренда. Wir sind Tribe.",
    voiceTitle: "Голосовые фразы",
    voiceSubtitle: "Озвученные слоганы для маркетинга.",
    jingles: [
      { id: "feuer-asphalt", name: "Feuer unter dem Asphalt", text: "Огонь, бро. Let's go." },
      { id: "ogon-bro", name: "Огонь, бро", text: "Огонь, огонёк. Feuer, Glut, Licht." },
      { id: "tribe-oh-yeah", name: "Tribe, oh yeah", text: "Zusammen unschlagbar, мы Tribe, oh yeah." },
      { id: "freiheit-blut", name: "Freiheit im Blut", text: "Erfolg in der DNA. Навсегда, навсегда." },
    ],
    fire: "Огонь",
    download: "Скачать",
    showFull: "Показать целиком",
    collapse: "Свернуть",
    copy: "Скопировать",
    copied: "Скопировано!",
  },
  de: {
    title: "Sound of Tribe",
    subtitle: "Jingles für die Marke. Wir sind Tribe.",
    voiceTitle: "Voice-Phrasen",
    voiceSubtitle: "Vertonte Slogans für Marketing.",
    jingles: [
      { id: "feuer-asphalt", name: "Feuer unter dem Asphalt", text: "Огонь, бро. Let's go." },
      { id: "ogon-bro", name: "Огонь, бро", text: "Огонь, огонёк. Feuer, Glut, Licht." },
      { id: "tribe-oh-yeah", name: "Tribe, oh yeah", text: "Zusammen unschlagbar, wir Tribe, oh yeah." },
      { id: "freiheit-blut", name: "Freiheit im Blut", text: "Erfolg in der DNA. Навсегда, навсегда." },
    ],
    fire: "Feuer",
    download: "Herunterladen",
    showFull: "Vollständig anzeigen",
    collapse: "Einklappen",
    copy: "Kopieren",
    copied: "Kopiert!",
  },
} as const;

function JingleCard({
  jingle,
  src,
  targetId,
  fireLabel,
  downloadLabel,
}: {
  jingle: { id: string; name: string; text: string };
  src: string;
  targetId: string;
  fireLabel: string;
  downloadLabel: string;
}) {
  const cover = useJingleCover(src);
  const { currentTrack, isPlaying, playTrack } = useMusicPlayer();
  const { trackLike, trackPlay, trackDownload } = useAnalytics();
  const [liked, setLikedState] = useLiked(targetId);
  const playing = currentTrack === src && isPlaying;

  const handlePlay = () => {
    if (!playing) {
      trackPlay(targetId, "audio", src);
      incrementLocalCount(targetId, "play");
    }
    playTrack(src);
  };

  const handleDownload = () => {
    trackDownload(targetId, "audio", src);
    incrementLocalCount(targetId, "download");
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !liked;
    if (next) {
      trackLike(targetId, "audio");
      incrementLocalCount(targetId, "like");
    } else {
      decrementLocalCount(targetId, "like");
    }
    setLikedState(next);
  };

  return (
    <article
      className="group relative rounded-2xl overflow-hidden aspect-[2/3] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ borderColor: "var(--color-border)", borderWidth: 1, borderStyle: "solid" }}
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0 bg-[var(--color-border)]/30">
        {cover ? (
          <img src={cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ color: "var(--color-muted)", fontSize: "0.75rem" }}>
            [Аудио]
          </div>
        )}
      </div>

      {/* Top gradient + text + play button */}
      <div
        className="absolute inset-x-0 top-0 pt-4 px-4 pb-4"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      >
        <span className="text-xs font-bold tracking-wider uppercase text-white/95" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
          {jingle.name}
        </span>
        <p className="text-sm mt-1 leading-relaxed text-white/95 line-clamp-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
          {jingle.text}
        </p>
        <button
          type="button"
          onClick={handlePlay}
          className="mt-3 flex items-center justify-center w-12 h-12 rounded-full transition-transform hover:scale-105 shadow-lg pointer-events-auto"
          style={{ background: "var(--color-cta1)", color: "#fff" }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom gradient + buttons */}
      <div
        className="absolute inset-x-0 bottom-0 pb-4 px-4 pt-16 flex items-center justify-between gap-2"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
        }}
      >
        <button
          type="button"
          onClick={toggleLike}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/30 transition-colors hover:opacity-90 pointer-events-auto"
          style={{
            background: liked ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)",
            color: "#fff",
          }}
          title={fireLabel}
        >
          <FlameIcon filled={liked} size={18} className={liked ? "" : "opacity-70"} />
          <span className="text-xs font-medium">{fireLabel}</span>
          <AnalyticsCountBadge targetId={targetId} type="like" className="text-xs text-white/90" />
        </button>
        <a
          href={src}
          download
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-90 pointer-events-auto"
          style={{ background: "var(--color-cta1)", color: "#fff" }}
        >
          {downloadLabel}
          <AnalyticsCountBadge targetId={targetId} type="download" className="text-xs opacity-90" />
        </a>
      </div>

    </article>
  );
}

function VoicePhraseCard({
  phrase,
  src,
  imageSrc,
  targetId,
  fireLabel,
  downloadLabel,
}: {
  phrase: { id: string; name: string; text: string };
  src: string;
  imageSrc: string;
  targetId: string;
  fireLabel: string;
  downloadLabel: string;
}) {
  const { currentTrack, isPlaying, playTrack } = useMusicPlayer();
  const { trackLike, trackPlay, trackDownload } = useAnalytics();
  const [liked, setLikedState] = useLiked(targetId);
  const playing = currentTrack === src && isPlaying;

  const handlePlay = () => {
    if (!playing) {
      trackPlay(targetId, "audio", src);
      incrementLocalCount(targetId, "play");
    }
    playTrack(src);
  };

  const handleDownload = () => {
    trackDownload(targetId, "audio", src);
    incrementLocalCount(targetId, "download");
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !liked;
    if (next) {
      trackLike(targetId, "audio");
      incrementLocalCount(targetId, "like");
    } else {
      decrementLocalCount(targetId, "like");
    }
    setLikedState(next);
  };

  return (
    <article
      className="group relative rounded-2xl overflow-hidden aspect-[2/3] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ borderColor: "var(--color-border)", borderWidth: 1, borderStyle: "solid" }}
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0 bg-[var(--color-border)]/30">
        <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Top gradient + text + play button */}
      <div
        className="absolute inset-x-0 top-0 pt-4 px-4 pb-4"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      >
        <span className="text-xs font-bold tracking-wider uppercase text-white/95" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
          {phrase.name}
        </span>
        <button
          type="button"
          onClick={handlePlay}
          className="mt-3 flex items-center justify-center w-12 h-12 rounded-full transition-transform hover:scale-105 shadow-lg pointer-events-auto"
          style={{ background: "var(--color-cta1)", color: "#fff" }}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Bottom gradient + buttons */}
      <div
        className="absolute inset-x-0 bottom-0 pb-4 px-4 pt-16 flex items-center justify-between gap-2"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
        }}
      >
        <button
          type="button"
          onClick={toggleLike}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/30 transition-colors hover:opacity-90 pointer-events-auto"
          style={{
            background: liked ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)",
            color: "#fff",
          }}
          title={fireLabel}
        >
          <FlameIcon filled={liked} size={18} className={liked ? "" : "opacity-70"} />
          <span className="text-xs font-medium">{fireLabel}</span>
          <AnalyticsCountBadge targetId={targetId} type="like" className="text-xs text-white/90" />
        </button>
        <a
          href={src}
          download
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-90 pointer-events-auto"
          style={{ background: "var(--color-cta1)", color: "#fff" }}
        >
          {downloadLabel}
          <AnalyticsCountBadge targetId={targetId} type="download" className="text-xs opacity-90" />
        </a>
      </div>
    </article>
  );
}

const LYRICS_TARGET_ID = "home-jingles-lyrics";

export default function HomeJingles() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { trackCopy, trackLike } = useAnalytics();
  const [liked, setLikedState] = useLiked(LYRICS_TARGET_ID);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText(LYRICS).then(() => {
      trackCopy(LYRICS_TARGET_ID, "lyrics", "full");
      incrementLocalCount(LYRICS_TARGET_ID, "copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [trackCopy]);

  const toggleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !liked;
    if (next) {
      trackLike(LYRICS_TARGET_ID, "lyrics");
      incrementLocalCount(LYRICS_TARGET_ID, "like");
    } else {
      decrementLocalCount(LYRICS_TARGET_ID, "like");
    }
    setLikedState(next);
  }, [liked, setLikedState, trackLike]);

  return (
    <section className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "var(--color-border)" }}>
      <div>
        <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-cta1)" }}>
          Audio
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "var(--color-text)" }}>
          {t.title}
        </h2>
        <p className="text-base mb-12 max-w-2xl" style={{ color: "var(--color-muted)" }}>
          {t.subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.jingles.map((jingle, i) => (
            <VisibilityBlock key={jingle.id} entityId={`jingle-${jingle.id}`}>
              <JingleCard
                jingle={jingle}
                src={`/Music/${encodeURIComponent(JINGLE_FILES[i])}`}
                targetId={`home-jingle-${jingle.id}`}
                fireLabel={t.fire}
                downloadLabel={t.download}
              />
            </VisibilityBlock>
          ))}
        </div>

        {/* Lyrics block */}
        <VisibilityBlock entityId="lyrics-home-jingles">
          <div
            className="mt-10 rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
          >
          <div className="relative">
            <div
              className="overflow-hidden px-5 py-4 whitespace-pre-wrap text-sm leading-relaxed"
              style={{
                maxHeight: expanded ? "none" : 150,
                color: "var(--color-text)",
              }}
            >
              {LYRICS}
            </div>
            {!expanded && (
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)",
                }}
              />
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-t" style={{ borderColor: "var(--color-border)" }}>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: "var(--color-cta1)", color: "#fff" }}
            >
              {expanded ? t.collapse : t.showFull}
            </button>
            <button
              type="button"
              onClick={toggleLike}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors hover:opacity-90"
              style={{
                borderColor: "var(--color-border)",
                background: liked ? "var(--color-bg-active)" : "transparent",
                color: "var(--color-text)",
              }}
            >
              <FlameIcon filled={liked} size={18} className={liked ? "" : "opacity-60"} />
              <span className="text-xs font-medium">{t.fire}</span>
              <AnalyticsCountBadge targetId={LYRICS_TARGET_ID} type="like" className="text-xs" />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors hover:opacity-90"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">{copied ? t.copied : t.copy}</span>
              {!copied && <AnalyticsCountBadge targetId={LYRICS_TARGET_ID} type="copy" className="text-xs" />}
            </button>
          </div>
        </div>
        </VisibilityBlock>

        {/* Voice phrases */}
        <div className="mt-16">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
            {t.voiceTitle}
          </h3>
          <p className="text-sm mb-6 max-w-2xl" style={{ color: "var(--color-muted)" }}>
            {t.voiceSubtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VOICE_PHRASES.map((phrase, i) => (
              <VisibilityBlock key={phrase.id} entityId={`voice-${phrase.id}`}>
                <VoicePhraseCard
                  phrase={phrase}
                  src={`/assets/voice/${encodeURIComponent(VOICE_FILES[i])}`}
                  imageSrc={VOICE_CARD_IMAGES[i]}
                  targetId={`home-voice-${phrase.id}`}
                  fireLabel={t.fire}
                  downloadLabel={t.download}
                />
              </VisibilityBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
