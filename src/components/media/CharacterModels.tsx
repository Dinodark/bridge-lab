"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { incrementLocalCount, decrementLocalCount } from "@/hooks/useAnalyticsCount";
import { isLiked, setLiked } from "@/lib/analytics/likedStorage";
import { T } from "@/app/media/translations";
import FlameIcon from "@/components/icons/FlameIcon";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";

const DYNAMIC_FACTORS = [0.9, 0.7];

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
  targetId,
  title,
  likeLabel,
  likedLabel,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  onLike: () => void;
  liked: boolean;
  targetId?: string;
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
        className="rounded-2xl border p-8 max-w-sm mx-4 shadow-xl"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: "var(--color-text)" }}>{title}</h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          {targetId && <AnalyticsCountBadge targetId={targetId} type="like" />}
        </div>
        <button
          type="button"
          onClick={onLike}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-colors bg-[var(--color-cta1)]/20 border-[var(--color-cta1)]/40 hover:bg-[var(--color-cta1)]/30"
          style={{ color: "var(--color-cta1)" }}
        >
          <FlameIcon filled={liked} size={24} />
          <span className="font-medium">{liked ? likedLabel : likeLabel}</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2 text-sm transition-colors hover:opacity-80"
          style={{ color: "var(--color-muted)" }}
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

export default function CharacterModels() {
  const { lang } = useLanguage();
  const { trackLike } = useAnalytics();
  const t = T[lang];
  const [popupOpen, setPopupOpen] = useState<string | null>(null);
  const [popupLiked, setPopupLiked] = useState<Record<string, boolean>>(() => {
    const r: Record<string, boolean> = {};
    MODELS.forEach((m) => {
      r[m.id] = isLiked(m.id);
    });
    return r;
  });
  const [scrollScales, setScrollScales] = useState<number[]>(() => MODELS.map(() => 1));
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>(() => MODELS.map(() => 0));
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastUpdate = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      if (now - lastUpdate.current < 100) return;
      lastUpdate.current = now;
      const section = sectionRef.current;
      const rect = section?.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect ? rect.top + rect.height / 2 : viewportCenter;
      const distance = sectionCenter - viewportCenter;
      const baseDelay = 400;
      const scaleRaw = Math.max(0, (window.scrollY - baseDelay) / 800);
      const scalePhase = Math.min(1, scaleRaw);
      const eased = scalePhase < 0.5 ? 4 * scalePhase * scalePhase * scalePhase : 1 - Math.pow(-2 * scalePhase + 2, 3) / 2;
      const scales = MODELS.map((_, i) => 1 + eased * 0.35 * DYNAMIC_FACTORS[i % DYNAMIC_FACTORS.length]);
      setScrollScales(scales);
      setParallaxOffsets(
        MODELS.map((_, i) => {
          const baseFactor = (i % 7) - 3;
          const dyn = DYNAMIC_FACTORS[i % DYNAMIC_FACTORS.length];
          const scaleInfluence = scales[i] - 1;
          return distance * 0.04 * baseFactor * dyn * scaleInfluence;
        })
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const modelsWithText = MODELS.map((m, i) => ({
    ...m,
    name: t[MODEL_KEYS[i]],
    description: t[MODEL_DESC_KEYS[i]],
  }));

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="max-w-content mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
            {t.characterModels}
          </h2>
          <p className="max-w-2xl" style={{ color: "var(--color-muted)" }}>
            {t.characterModelsDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {modelsWithText.map((model, i) => (
            <div
              key={model.id}
              className="group rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-300 hover:border-[var(--color-cta1)]/40 hover:shadow-[0_0_32px_rgba(110,34,242,0.12)]"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-56 flex-shrink-0 aspect-[3/4] overflow-hidden">
                  <div
                    className="absolute inset-0 will-change-transform"
                    style={{
                      transform: `translateY(${parallaxOffsets[i] ?? 0}px) scale(${scrollScales[i] ?? 1})`,
                      transition: "transform 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, 224px"
                      />
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-md text-white text-xs font-medium" style={{ backgroundColor: "var(--color-cta1)" }}>
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
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>{model.name}</h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: "var(--color-muted)" }}>{model.description}</p>
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--color-muted)" }}>
                      {t.triggers}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {model.triggers.map((t) => (
                        <code
                          key={t}
                          className="px-2 py-1 rounded text-xs font-mono"
                          style={{ backgroundColor: "color-mix(in srgb, var(--color-cta1) 15%, transparent)", color: "var(--color-cta1)" }}
                        >
                          {t}
                        </code>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPopupOpen(model.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all btn-gradient-glow"
                    style={{ background: "var(--color-gradient2)" }}
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

        <p className="mt-8 text-sm text-center" style={{ color: "var(--color-muted)" }}>
          {t.comingSoon}
        </p>

        {popupOpen && (
          <LikePopup
            open={!!popupOpen}
            onClose={() => setPopupOpen(null)}
            onLike={() => {
              const id = popupOpen;
              const next = !popupLiked[id];
              if (next) {
                trackLike(id, "media");
                incrementLocalCount(id, "like");
              } else {
                decrementLocalCount(id, "like");
              }
              setLiked(id, next);
              setPopupLiked((p) => ({ ...p, [id]: next }));
            }}
            liked={!!popupLiked[popupOpen]}
            targetId={popupOpen}
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
