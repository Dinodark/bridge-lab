"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "@/app/media/translations";

interface LoRAModel {
  id: string;
  name: string;
  description: string;
  triggers: string[];
  image: string;
  link?: string;
}

const MODELS: Omit<LoRAModel, "name" | "description">[] = [
  {
    id: "1",
    triggers: ["souly"],
    image: "/souly/0aeptxz9jxrmw0cw7wrbf0std8.webp",
    link: "#",
  },
  {
    id: "2",
    triggers: ["marvinstbrg", "Marv"],
    image: "/marvin/image_QvXSp9gP_1772851450906_raw.jpg",
    link: "#",
  },
];

const MODEL_KEYS = ["modelSouly", "modelMarv"] as const;
const MODEL_DESC_KEYS = ["modelSoulyDesc", "modelMarvDesc"] as const;

export function LikePopup({
  open,
  onClose,
  onLike,
  liked,
  title,
  likeLabel,
  likedLabel,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  onLike: () => void;
  liked: boolean;
  title: string;
  likeLabel: string;
  likedLabel: string;
  closeLabel: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl border border-white/20 bg-[#1a1330] p-8 max-w-sm mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-white mb-4 text-center">{title}</h3>
        <button
          type="button"
          onClick={onLike}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-violet-600/20 border border-violet-400/30 text-violet-300 hover:bg-violet-600/30 transition-colors"
        >
          <svg
            className={`w-6 h-6 ${liked ? "text-rose-400 fill-rose-400" : "text-white/60"}`}
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="font-medium">{liked ? likedLabel : likeLabel}</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2 text-white/60 hover:text-white text-sm"
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

export default function CharacterModels() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [popupOpen, setPopupOpen] = useState<string | null>(null);
  const [popupLiked, setPopupLiked] = useState<Record<string, boolean>>({});

  const modelsWithText = MODELS.map((m, i) => ({
    ...m,
    name: t[MODEL_KEYS[i]],
    description: t[MODEL_DESC_KEYS[i]],
  }));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {t.characterModels}
          </h2>
          <p className="text-white/70 max-w-2xl">
            {t.characterModelsDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {modelsWithText.map((model) => (
            <div
              key={model.id}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:border-violet-400/30 hover:shadow-[0_0_32px_rgba(139,92,246,0.2)]"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-56 flex-shrink-0 aspect-[3/4] sm:aspect-square">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-violet-600/80 text-white text-xs font-medium">
                    FLUX LoRA
                  </div>
                  <a
                    href="https://replicate.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                    aria-label="Replicate"
                  >
                    <img
                      src="https://unpkg.com/@lobehub/icons-static-svg@latest/icons/replicate.svg"
                      alt="Replicate"
                      width={20}
                      height={20}
                      className="opacity-90"
                    />
                  </a>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                  <p className="text-white/80 text-sm mb-4 flex-1">{model.description}</p>
                  <div className="mb-4">
                    <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">
                      {t.triggers}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {model.triggers.map((t) => (
                        <code
                          key={t}
                          className="px-2 py-1 rounded bg-white/10 text-violet-300 text-xs font-mono"
                        >
                          {t}
                        </code>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPopupOpen(model.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium hover:from-violet-500 hover:to-purple-500 transition-all btn-gradient-glow"
                  >
                    <span>{t.tryIt}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-white/50 text-sm text-center">
          {t.comingSoon}
        </p>

        {popupOpen && (
          <LikePopup
            open={!!popupOpen}
            onClose={() => setPopupOpen(null)}
            onLike={() => setPopupLiked((p) => ({ ...p, [popupOpen]: !p[popupOpen] }))}
            liked={!!popupLiked[popupOpen]}
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
