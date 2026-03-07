"use client";

import { createContext, useContext } from "react";

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
} as const;

type ThemeContextValue = {
  palette: (typeof THEME_PALETTES)["onetribe"];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const palette = THEME_PALETTES.onetribe;
  return (
    <ThemeContext.Provider value={{ palette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
