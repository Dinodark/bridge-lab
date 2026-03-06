"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme, THEME_PALETTES } from "@/contexts/ThemeContext";

const MENU_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/brandguidelines", label: "Brand Guidelines" },
  { href: "/dao", label: "DAO" },
  { href: "/explore", label: "Explore" },
  { href: "/crypto", label: "Crypto" },
  { href: "/blockchain", label: "Blockchain" },
  { href: "/media", label: "Media" },
  { href: "/tribe", label: "Tribe" },
];

export default function GlobalMenu() {
  const pathname = usePathname();
  const { theme, setTheme, palette } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-header)]/95 backdrop-blur-sm"
      style={{ fontFamily: "'Inter Tight', Inter, sans-serif" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span style={{ color: "#1E1E1E" }}>one</span>
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
          <span className="text-xs text-[var(--color-muted)] hidden sm:inline">
            Tribe · Bridge
          </span>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide sm:gap-2">
          {MENU_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3"
                style={{
                  color: isActive ? palette.cta1 : "var(--color-muted)",
                  background: isActive ? "var(--color-bg-active)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="ml-2 flex items-center gap-1 border-l border-[var(--color-border)] pl-2">
            <button
              onClick={() => setTheme("onetribe")}
              className="rounded px-2 py-1 text-xs font-semibold transition-all"
              style={{
                background: theme === "onetribe" ? THEME_PALETTES.onetribe.gradient1 : "transparent",
                color: theme === "onetribe" ? "#fff" : "var(--color-muted)",
                border: theme === "onetribe" ? "none" : "1px solid var(--color-border)",
              }}
              title="OneTribe palette"
            >
              Tribe
            </button>
            <button
              onClick={() => setTheme("onebridge")}
              className="rounded px-2 py-1 text-xs font-semibold transition-all"
              style={{
                background: theme === "onebridge" ? THEME_PALETTES.onebridge.gradient1 : "transparent",
                color: theme === "onebridge" ? "#fff" : "var(--color-muted)",
                border: theme === "onebridge" ? "none" : "1px solid var(--color-border)",
              }}
              title="OneBridge palette"
            >
              Bridge
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
