"use client";

import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="fixed top-14 left-0 right-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/landing" className="flex flex-col">
          <span className="text-xl font-bold text-white tracking-widest">BRIDGE</span>
          <span className="text-[10px] text-white/80 tracking-wider uppercase">Crypto Charity</span>
        </Link>
        <nav className="hidden md:flex items-center gap-12">
          <Link href="/landing#fundraise" className="text-base text-white hover:text-white/80">
            Fundraise
          </Link>
          <Link href="/landing#donate" className="text-base text-white hover:text-white/80">
            Donate
          </Link>
          <Link href="/landing#about" className="text-base text-white hover:text-white/80">
            About Us
          </Link>
          <button className="flex items-center gap-3 pl-[30px] pr-[6px] py-[6px] rounded-[50px] bg-[#7342E8] text-white text-[16px] font-medium hover:bg-[#6342d8] transition-colors">
            Join Waitlist
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
