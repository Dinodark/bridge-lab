"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const CORE_GATE_AUTHED = "core-gate-authed";
const CORE_GATE_BANNED_UNTIL = "core-gate-banned-until";
const MAX_ATTEMPTS = 3;
const BAN_MINUTES = 15;

const GATE_CONFIG = {
  ru: {
    question: "Что делал слон, когда пришел Наполеон?",
    answer: "travkujeval",
    placeholder: "Ответ",
    submitLabel: "Войти",
    cancelLabel: "На главную",
    errorWrong: "Неверно. Осталось попыток:",
    errorBanned: "Подождите 15 минут. Слишком много попыток.",
    bannedTitle: "Доступ временно закрыт",
    bannedDesc: "Подождите 15 минут и попробуйте снова.",
    title: "Ядро",
    hint: "Ответ на вопрос — ключ к ядру идентичности проекта.",
    hintSub: "Ядро идентичности проекта",
  },
  de: {
    question: "Was verbindet die Community von Tribe?",
    answer: "feuer",
    placeholder: "Antwort",
    submitLabel: "Eintreten",
    cancelLabel: "Zur Startseite",
    errorWrong: "Falsch. Verbleibende Versuche:",
    errorBanned: "Bitte 15 Minuten warten. Zu viele Versuche.",
    bannedTitle: "Zugang vorübergehend gesperrt",
    bannedDesc: "Bitte warten Sie 15 Minuten und versuchen Sie es erneut.",
    title: "Kern",
    hint: "Die Antwort auf die Frage ist der Schlüssel zum Markenkern.",
    hintSub: "Kern der Identität des Projekts",
  },
} as const;

type CheckResult = { ok: boolean; banned: boolean; remaining: number };

type CoreGateContextValue = {
  isAuthed: boolean;
  isBanned: boolean;
  remainingAttempts: number;
  checkAnswer: (answer: string) => CheckResult;
  resetAttempts: () => void;
  setAuthed: () => void;
};

const CoreGateContext = createContext<CoreGateContextValue | null>(null);

export function CoreGateProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);

  useEffect(() => {
    try {
      const authed = localStorage.getItem(CORE_GATE_AUTHED);
      if (authed === "1" || authed === "true") {
        setIsAuthed(true);
      }
      const bannedUntil = localStorage.getItem(CORE_GATE_BANNED_UNTIL);
      if (bannedUntil) {
        const until = parseInt(bannedUntil, 10);
        if (Date.now() < until) {
          setIsBanned(true);
        } else {
          localStorage.removeItem(CORE_GATE_BANNED_UNTIL);
          setRemainingAttempts(MAX_ATTEMPTS);
        }
      }
    } catch (_) {}
  }, []);

  const setAuthed = useCallback(() => {
    setIsAuthed(true);
    try {
      localStorage.setItem(CORE_GATE_AUTHED, "1");
    } catch (_) {}
  }, []);

  const checkAnswer = useCallback((answer: string): CheckResult => {
    const config = GATE_CONFIG[lang];
    const normalized = answer.trim().toLowerCase();
    const correct = config.answer.toLowerCase();
    if (normalized === correct) {
      setAuthed();
      setRemainingAttempts(MAX_ATTEMPTS);
      return { ok: true, banned: false, remaining: MAX_ATTEMPTS };
    }
    const next = remainingAttempts - 1;
    setRemainingAttempts(next);
    if (next <= 0) {
      const until = Date.now() + BAN_MINUTES * 60 * 1000;
      try {
        localStorage.setItem(CORE_GATE_BANNED_UNTIL, String(until));
      } catch (_) {}
      setIsBanned(true);
      return { ok: false, banned: true, remaining: 0 };
    }
    return { ok: false, banned: false, remaining: next };
  }, [setAuthed, remainingAttempts]);

  const resetAttempts = useCallback(() => {
    setRemainingAttempts(MAX_ATTEMPTS);
  }, []);

  return (
    <CoreGateContext.Provider
      value={{
        isAuthed,
        isBanned,
        remainingAttempts,
        checkAnswer,
        resetAttempts,
        setAuthed,
      }}
    >
      {children}
    </CoreGateContext.Provider>
  );
}

export function useCoreGate() {
  const ctx = useContext(CoreGateContext);
  if (!ctx) throw new Error("useCoreGate must be used within CoreGateProvider");
  return ctx;
}

export { GATE_CONFIG };
