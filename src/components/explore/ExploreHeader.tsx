"use client";

import Link from "next/link";

export default function ExploreHeader() {
  return (
    <header className="bg-white flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-14 py-4 sm:py-6 rounded-[40px] sm:rounded-[60px] shadow-sm">
      <div className="flex items-center gap-6 sm:gap-12 order-2 sm:order-1">
        <Link href="/explore" className="text-[#282b33] font-semibold text-base sm:text-lg hover:text-[#9550ff]">
          Donate
        </Link>
        <Link href="/explore/create" className="text-[#282b33] font-semibold text-base sm:text-lg hover:text-[#9550ff]">
          Create Project
        </Link>
      </div>
      <Link href="/explore" className="flex flex-col items-center order-1 sm:order-2">
        <span className="text-xl sm:text-2xl font-bold text-[#282b33]">BRIDGE</span>
        <span className="text-[9px] sm:text-[10px] font-bold text-[#959aa8] tracking-widest">CRYPTO CHARITY</span>
      </Link>
      <div className="flex items-center gap-4 sm:gap-12 order-3">
        <Link href="/explore" className="text-[#282b33] font-semibold text-base sm:text-lg hover:text-[#9550ff]">
          Explore
        </Link>
        <Link href="/explore/about" className="text-[#282b33] font-semibold text-base sm:text-lg hover:text-[#9550ff] hidden sm:inline">
          About us
        </Link>
        <button className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-[#9550ff] text-white text-sm sm:text-base font-semibold hover:bg-[#8440e8]">
          Connect Wallet
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
