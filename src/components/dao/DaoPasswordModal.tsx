"use client";

import { useState, useCallback } from "react";

const VALID_PASSWORDS = (
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_DAO_PASSWORDS
    ? process.env.NEXT_PUBLIC_DAO_PASSWORDS.split(",").map((p) => p.trim())
    : ["tribe", "dao"]
).filter(Boolean);

export default function DaoPasswordModal({
  open,
  onClose,
  onSuccess,
  title = "Вход в систему",
  hint = "Логина нет — только пароль. У каждого свой.",
  placeholder = "Пароль",
  errorEmpty = "Введите пароль",
  errorWrong = "Неверный пароль",
  submitLabel = "Войти",
  cancelLabel = "Отмена",
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
  hint?: string;
  placeholder?: string;
  errorWrong?: string;
  submitLabel?: string;
  cancelLabel?: string;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (!password.trim()) {
        setError(errorEmpty);
        return;
      }
      if (VALID_PASSWORDS.includes(password.trim())) {
        setPassword("");
        onSuccess?.();
        onClose();
      } else {
        setError(errorWrong);
      }
    },
    [password, onClose, onSuccess, errorEmpty, errorWrong]
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
      aria-label={title}
    >
      <div
        className="rounded-2xl border border-[#E6E6E6] bg-[#FCFCFC] p-8 max-w-sm mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-[#1E1E1E] mb-2 text-center">
          {title}
        </h3>
        <p className="text-sm text-[#808080] mb-6 text-center">{hint}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-xl border border-[#E6E6E6] bg-white text-[#1E1E1E] placeholder:text-[#808080] focus:outline-none focus:border-[#B289F9] focus:ring-2 focus:ring-[#B289F9]/20 transition-colors"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="mt-6 w-full py-3 px-4 rounded-xl bg-[#6E22F2] text-white font-semibold hover:bg-[#5a1fc9] transition-colors"
          >
            {submitLabel}
          </button>
        </form>
        <button
          type="button"
          onClick={handleClose}
          className="mt-4 w-full py-2 text-[#808080] hover:text-[#1E1E1E] text-sm transition-colors"
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  );
}
