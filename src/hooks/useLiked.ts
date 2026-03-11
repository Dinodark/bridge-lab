"use client";

import { useState, useEffect, useCallback } from "react";
import { isLiked as getLiked, setLiked as persistLiked } from "@/lib/analytics/likedStorage";

/**
 * SSR-safe liked state. Always false on server, synced from localStorage after mount.
 */
export function useLiked(targetId: string): [boolean, (value: boolean) => void] {
  const [liked, setLikedState] = useState(false);

  useEffect(() => {
    setLikedState(getLiked(targetId));
  }, [targetId]);

  const setLiked = useCallback(
    (value: boolean) => {
      persistLiked(targetId, value);
      setLikedState(value);
    },
    [targetId]
  );

  return [liked, setLiked];
}
