"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
  minWidth?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Выберите...",
  className = "",
  minWidth = "180px",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? (value || placeholder);

  const updatePos = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }
  };

  useEffect(() => {
    if (open) {
      updatePos();
      const onScrollOrResize = () => updatePos();
      window.addEventListener("scroll", onScrollOrResize, true);
      window.addEventListener("resize", onScrollOrResize);
      return () => {
        window.removeEventListener("scroll", onScrollOrResize, true);
        window.removeEventListener("resize", onScrollOrResize);
      };
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpen(false);
    }
    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex items-center justify-between gap-2 px-4 py-2 rounded-lg border border-[#CCCCCC] bg-white text-[#1E1E1E] text-sm font-semibold hover:border-[#4D4D4D] focus:border-[#4D4D4D] focus:ring-2 focus:ring-[#E6E6E6] outline-none transition-colors ${className}`}
        style={{ minWidth }}
      >
        <span className={value ? "text-[#1E1E1E]" : "text-[#808080]"}>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 text-[#808080] flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed z-[9999] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-header)] shadow-lg py-2 px-2"
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              minWidth: pos.width,
              fontFamily: "'Inter Tight', Inter, sans-serif",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--color-bg-active)]"
                style={{
                  color: value === opt.value ? "var(--color-cta1)" : "var(--color-muted)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
