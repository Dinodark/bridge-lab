"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCoreGate, GATE_CONFIG } from "@/contexts/CoreGateContext";

export default function CoreGateModal() {
  const { lang } = useLanguage();
  const { checkAnswer, isBanned, remainingAttempts } = useCoreGate();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const config = GATE_CONFIG[lang === "de" ? "de" : "ru"];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (!answer.trim()) return;
      const result = checkAnswer(answer);
      setAnswer("");
      if (result.ok) {
        setError("");
      } else {
        if (result.banned) {
          setError(config.errorBanned);
        } else {
          setError(`${config.errorWrong} ${result.remaining}`);
        }
      }
    },
    [answer, checkAnswer, config]
  );

  if (isBanned) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={config.bannedTitle}
      >
        <div
          className="rounded-2xl border p-8 max-w-sm mx-4 shadow-2xl text-center"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-bg)",
          }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
            {config.bannedTitle}
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            {config.bannedDesc}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "var(--color-cta1)", color: "#fff" }}
          >
            {config.cancelLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={config.title}
    >
      <div
        className="rounded-2xl border p-8 max-w-md mx-4 shadow-2xl"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-bg)",
        }}
      >
        <h3 className="text-xl font-bold mb-1 text-center" style={{ color: "var(--color-text)" }}>
          {config.title}
        </h3>
        <p className="text-xs font-medium tracking-widest uppercase mb-4 text-center" style={{ color: "var(--color-cta1)" }}>
          {config.hintSub}
        </p>
        <p className="text-sm mb-6 text-center" style={{ color: "var(--color-muted)" }}>
          {config.hint}
        </p>
        <p className="text-lg font-medium mb-4 text-center" style={{ color: "var(--color-text)" }}>
          {config.question}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError("");
            }}
            placeholder={config.placeholder}
            className="w-full px-4 py-3 rounded-xl border bg-transparent placeholder:opacity-60 focus:outline-none focus:ring-2 transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            autoFocus
            autoComplete="off"
          />
          {error && (
            <p className="mt-2 text-sm text-center" style={{ color: "var(--color-cta1)" }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-6 w-full py-3 px-4 rounded-xl font-semibold text-sm transition-colors hover:opacity-90"
            style={{ background: "var(--color-cta1)", color: "#fff" }}
          >
            {config.submitLabel}
          </button>
        </form>
        <Link
          href="/"
          className="mt-4 block w-full py-2 text-center text-sm transition-colors hover:opacity-80"
          style={{ color: "var(--color-muted)" }}
        >
          {config.cancelLabel}
        </Link>
      </div>
    </div>
  );
}
