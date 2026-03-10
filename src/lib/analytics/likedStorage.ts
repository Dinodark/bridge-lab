/**
 * Персистентные лайки в localStorage.
 * Ключ: bridge-liked — JSON { [targetId]: true }
 */

const STORAGE_KEY = "bridge-liked";

export function getLikedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const obj = JSON.parse(raw) as Record<string, boolean>;
    return new Set(Object.keys(obj).filter((k) => obj[k] === true));
  } catch {
    return new Set();
  }
}

export function isLiked(targetId: string): boolean {
  return getLikedSet().has(targetId);
}

export function setLiked(targetId: string, liked: boolean): void {
  if (typeof window === "undefined") return;
  try {
    const set = getLikedSet();
    if (liked) set.add(targetId);
    else set.delete(targetId);
    const obj: Record<string, boolean> = {};
    set.forEach((id) => (obj[id] = true));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // ignore
  }
}
