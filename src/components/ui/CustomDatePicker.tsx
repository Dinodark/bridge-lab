"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const MONTHS_DE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
const MONTHS_RU = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
const WEEKDAYS_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const WEEKDAYS_RU = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function formatDisplay(value: string, lang: "ru" | "de"): string {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  const months = lang === "de" ? MONTHS_DE : MONTHS_RU;
  return `${d}. ${months[m - 1]} ${y}`;
}

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Выберите...",
  className = "",
}: CustomDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date();
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const months = lang === "de" ? MONTHS_DE : MONTHS_RU;
  const weekdays = lang === "de" ? WEEKDAYS_DE : WEEKDAYS_RU;

  const displayValue = value ? formatDisplay(value, lang) : placeholder;

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

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const days: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const selectDay = (d: number) => {
    const yyyy = year.toString();
    const mm = (month + 1).toString().padStart(2, "0");
    const dd = d.toString().padStart(2, "0");
    onChange(`${yyyy}-${mm}-${dd}`);
    setOpen(false);
  };

  const prevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  const nextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`flex items-center justify-between gap-2 px-4 py-2 rounded-lg border border-[#CCCCCC] bg-white text-[#1E1E1E] text-sm font-semibold hover:border-[#4D4D4D] focus:border-[#4D4D4D] focus:ring-2 focus:ring-[#E6E6E6] outline-none transition-colors w-full h-12 ${className}`}
      >
        <span className={`flex-1 min-w-0 truncate text-left ${value ? "text-[#1E1E1E]" : "text-[#808080]"}`}>{displayValue}</span>
        <svg
          className="w-4 h-4 text-[#808080] flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
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
              width: Math.max(pos.width, 280),
              minWidth: 280,
              fontFamily: "'Inter Tight', Inter, sans-serif",
            }}
          >
            <div className="flex items-center justify-between px-3 py-2 mb-2">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1.5 rounded-lg text-[#808080] hover:bg-[var(--color-bg-active)] hover:text-[#1E1E1E] transition-colors"
                aria-label="Previous month"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-semibold text-[#1E1E1E]">
                {months[month]} {year}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1.5 rounded-lg text-[#808080] hover:bg-[var(--color-bg-active)] hover:text-[#1E1E1E] transition-colors"
                aria-label="Next month"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-0.5 px-2">
              {weekdays.map((w) => (
                <div
                  key={w}
                  className="text-center text-[10px] font-medium text-[#808080] py-1"
                >
                  {w}
                </div>
              ))}
              {days.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => d !== null && selectDay(d)}
                  disabled={d === null}
                  className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors ${
                    d === null
                      ? "invisible"
                      : value === `${year}-${(month + 1).toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`
                      ? "bg-[var(--color-cta1)] text-white"
                      : "text-[#1E1E1E] hover:bg-[var(--color-bg-active)]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
