"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const TRIBE_LINKS = [
  { href: "/media", label: "Media" },
  { href: "/tribe", label: "Tribe" },
  { href: "/tribe/merch", label: "Merch" },
  { href: "/tribe-dev", label: "Tribe Dev" },
  { href: "/dao", label: "DAO" },
  { href: "/brandguidelines", label: "Brand Guidelines" },
];

const CRYPTO_LINKS = [
  { href: "/crypto", label: "Mobile First" },
  { href: "/explore", label: "Starter" },
];

function Dropdown({
  label,
  items,
  pathname,
  palette,
}: {
  label: string;
  items: { href: string; label: string }[];
  pathname: string;
  palette: { cta1: string };
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isActive = items.some((i) => pathname === i.href || pathname.startsWith(i.href + "/"));

  const updatePos = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left });
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
        aria-haspopup="true"
        className="rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3 flex items-center gap-1"
        style={{
          color: isActive ? palette.cta1 : "var(--color-muted)",
          background: open || isActive ? "var(--color-bg-active)" : "transparent",
        }}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
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
            className="fixed z-[9999] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-header)] shadow-lg py-2 px-2 min-w-[160px]"
            style={{
              top: pos.top,
              left: pos.left,
              fontFamily: "'Inter Tight', Inter, sans-serif",
            }}
          >
            {items.map((item) => {
              const itemActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--color-bg-active)]"
                  style={{ color: itemActive ? palette.cta1 : "var(--color-muted)" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}

export default function GlobalMenu() {
  const pathname = usePathname();
  const { palette } = useTheme();
  const { lang, setLang } = useLanguage();

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-header)]/95 backdrop-blur-sm"
      style={{ fontFamily: "'Inter Tight', Inter, sans-serif" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span className="italic" style={{ color: "#1E1E1E", marginRight: 2 }}>one</span>
            <span
              style={{
                backgroundImage: palette.gradient1,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              bridge
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide sm:gap-2">
          <Link
            href="/"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3"
            style={{
              color: pathname === "/" ? palette.cta1 : "var(--color-muted)",
              background: pathname === "/" ? "var(--color-bg-active)" : "transparent",
            }}
          >
            Home
          </Link>
          <Link
            href="/roadmap"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3"
            style={{
              color: pathname === "/roadmap" ? palette.cta1 : "var(--color-muted)",
              background: pathname === "/roadmap" ? "var(--color-bg-active)" : "transparent",
            }}
          >
            Roadmap
          </Link>
          <Dropdown label="Tribe" items={TRIBE_LINKS} pathname={pathname} palette={palette} />
          <Dropdown label="Crypto" items={CRYPTO_LINKS} pathname={pathname} palette={palette} />
          <Link
            href="/blockchain"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3"
            style={{
              color: pathname === "/blockchain" ? palette.cta1 : "var(--color-muted)",
              background: pathname.startsWith("/blockchain") ? "var(--color-bg-active)" : "transparent",
            }}
          >
            Bridge
          </Link>

          <div className="ml-2 flex items-center gap-1 border-l border-[var(--color-border)] pl-2">
            <button
              onClick={() => setLang("ru")}
              className="rounded-md px-2 py-1 text-xs font-medium transition-all hover:opacity-80"
              style={{
                background: lang === "ru" ? "var(--color-bg-active)" : "transparent",
                color: lang === "ru" ? palette.cta1 : "var(--color-muted)",
                border: "1px solid var(--color-border)",
              }}
              title="Русский"
            >
              RU
            </button>
            <button
              onClick={() => setLang("de")}
              className="rounded-md px-2 py-1 text-xs font-medium transition-all hover:opacity-80"
              style={{
                background: lang === "de" ? "var(--color-bg-active)" : "transparent",
                color: lang === "de" ? palette.cta1 : "var(--color-muted)",
                border: "1px solid var(--color-border)",
              }}
              title="Deutsch"
            >
              DE
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
