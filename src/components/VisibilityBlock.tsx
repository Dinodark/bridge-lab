"use client";

import { useVisibility } from "@/hooks/useVisibility";
import { useAdmin } from "@/contexts/AdminContext";
import VisibilityToggleButton from "./VisibilityToggleButton";

export default function VisibilityBlock({
  entityId,
  children,
  className = "",
}: {
  entityId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { isAdmin } = useAdmin();
  const { visibility, isLoading } = useVisibility(entityId);

  if (!isLoading && visibility === "draft" && !isAdmin) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {children}
      {isAdmin && (
        <div
          className="absolute top-2 right-2 z-10"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          <VisibilityToggleButton entityId={entityId} />
        </div>
      )}
    </div>
  );
}
