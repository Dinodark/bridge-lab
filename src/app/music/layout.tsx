import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music — PROD · OneBridge",
  description: "PROD — Cursor In The Dark (Lounge Edition), Push It To Prod. Наша музыка.",
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
