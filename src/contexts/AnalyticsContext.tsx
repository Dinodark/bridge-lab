"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  track,
  createEvent,
  initPageTime,
  setupUnloadFlush,
} from "@/lib/analytics/service";
import type { AnalyticsEvent, AnalyticsEventType } from "@/lib/analytics/types";

type TrackClickOptions = {
  target?: string;
  text?: string;
  href?: string;
  coords?: { x: number; y: number };
};

type TrackOptions = Record<string, unknown>;

const AnalyticsContext = createContext<{
  track: (event: AnalyticsEvent) => void;
  trackClick: (options?: TrackClickOptions) => void;
  trackLike: (targetId?: string, targetType?: string) => void;
  trackShare: (shareTarget?: string, method?: string) => void;
  trackSearch: (query?: string, resultsCount?: number) => void;
  trackInput: (field?: string, length?: number) => void;
  trackCustom: (type: string, payload?: TrackOptions) => void;
} | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  const trackEvent = useCallback((event: AnalyticsEvent) => {
    track(event);
  }, []);

  const trackClick = useCallback(
    (options?: TrackClickOptions) => {
      track(
        createEvent("click", {
          ...options,
          // Бот-флаг можно добавить в payload при отправке на сервер
        })
      );
    },
    []
  );

  const trackLike = useCallback((targetId?: string, targetType?: string) => {
    track(
      createEvent("like", {
        targetId,
        targetType,
      })
    );
  }, []);

  const trackShare = useCallback((shareTarget?: string, method?: string) => {
    track(
      createEvent("share", {
        shareTarget,
        method,
      })
    );
  }, []);

  const trackSearch = useCallback((query?: string, resultsCount?: number) => {
    track(
      createEvent("search", {
        query,
        resultsCount,
      })
    );
  }, []);

  const trackInput = useCallback((field?: string, length?: number) => {
    track(
      createEvent("input", {
        field,
        length,
      })
    );
  }, []);

  const trackCustom = useCallback(
    (type: string, payload?: TrackOptions) => {
      track(
        createEvent(type as AnalyticsEventType, {
          ...payload,
        })
      );
    },
    []
  );

  useEffect(() => {
    setupUnloadFlush();
  }, []);

  // Page view при смене роута
  useEffect(() => {
    if (pathname && pathname !== prevPathRef.current) {
      initPageTime();
      prevPathRef.current = pathname;
      track(
        createEvent("page_view", {
          path: pathname,
          title: typeof document !== "undefined" ? document.title : undefined,
        })
      );
    }
  }, [pathname]);

  // Глобальный клик-листенер (делегирование)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const analyticsId = target.closest("[data-analytics-id]")?.getAttribute("data-analytics-id");
      const href = target.closest("a")?.href;
      const text = target.closest("a, button")?.textContent?.slice(0, 100);
      trackClick({
        target: analyticsId || target.tagName + (target.className ? "." + String(target.className).split(" ")[0] : ""),
        text: text || undefined,
        href: href || undefined,
        coords: { x: e.clientX, y: e.clientY },
      });
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick);
  }, [trackClick]);

  return (
    <AnalyticsContext.Provider
      value={{
        track: trackEvent,
        trackClick,
        trackLike,
        trackShare,
        trackSearch,
        trackInput,
        trackCustom,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    return {
      track: () => {},
      trackClick: () => {},
      trackLike: () => {},
      trackShare: () => {},
      trackSearch: () => {},
      trackInput: () => {},
      trackCustom: () => {},
    };
  }
  return ctx;
}
