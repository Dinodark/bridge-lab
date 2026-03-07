"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Lang = "ru" | "de";

const LANG_KEY = "bridge-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === "de") {
        setLangState("de");
        document.documentElement.lang = "de";
      }
    } catch (_) {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "de" ? "de" : "ru";
      try {
        localStorage.setItem(LANG_KEY, l);
      } catch (_) {}
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
