"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnthemPlayer } from "@/contexts/AnthemPlayerContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { incrementLocalCount } from "@/hooks/useAnalyticsCount";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const TRIBE_LINKS = [
  { href: "/media", label: "Media" },
  { href: "/tribe", label: "Tribe" },
  { href: "/vision", label: "Vision" },
  { href: "/tribe/merch", label: "Merch" },
  { href: "/tribe-dev", label: "Tribe Dev" },
  { href: "/dao", label: "DAO" },
  { href: "/brandguidelines", label: "Brand Guidelines" },
];

/** Author name for header tagline. Set to empty to hide "by [name]". */
const AUTHOR_NAME = "derbushev";

const BRIDGE_LINKS = [
  { href: "/blockchain", label: "Bridge" },
  { href: "/crypto", label: "Mobile First" },
  { href: "/explore", label: "Starter" },
  { href: "/music", label: "Music" },
];

function LangSwitcher({
  lang,
  setLang,
  palette,
  className = "",
}: {
  lang: string;
  setLang: (l: "ru" | "de") => void;
  palette: { cta1: string };
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-1 border-[var(--color-border)] pl-2 ${className}`}
      style={{ ["--lang-cta" as string]: palette.cta1 }}
    >
      <button
        onClick={() => setLang("ru")}
        className={`rounded-md px-2 py-1 text-xs font-medium transition-all duration-200 border cursor-pointer
          hover:scale-105 hover:shadow-sm
          ${lang === "ru" ? "bg-[var(--color-bg-active)] text-[var(--lang-cta)] border-[var(--color-border)]" : "bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:bg-[var(--color-bg-active)]/40 hover:text-[var(--lang-cta)] hover:border-[var(--lang-cta)]/50"}`}
        title="Русский"
      >
        RU
      </button>
      <button
        onClick={() => setLang("de")}
        className={`rounded-md px-2 py-1 text-xs font-medium transition-all duration-200 border cursor-pointer
          hover:scale-105 hover:shadow-sm
          ${lang === "de" ? "bg-[var(--color-bg-active)] text-[var(--lang-cta)] border-[var(--color-border)]" : "bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:bg-[var(--color-bg-active)]/40 hover:text-[var(--lang-cta)] hover:border-[var(--lang-cta)]/50"}`}
        title="Deutsch"
      >
        DE
      </button>
    </div>
  );
}

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
              fontFamily: "var(--font-body)",
            }}
          >
            {(() => {
              const bestMatch = items
                .filter((i) => pathname === i.href || pathname.startsWith(i.href + "/"))
                .sort((a, b) => b.href.length - a.href.length)[0];
              return items.map((item) => {
                const itemActive =
                  (pathname === item.href || pathname.startsWith(item.href + "/")) &&
                  bestMatch?.href === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--color-bg-active)] ${itemActive ? "bg-[var(--color-bg-active)]" : ""}`}
                  style={{ color: itemActive ? palette.cta1 : "var(--color-muted)" }}
                >
                  {item.label}
                </Link>
              );
            });
            })()}
          </div>,
          document.body
        )}
    </div>
  );
}

function NavLink({
  href,
  label,
  isActive,
  palette,
  onClick,
  className = "",
}: {
  href: string;
  label: string;
  isActive: boolean;
  palette: { cta1: string };
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link-mobile block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-violet-100 active:bg-violet-200 ${isActive ? "bg-[var(--color-bg-active)]" : ""} ${className}`}
      style={{
        color: isActive ? palette.cta1 : "var(--color-muted)",
      }}
    >
      {label}
    </Link>
  );
}

export default function GlobalMenu() {
  const pathname = usePathname();
  const { palette } = useTheme();
  const { lang, setLang } = useLanguage();
  const { isPlaying, togglePlay } = useAnthemPlayer();
  const { trackPlay } = useAnalytics();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handlePlayClick = () => {
    if (!isPlaying) {
      trackPlay("anthem-track", "audio");
      incrementLocalCount("anthem-track", "play");
    }
    togglePlay();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-header)]/95 backdrop-blur-sm"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 flex-col items-start gap-0">
          <span
            className="text-xl leading-tight sm:text-2xl"
            style={{ fontWeight: 800, letterSpacing: "-0.03em", display: "flex", alignItems: "baseline", gap: 1 }}
          >
            <span className="italic" style={{ color: "#1E1E1E" }}>one</span>
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
          <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase" style={{ color: "var(--color-muted)" }}>
            Creative Direction for Tribe{AUTHOR_NAME ? ` by ${AUTHOR_NAME}` : ""}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex md:gap-2">
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
          <Link
            href="/strategy"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3"
            style={{
              color: pathname === "/strategy" ? palette.cta1 : "var(--color-muted)",
              background: pathname.startsWith("/strategy") ? "var(--color-bg-active)" : "transparent",
            }}
          >
            Strategy
          </Link>
          <Dropdown label="Bridge" items={BRIDGE_LINKS} pathname={pathname} palette={palette} />
          <div className="ml-2 flex items-center gap-1.5">
            <AnalyticsCountBadge targetId="anthem-track" type="play" className="text-[10px]" />
            <button
              type="button"
              onClick={handlePlayClick}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause Anthem" : "Play Anthem"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg-active)]"
              style={{ color: palette.cta1 }}
            >
              {isPlaying ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
          <LangSwitcher lang={lang} setLang={setLang} palette={palette} className="ml-2 border-l" />
        </nav>

        {/* Mobile: lang + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={handlePlayClick}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg-active)]"
            style={{ color: palette.cta1 }}
          >
            {isPlaying ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <LangSwitcher lang={lang} setLang={setLang} palette={palette} className="border-l pl-2" />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] transition-colors hover:bg-[var(--color-bg-active)]"
          >
            <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-1">
              <span
                className={`h-0.5 w-4 rounded-full bg-current transition-all ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
                style={{ background: "var(--color-muted)" }}
              />
              <span
                className={`h-0.5 w-4 rounded-full transition-all ${mobileOpen ? "opacity-0" : ""}`}
                style={{ background: "var(--color-muted)" }}
              />
              <span
                className={`h-0.5 w-4 rounded-full bg-current transition-all ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
                style={{ background: "var(--color-muted)" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay — portaled to body, только после mount (избегаем hydration mismatch) */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`fixed inset-x-0 top-14 bottom-0 z-[100] flex flex-col overflow-y-auto md:hidden transition-opacity duration-300 ${mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}`}
            style={{ backgroundColor: "#ffffff" }}
            aria-hidden={!mobileOpen}
          >
            <nav
              className={`flex flex-shrink-0 flex-col gap-0 p-4 transition-all duration-300 ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
            >
              <NavLink href="/" label="Home" isActive={pathname === "/"} palette={palette} onClick={() => setMobileOpen(false)} />
              <NavLink href="/roadmap" label="Roadmap" isActive={pathname === "/roadmap"} palette={palette} onClick={() => setMobileOpen(false)} />

              <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-gray-50 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[var(--color-border)]" style={{ color: palette.cta1 }}>
                  <span className="text-xs font-semibold uppercase tracking-wider">Tribe</span>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  {TRIBE_LINKS.map((item) => {
                    const bestMatch = TRIBE_LINKS.filter(
                      (i) => pathname === i.href || pathname.startsWith(i.href + "/")
                    ).sort((a, b) => b.href.length - a.href.length)[0];
                    const itemActive =
                      (pathname === item.href || pathname.startsWith(item.href + "/")) &&
                      bestMatch?.href === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block w-full rounded-lg mx-2 px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-[var(--color-bg-active)] active:bg-[var(--color-bg-active)] border-l-2 border-transparent pl-5"
                        style={{
                          color: itemActive ? palette.cta1 : "var(--color-muted)",
                          borderLeftColor: itemActive ? palette.cta1 : "transparent",
                        }}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <NavLink href="/strategy" label="Strategy" isActive={pathname.startsWith("/strategy")} palette={palette} onClick={() => setMobileOpen(false)} className="mt-4" />

              <div className="mt-3 rounded-xl border border-[var(--color-border)] bg-gray-50 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[var(--color-border)]" style={{ color: palette.cta1 }}>
                  <span className="text-xs font-semibold uppercase tracking-wider">Bridge</span>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  {BRIDGE_LINKS.map((item) => {
                    const bestMatch = BRIDGE_LINKS.filter(
                      (i) => pathname === i.href || pathname.startsWith(i.href + "/")
                    ).sort((a, b) => b.href.length - a.href.length)[0];
                    const itemActive =
                      (pathname === item.href || pathname.startsWith(item.href + "/")) &&
                      bestMatch?.href === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block w-full rounded-lg mx-2 px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-[var(--color-bg-active)] active:bg-[var(--color-bg-active)] border-l-2 border-transparent pl-5"
                        style={{
                          color: itemActive ? palette.cta1 : "var(--color-muted)",
                          borderLeftColor: itemActive ? palette.cta1 : "transparent",
                        }}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>,
          document.body
        )}
    </header>
  );
}
