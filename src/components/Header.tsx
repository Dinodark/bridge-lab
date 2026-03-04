"use client";

import Link from "next/link";

const navItems = [
  { href: "/", label: "Главная", icon: "🏠" },
  { href: "/crypto", label: "Crypto", icon: "⚡" },
  { href: "/donate", label: "Пожертвовать", icon: "💝", active: true },
  { href: "/fundraising", label: "Fundraising" },
  { href: "/media", label: "Медиа", icon: "📷" },
  { href: "/about", label: "О нас", icon: "👥" },
];

export default function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400 bg-clip-text text-transparent rounded-lg">
            Bridge
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400 flex items-center justify-center text-white font-medium">
              А
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
              1
            </span>
          </button>
          <button className="p-1 text-zinc-500 hover:text-zinc-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
