"use client";

import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

type MusicPlayerContextValue = {
  currentTrack: string | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playTrack: (src: string) => void;
  togglePlay: () => void;
  seek: (pct: number) => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playTrack = useCallback((src: string) => {
    if (currentTrack === src) {
      const audio = audioRef.current;
      if (audio) {
        if (isPlaying) audio.pause();
        else audio.play();
        setIsPlaying(!isPlaying);
      }
      return;
    }
    const prev = audioRef.current;
    if (prev) {
      prev.pause();
      prev.src = "";
    }
    const audio = new Audio(src);
    audioRef.current = audio;
    setCurrentTrack(src);
    setProgress(0);
    setDuration(0);

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.play().then(() => setIsPlaying(true));

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrack, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  }, [currentTrack, isPlaying]);

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const t = Math.max(0, Math.min(1, pct)) * duration;
    audio.currentTime = t;
    setProgress(t);
  }, [duration]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const value: MusicPlayerContextValue = {
    currentTrack,
    isPlaying,
    progress,
    duration,
    playTrack,
    togglePlay,
    seek,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  return ctx;
}
