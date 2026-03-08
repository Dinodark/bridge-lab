/**
 * Analytics service — очередь событий, персист в localStorage, отправка в API когда БД готова.
 */

import type { AnalyticsEvent } from "./types";

const STORAGE_KEY = "bridge-analytics-queue";
const MAX_QUEUE = 500;
const BATCH_SIZE = 50;
const API_ENDPOINT = "/api/analytics";

function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isBot(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  const botPatterns = [
    "bot",
    "crawler",
    "spider",
    "headless",
    "phantom",
    "selenium",
    "puppeteer",
    "curl",
    "wget",
    "googlebot",
    "bingbot",
    "yandexbot",
  ];
  return botPatterns.some((p) => ua.includes(p));
}

function getBasePayload(): Partial<AnalyticsEvent> & { isBot?: boolean } {
  if (typeof window === "undefined") return {};
  return {
    id: uuid(),
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    userAgent: navigator.userAgent,
    language: navigator.language,
    screen: { w: window.screen?.width ?? 0, h: window.screen?.height ?? 0 },
    isBot: isBot(),
  };
}

function loadQueue(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveQueue(queue: AnalyticsEvent[]): void {
  try {
    const trimmed = queue.slice(-MAX_QUEUE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

let pageLoadTime: number | null = null;

export function initPageTime(): void {
  if (typeof performance !== "undefined") {
    pageLoadTime = performance.now();
  }
}

export function getTimeOnPage(): number | undefined {
  if (pageLoadTime == null || typeof performance === "undefined") return undefined;
  return Math.round(performance.now() - pageLoadTime);
}

export function createEvent<T extends AnalyticsEvent>(
  type: T["type"],
  payload: Omit<T, "id" | "timestamp" | "path" | "referrer" | "userAgent" | "language" | "screen">
): T {
  const base = getBasePayload();
  const timeOnPage = getTimeOnPage();
  return {
    ...base,
    ...payload,
    type,
    timeOnPage,
  } as T;
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const queue = loadQueue();
  queue.push(event);
  saveQueue(queue);
  // Пытаемся отправить батч (когда API будет готово)
  flushQueue();
}

export async function flushQueue(): Promise<void> {
  if (typeof window === "undefined") return;
  const queue = loadQueue();
  if (queue.length === 0) return;
  const batch = queue.slice(0, BATCH_SIZE);
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: batch }),
    });
    if (res.ok) {
      const remaining = queue.slice(BATCH_SIZE);
      saveQueue(remaining);
    }
  } catch {
    // API ещё нет или сеть — оставляем в очереди
  }
}

export function getQueueLength(): number {
  return loadQueue().length;
}

/** Сброс очереди при уходе со страницы */
export function setupUnloadFlush(): void {
  if (typeof window === "undefined") return;
  const flush = () => {
    const batch = loadQueue().slice(0, BATCH_SIZE);
    if (batch.length > 0 && navigator.sendBeacon) {
      navigator.sendBeacon(
        window.location.origin + API_ENDPOINT,
        new Blob([JSON.stringify({ events: batch })], { type: "application/json" })
      );
    }
  };
  window.addEventListener("beforeunload", flush);
  window.addEventListener("pagehide", flush);
}

export { isBot };
