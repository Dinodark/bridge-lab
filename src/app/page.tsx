import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  openGraph: {
    images: ["/assets/home-feed-illustration.webp"],
  },
};

export default function HomePage() {
  return <HomeContent />;
}
