"use client";

import Image from "next/image";
import { useState } from "react";

function VideoPlayIcon({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${className}`}
      aria-hidden
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4, #FFBC6F)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="ml-1">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

const GALLERY_ITEMS = [
  {
    type: "image" as const,
    src: "/assets/OneTribe-Berlin.svg",
    alt: "OneTribe Berlin",
    title: "OneTribe Berlin",
    desc: "Berlin Edition",
  },
  {
    type: "video" as const,
    src: "/assets/merch-person-video.mp4",
    poster: "/assets/merch-person-logo.png",
    alt: "Man in OneTribe t-shirt",
    title: "Merch — Guy",
    desc: "OneTribe Berlin design on t-shirt via fal.ai",
  },
  {
    type: "video" as const,
    src: "/assets/merch-person-girl-video.mp4",
    poster: "/assets/merch-person-girl-logo.png",
    alt: "Woman in OneTribe t-shirt",
    title: "Merch — Girl",
    desc: "OneTribe Berlin design on t-shirt via fal.ai",
  },
];

export default function MerchGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mb-16">
      <div className="text-[13px] font-bold tracking-[3px] uppercase text-[#B289F9] mb-6">
        Gallery
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={i}
            className="group relative rounded-xl overflow-hidden border border-[#E6E6E6] bg-white hover:border-[#B289F9] transition-all duration-300 cursor-pointer"
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            <div className="aspect-[4/5] relative bg-white">
              {item.type === "video" ? (
                <>
                  <Image
                    src={item.poster!}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <VideoPlayIcon />
                </>
              ) : item.src.endsWith(".svg") ? (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-4">
              <div className="font-semibold text-[#1E1E1E] text-sm">{item.title}</div>
              <div className="text-xs text-[#808080] mt-0.5">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            {GALLERY_ITEMS[activeIndex]?.type === "video" ? (
              <video
                src={GALLERY_ITEMS[activeIndex].src}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] rounded-lg"
              />
            ) : (
              <img
                src={GALLERY_ITEMS[activeIndex]?.src}
                alt={GALLERY_ITEMS[activeIndex]?.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
