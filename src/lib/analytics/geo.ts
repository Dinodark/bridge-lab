const CACHE = new Map<string, { country: string; city: string; expires: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const SKIP_IPS = new Set(["127.0.0.1", "::1", "localhost", "unknown"]);

export async function getGeoFromIp(ip: string): Promise<{ country: string; city: string }> {
  if (!ip || SKIP_IPS.has(ip)) {
    return { country: "", city: "" };
  }

  const cached = CACHE.get(ip);
  if (cached && cached.expires > Date.now()) {
    return { country: cached.country, city: cached.city };
  }

  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=country,city`,
      { signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) return { country: "", city: "" };
    const data = (await res.json()) as { country?: string; city?: string };
    const country = data.country ?? "";
    const city = data.city ?? "";
    CACHE.set(ip, { country, city, expires: Date.now() + CACHE_TTL_MS });
    return { country, city };
  } catch {
    return { country: "", city: "" };
  }
}
