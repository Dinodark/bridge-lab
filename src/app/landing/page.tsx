import LandingHeader from "@/components/landing/LandingHeader";
import LandingHero from "@/components/landing/LandingHero";
import LandingCharityParadox from "@/components/landing/LandingCharityParadox";
import LandingNFTGallery from "@/components/landing/LandingNFTGallery";

export const metadata = {
  title: "Bridge Crypto Charity — The First Blockchain Charity Platform",
  description: "Where Good Deeds Become Digital Legacy. NFT-driven charity platform.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#140321]">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingCharityParadox />
        <LandingNFTGallery />
      </main>
    </div>
  );
}
