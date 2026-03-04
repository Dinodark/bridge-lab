"use client";

import Link from "next/link";
import { useState } from "react";

export default function CryptoHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-10 left-0 right-0 z-50 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/crypto" className="flex flex-col">
          <span className="text-xl font-bold text-zinc-900 tracking-tight">BRIDGE</span>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-medium tracking-widest uppercase">
            CRYPTO FOR CHARITY
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-zinc-100 transition-colors lg:hidden"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Главная</Link>
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">Кампании</Link>
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">О платформе</Link>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors">
              Connect wallet
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-200 py-4 px-4">
          <nav className="flex flex-col gap-2">
            <Link href="/" className="py-2 text-zinc-700 font-medium">Главная</Link>
            <Link href="/" className="py-2 text-zinc-700 font-medium">Кампании</Link>
            <Link href="/" className="py-2 text-zinc-700 font-medium">О платформе</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
