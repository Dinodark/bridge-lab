import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Guidelines — OneTribe",
  description:
    "OneTribe Brand Guidelines: Foundation, Colors, Typography, Logo, Icons, Imagery, Motion, Patterns, Layout, Applications",
};

export default function BrandGuidelinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
