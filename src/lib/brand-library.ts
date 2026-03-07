/**
 * Brand Library — OneTribe / OneBridge
 * Константы бренда, параметры Void-анимации, иконки тем
 */

// ============================================================
// BRAND COLORS (OneTribe)
// ============================================================
export const BRAND_COLORS = {
  cyan: "#48e5ff",
  purple: "#b289f9",
  pink: "#f989b4",
  orange: "#ffbc6f",
  deepPurple: "#6e22f2",
  brightPurple: "#c752ff",
} as const;

export const BRAND_COLORS_RGBA = [
  "rgba(72,229,255,",   // cyan
  "rgba(178,137,249,",  // purple
  "rgba(249,137,180,",  // pink
  "rgba(255,188,111,",  // orange
] as const;

// ============================================================
// VOID THEME — параметры анимации
// ============================================================
export const VOID_ANIMATION = {
  canvas: { width: 280, height: 280, cx: 140, cy: 140 },
  rings: {
    outer: { r: 55, lineWBase: 1.8, lineWAmp: 0.8, scaleAmp: 0.06 },
    inner: { r: 32, lineWBase: 1.4, lineWAmp: 0.7, scaleAmp: 0.07 },
  },
  gradientRings: {
    rBase: 42,
    squashAmp: 0.24,
    ramp: { max: 1.85, decay: 0.04 },
  },
  centeredCircle: { r: 14 },
  orbitingBalls: { rx: 68, ry: 24, speed: 4.2, trailSteps: 24, trailStep: 0.18 },
  centerDot: { r: 14, speed: 19.5 },
} as const;

// ============================================================
// THEME KEYS
// ============================================================
export const THEME_KEYS = ["fire", "water", "earth", "cosmos", "storm", "void"] as const;
export type ThemeKey = (typeof THEME_KEYS)[number];
