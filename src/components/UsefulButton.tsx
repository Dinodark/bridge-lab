"use client";

import { useState, useEffect } from "react";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { incrementLocalCount } from "@/hooks/useAnalyticsCount";
import { isLiked, setLiked } from "@/lib/analytics/likedStorage";
import FlameIcon from "@/components/icons/FlameIcon";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";

const CONTENT = {
  ru: { label: "Полезно", thanked: "Спасибо!" },
  de: { label: "Nützlich", thanked: "Danke!" },
} as const;

type UsefulButtonProps = {
  targetId: string;
  targetType?: string;
  className?: string;
};

export default function UsefulButton({ targetId, targetType = "section", className = "" }: UsefulButtonProps) {
  const { trackLike } = useAnalytics();
  const { lang } = useLanguage();
  const [liked, setLikedState] = useState(false);

  useEffect(() => {
    setLikedState(isLiked(targetId));
  }, [targetId]);

  const t = CONTENT[lang === "de" ? "de" : "ru"];

  const handleClick = () => {
    if (liked) return;
    trackLike(targetId, targetType);
    incrementLocalCount(targetId, "like");
    setLiked(targetId, true);
    setLikedState(true);
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={liked}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all disabled:cursor-default"
        style={{
          background: liked ? "rgba(16, 185, 129, 0.15)" : "var(--color-bg-active)",
          color: liked ? "#059669" : "var(--color-cta1)",
          border: liked ? "none" : "1px solid var(--color-border)",
        }}
        aria-pressed={liked}
      >
        {liked ? (
          <span>{t.thanked}</span>
        ) : (
          <>
            <FlameIcon filled size={18} />
            <span>{t.label}</span>
          </>
        )}
      </button>
      <AnalyticsCountBadge targetId={targetId} type="like" />
    </span>
  );
}
