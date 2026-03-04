"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackToHome() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-10 flex items-center px-4 bg-white/90 backdrop-blur-sm border-b border-zinc-200/60">
      <Link
        href="/"
        className="text-sm font-semibold text-zinc-700 hover:text-violet-600 transition-colors"
      >
        ← Bridge
      </Link>
    </div>
  );
}
