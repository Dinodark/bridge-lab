"use client";

import { usePathname } from "next/navigation";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={isHome ? "" : "pt-10"}>
      {children}
    </div>
  );
}
