"use client";

import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

export const ANTHEM_TRACK_PATH = `/Music/${encodeURIComponent("PROD (Lounge Edition) — Cursor In The Dark.mp3")}`;

type AnthemPlayerContextValue = {
  isPlaying: boolean;
  togglePlay: () => void;
  progress: number;
  duration: number;
  seek: (pct: number) => void;
};

const AnthemPlayerContext = createContext<AnthemPlayerContextValue | null>(null);

export function AnthemPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const t = Math.max(0, Math.min(1, pct)) * duration;
    audio.currentTime = t;
    setProgress(t);
  }, [duration]);

  useEffect(() => {
    const audio = new Audio(ANTHEM_TRACK_PATH);
    audioRef.current = audio;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, []);

  const value: AnthemPlayerContextValue = {
    isPlaying,
    togglePlay,
    progress,
    duration,
    seek,
  };

  return (
    <AnthemPlayerContext.Provider value={value}>
      {children}
    </AnthemPlayerContext.Provider>
  );
}

export function useAnthemPlayer() {
  const ctx = useContext(AnthemPlayerContext);
  if (!ctx) throw new Error("useAnthemPlayer must be used within AnthemPlayerProvider");
  return ctx;
}
