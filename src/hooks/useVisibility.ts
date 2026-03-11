"use client";

import { useState, useCallback, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";

export type VisibilityStatus = "draft" | "published" | "private";

const NEXT_STATUS: Record<VisibilityStatus, VisibilityStatus> = {
  draft: "published",
  published: "private",
  private: "draft",
};

export function useVisibility(entityId: string) {
  const { isAdmin } = useAdmin();
  const [visibility, setVisibilityState] = useState<VisibilityStatus>("published");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchVisibility() {
      try {
        const res = await fetch(`/api/visibility?ids=${encodeURIComponent(entityId)}`);
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as Record<string, VisibilityStatus>;
        if (!cancelled && data[entityId]) {
          setVisibilityState(data[entityId]);
        }
      } catch {
        // keep default published
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchVisibility();
    return () => { cancelled = true; };
  }, [entityId]);

  const setVisibility = useCallback(
    async (next: VisibilityStatus) => {
      if (!isAdmin) return;
      setVisibilityState(next);
      try {
        await fetch("/api/visibility", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id: entityId, visibility: next }),
        });
      } catch {
        setVisibilityState(visibility);
      }
    },
    [entityId, isAdmin, visibility]
  );

  const cycleNext = useCallback(() => {
    const next = NEXT_STATUS[visibility];
    setVisibility(next);
  }, [visibility, setVisibility]);

  return { visibility, setVisibility, cycleNext, isLoading };
}
