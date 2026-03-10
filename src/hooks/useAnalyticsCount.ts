"use client";

import { useState, useEffect, useCallback } from "react";

export type Counts = { like: number; download: number; copy: number; play: number };

const cache = new Map<string, Counts>();
const pending = new Map<string, Promise<Counts>>();
const subscribers = new Map<string, Set<() => void>>();

function notify(targetId: string) {
  subscribers.get(targetId)?.forEach((cb) => cb());
}

async function fetchCounts(ids: string[]): Promise<Record<string, Counts>> {
  if (ids.length === 0) return {};
  const idsParam = [...new Set(ids)].join(",");
  const res = await fetch(`/api/analytics/counts?ids=${encodeURIComponent(idsParam)}`);
  if (!res.ok) return {};
  const { counts } = await res.json();
  return counts ?? {};
}

async function fetchCount(targetId: string): Promise<Counts> {
  const existing = pending.get(targetId);
  if (existing) return existing;

  const promise = (async () => {
    const batch = [targetId];
    const data = await fetchCounts(batch);
    const c = data[targetId] ?? { like: 0, download: 0, copy: 0, play: 0 };
    cache.set(targetId, c);
    pending.delete(targetId);
    notify(targetId);
    return c;
  })();
  pending.set(targetId, promise);
  return promise;
}

export function useAnalyticsCount(targetId: string | undefined) {
  const [counts, setCounts] = useState<Counts>(() =>
    targetId ? cache.get(targetId) ?? { like: 0, download: 0, copy: 0, play: 0 } : { like: 0, download: 0, copy: 0, play: 0 }
  );
  const [loading, setLoading] = useState(true);

  const update = useCallback(() => {
    if (targetId) {
      const c = cache.get(targetId);
      if (c) setCounts(c);
    }
  }, [targetId]);

  useEffect(() => {
    if (!targetId) {
      setLoading(false);
      return;
    }

    const cached = cache.get(targetId);
    if (cached) {
      setCounts(cached);
      setLoading(false);
      return;
    }

    const sub = () => {
      const c = cache.get(targetId);
      if (c) setCounts(c);
      setLoading(false);
    };
    if (!subscribers.has(targetId)) subscribers.set(targetId, new Set());
    subscribers.get(targetId)!.add(sub);

    fetchCount(targetId).then((c) => {
      setCounts(c);
      setLoading(false);
    });

    return () => {
      subscribers.get(targetId)?.delete(sub);
    };
  }, [targetId]);

  return { ...counts, loading };
}

export function incrementLocalCount(targetId: string, type: keyof Counts) {
  const c = cache.get(targetId) ?? { like: 0, download: 0, copy: 0, play: 0 };
  c[type]++;
  cache.set(targetId, c);
  notify(targetId);
}

export function decrementLocalCount(targetId: string, type: keyof Counts) {
  const c = cache.get(targetId) ?? { like: 0, download: 0, copy: 0, play: 0 };
  if (c[type] > 0) c[type]--;
  cache.set(targetId, c);
  notify(targetId);
}
