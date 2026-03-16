import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page — TRIBE | Finde deinen Tribe & echte Verbindungen",
  description:
    "Europas erste gesunde Social-Media-Plattform. Für echte Verbindungen, echte Menschen, echtes Wachstum. Первая в Европе здоровая соцсеть. RU/DE.",
};

export default function TribeLandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
