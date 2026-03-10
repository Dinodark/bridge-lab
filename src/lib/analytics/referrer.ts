export function parseSearchQueryFromReferrer(referrer: string | undefined): string | null {
  if (!referrer || typeof referrer !== "string") return null;
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    if (host.includes("google.")) return url.searchParams.get("q");
    if (host.includes("yandex.")) return url.searchParams.get("text");
    if (host.includes("bing.")) return url.searchParams.get("q");
    if (host.includes("duckduckgo.")) return url.searchParams.get("q");
    return null;
  } catch {
    return null;
  }
}
