import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tribe DAO — Сообщество решает | Die Community entscheidet",
  description:
    "DAO — децентрализованная автономная организация. Tribe определяет. Transparenz, Mitbestimmung, Dezentralisierung.",
};

export default function DaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
