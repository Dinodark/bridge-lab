"use client";

import { useAnalyticsCount } from "@/hooks/useAnalyticsCount";

type CountType = "like" | "download" | "copy" | "play";

export function AnalyticsCountBadge({
  targetId,
  type,
  className = "",
}: {
  targetId: string;
  type: CountType;
  className?: string;
}) {
  const counts = useAnalyticsCount(targetId);
  const value = counts[type];

  return (
    <span
      className={className}
      style={{ color: "var(--color-muted)", fontSize: "0.75rem" }}
      title={`${type}: ${value}`}
    >
      {counts.loading ? "—" : value}
    </span>
  );
}
