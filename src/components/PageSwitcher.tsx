"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { href: "/", label: "Главная" },
  { href: "/crypto", label: "Crypto" },
  { href: "/blockchain", label: "Blockchain" },
  { href: "/landing", label: "Landing" },
  { href: "/explore", label: "Explore" },
  { href: "/merch", label: "Merch" },
];

export default function PageSwitcher() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-4 flex">
      {pages.map((page) => {
        const isActive =
          pathname === page.href ||
          (page.href === "/explore" && pathname.startsWith("/campaign"));
        return (
          <Link
            key={page.href}
            href={page.href}
            title={page.label}
            className={`flex-1 h-full transition-colors ${
              isActive ? "bg-zinc-900" : "bg-white hover:bg-zinc-100"
            }`}
            aria-label={page.label}
          />
        );
      })}
    </nav>
  );
}
