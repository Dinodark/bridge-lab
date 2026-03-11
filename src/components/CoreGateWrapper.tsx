"use client";

import { usePathname } from "next/navigation";
import { useCoreGate } from "@/contexts/CoreGateContext";
import CoreGateModal from "./CoreGateModal";

const PUBLIC_PATHS = ["/"];

export default function CoreGateWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthed, isBanned } = useCoreGate();

  const isPublic = PUBLIC_PATHS.includes(pathname || "/");
  const showGate = !isPublic && !isAuthed;

  return (
    <>
      {showGate && <CoreGateModal />}
      <div
        style={{
          filter: showGate ? "blur(8px) pointer-events-none" : undefined,
          minHeight: showGate ? "100vh" : undefined,
        }}
      >
        {children}
      </div>
    </>
  );
}
