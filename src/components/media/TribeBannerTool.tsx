"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";
import { LikePopup } from "./CharacterModels";

export default function TribeBannerTool() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupLiked, setPopupLiked] = useState(false);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {t.tribeBannerTool}
          </h2>
          <p className="text-white/70 max-w-2xl">
            {t.tribeBannerToolDesc}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="relative aspect-[4/3] max-w-md mx-auto">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full text-violet-400/60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="20" y="20" width="120" height="80" rx="8" className="text-violet-500/40" />
                  <rect x="260" y="20" width="120" height="80" rx="8" className="text-violet-500/40" />
                  <rect x="140" y="110" width="120" height="80" rx="8" className="text-violet-500/60" />
                  <rect x="20" y="200" width="120" height="80" rx="8" className="text-violet-500/40" />
                  <rect x="260" y="200" width="120" height="80" rx="8" className="text-violet-500/40" />
                  <path d="M140 80 L140 110" strokeDasharray="4 4" />
                  <path d="M200 150 L260 150" strokeDasharray="4 4" />
                  <path d="M140 190 L140 200" strokeDasharray="4 4" />
                  <path d="M80 110 L140 110" strokeDasharray="4 4" />
                  <path d="M260 110 L260 150" strokeDasharray="4 4" />
                  <text x="80" y="65" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Banner</text>
                  <text x="320" y="65" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Анонс</text>
                  <text x="200" y="155" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">Event</text>
                  <text x="80" y="245" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Соцсети</text>
                  <text x="320" y="245" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Презентация</text>
                </svg>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-start justify-center">
              <p className="text-white/60 text-sm mb-6 text-center lg:text-left">
                {t.bannerPlaceholder}
              </p>
              <button
                type="button"
                onClick={() => setPopupOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-500 hover:to-purple-500 transition-all btn-gradient-glow"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t.makeEventBanner}
              </button>
            </div>
          </div>
        </div>

        {popupOpen && (
          <LikePopup
            open={popupOpen}
            onClose={() => setPopupOpen(false)}
            onLike={() => setPopupLiked((p) => !p)}
            liked={popupLiked}
            title={t.likeThis}
            likeLabel={t.like}
            likedLabel={t.liked}
            closeLabel={t.close}
          />
        )}
      </div>
    </section>
  );
}
