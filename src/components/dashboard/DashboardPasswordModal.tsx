"use client";

import { useState, useCallback } from "react";

export default function DashboardPasswordModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (!password.trim()) {
        setError("Введите пароль");
        return;
      }
      try {
        const res = await fetch("/api/dashboard/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: password.trim() }),
        });
        const json = await res.json();
        if (json.ok) {
          setPassword("");
          onSuccess?.();
          onClose();
        } else {
          setError(json.error ?? "Неверный пароль");
        }
      } catch {
        setError("Ошибка сети");
      }
    },
    [password, onClose, onSuccess]
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
      aria-label="Вход в дашборд"
    >
      <div
        className="rounded-2xl border p-8 max-w-sm mx-4 shadow-xl"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-2 text-center" style={{ color: "var(--color-text)" }}>
          Вход в дашборд
        </h3>
        <p className="text-sm mb-6 text-center" style={{ color: "var(--color-muted)" }}>
          Введите пароль для доступа к аналитике.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Пароль"
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
            Войти
          </button>
        </form>
        <button
          type="button"
          onClick={handleClose}
          className="mt-4 w-full py-2 text-sm transition-colors hover:opacity-80"
          style={{ color: "var(--color-muted)" }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
}
