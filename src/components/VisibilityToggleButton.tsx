"use client";

import { useVisibility } from "@/hooks/useVisibility";
import { useAdmin } from "@/contexts/AdminContext";
import { DraftIcon, PublishedIcon, PrivateIcon } from "@/components/icons/VisibilityIcons";
import type { VisibilityStatus } from "@/hooks/useVisibility";

function IconForStatus({ status }: { status: VisibilityStatus }) {
  switch (status) {
    case "draft":
      return <DraftIcon size={16} />;
    case "published":
      return <PublishedIcon size={16} />;
    case "private":
      return <PrivateIcon size={16} />;
  }
}

export default function VisibilityToggleButton({ entityId }: { entityId: string }) {
  const { isAdmin } = useAdmin();
  const { visibility, cycleNext, isLoading } = useVisibility(entityId);

  if (!isAdmin) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        cycleNext();
      }}
      disabled={isLoading}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors hover:opacity-90 shrink-0"
      style={{
        borderColor: "var(--color-border)",
        background: "var(--color-bg-active)",
        color: "var(--color-cta1)",
      }}
      title={
        visibility === "draft"
          ? "В разработке"
          : visibility === "published"
            ? "Опубликовано"
            : "Приватно"
      }
      aria-label={visibility}
    >
      <IconForStatus status={visibility} />
    </button>
  );
}
