"use client";

import { useState, useCallback } from "react";

type Props = {
  imageSrc: string;
  videoSrc: string;
  className?: string;
};

export default function InteractiveWallpaperCard({ imageSrc, videoSrc, className = "" }: Props) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openFullscreen = useCallback(() => {
    setFullscreenOpen(true);
    setVideoLoading(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenOpen(false);
    setVideoLoading(true);
  }, []);

  return (
    <>
      {fullscreenOpen && (
        <button
          type="button"
          onClick={closeFullscreen}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 focus:outline-none"
          aria-label="Закрыть"
        >
          <video
            src={videoSrc}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setVideoLoading(false)}
            onCanPlayThrough={() => setVideoLoading(false)}
            onWaiting={() => setVideoLoading(true)}
          />
          {videoLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden
            >
              <div className="visual-fullscreen-loader">
                <div className="visual-fullscreen-loader__circle" />
                <div className="visual-fullscreen-loader__radar" />
              </div>
            </div>
          )}
        </button>
      )}

      <button
        type="button"
        onClick={openFullscreen}
        className={`group rounded-xl overflow-hidden w-full flex items-center justify-center bg-[var(--color-border)]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-cta1)] cursor-zoom-in relative aspect-[9/17] ${className}`}
        style={{ padding: 0, border: "none" }}
        aria-label="Открыть на весь экран"
      >
        <video
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
        />
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
      </button>
    </>
  );
}
