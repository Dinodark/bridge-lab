import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision — Tribe",
  description: "Building the Visual Identity of the DACH Community. Media portal · Brand assets · One source of truth.",
};

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
