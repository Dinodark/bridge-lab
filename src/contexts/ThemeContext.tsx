"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type ThemeId = "onetribe" | "onebridge";

export const THEME_PALETTES = {
  onetribe: {
    accent1: "#48E5FF",
    accent2: "#B289F9",
    accent3: "#F989B4",
    accent4: "#FFBC6F",
    cta1: "#6E22F2",
    cta2: "#C752FF",
    gradient1: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4, #FFBC6F)",
    gradient2: "linear-gradient(135deg, #6E22F2, #C752FF)",
  },
  onebridge: {
    accent1: "#00D4AA",
    accent2: "#2563EB",
    accent3: "#F59E0B",
    accent4: "#10B981",
    cta1: "#0D9488",
    cta2: "#38BDF8",
    gradient1: "linear-gradient(135deg, #00D4AA, #2563EB, #F59E0B, #10B981)",
    gradient2: "linear-gradient(135deg, #0D9488, #38BDF8)",
  },
} as const;

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  palette: (typeof THEME_PALETTES)[ThemeId];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("onetribe");

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", t);
      try {
        localStorage.setItem("onebridge-theme", t);
      } catch (_) {}
    }
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("onebridge-theme") as ThemeId | null;
      if (stored && (stored === "onetribe" || stored === "onebridge")) {
        setThemeState(stored);
        document.documentElement.setAttribute("data-theme", stored);
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }
    } catch (_) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  const palette = THEME_PALETTES[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, palette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
