"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CONTENT = {
  ru: {
    title: "Вход",
    hint: "Пароль для управления видимостью блоков.",
    placeholder: "Пароль",
    submit: "Войти",
    cancel: "Отмена",
    errorEmpty: "Введите пароль",
    errorWrong: "Неверный пароль",
    errorNetwork: "Ошибка сети",
  },
  de: {
    title: "Anmelden",
    hint: "Passwort für die Sichtbarkeitssteuerung.",
    placeholder: "Passwort",
    submit: "Eintreten",
    cancel: "Abbrechen",
    errorEmpty: "Passwort eingeben",
    errorWrong: "Falsches Passwort",
    errorNetwork: "Netzwerkfehler",
  },
} as const;

export default function AdminLoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (!password.trim()) {
        setError(t.errorEmpty);
        return;
      }
      try {
        const res = await fetch("/api/dashboard/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: password.trim() }),
          credentials: "include",
        });
        const json = await res.json();
        if (json.ok) {
          setPassword("");
          onSuccess?.();
          onClose();
        } else {
          setError(json.error ?? t.errorWrong);
        }
      } catch {
        setError(t.errorNetwork);
      }
    },
    [password, onClose, onSuccess, t]
  );

  const handleClose = useCallback(() => {
    setPassword("");
    setError("");
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      <div
        className="rounded-2xl border p-8 max-w-sm mx-4 shadow-xl"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-2 text-center" style={{ color: "var(--color-text)" }}>
          {t.title}
        </h3>
        <p className="text-sm mb-6 text-center" style={{ color: "var(--color-muted)" }}>
          {t.hint}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder={t.placeholder}
            className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            autoFocus
          />
          {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full py-3 px-4 rounded-xl font-semibold text-white transition-colors"
            style={{ background: "var(--color-cta1)" }}
          >
            {t.submit}
          </button>
        </form>
        <button
          type="button"
          onClick={handleClose}
          className="mt-4 w-full py-2 text-sm transition-colors hover:opacity-80"
          style={{ color: "var(--color-muted)" }}
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
