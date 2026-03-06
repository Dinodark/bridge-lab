import BlockchainDecorativeLogos from "@/components/blockchain/BlockchainDecorativeLogos";
import BlockchainHeader from "@/components/blockchain/BlockchainHeader";
import BlockchainHero from "@/components/blockchain/BlockchainHero";
import CharityParadox from "@/components/blockchain/CharityParadox";
import CharityMeetsCulture from "@/components/blockchain/CharityMeetsCulture";
import HowItWorks from "@/components/blockchain/HowItWorks";
import NFTGallery from "@/components/blockchain/NFTGallery";
import CommunityGovernance from "@/components/blockchain/CommunityGovernance";
import NumbersDontLie from "@/components/blockchain/NumbersDontLie";
import WhyNow from "@/components/blockchain/WhyNow";
import BuiltByBelievers from "@/components/blockchain/BuiltByBelievers";
import RoadmapSection from "@/components/blockchain/RoadmapSection";
import ReadyCTA from "@/components/blockchain/ReadyCTA";
import BlockchainFooter from "@/components/blockchain/BlockchainFooter";

export const metadata = {
  title: "Bridge — The First Blockchain Charity Platform",
  description: "Where Good Deeds Become Digital Legacy. NFT-driven charity platform.",
};

export default function BlockchainPage() {
  return (
    <div className="relative min-h-screen bg-[#0f0a1e]">
      <BlockchainDecorativeLogos />
      <div className="relative z-10">
        <BlockchainHeader />
        <main>
        <BlockchainHero />
        <CharityParadox />
        <CharityMeetsCulture />
        <HowItWorks />
        <NFTGallery />
        <CommunityGovernance />
        <NumbersDontLie />
        <WhyNow />
        <BuiltByBelievers />
        <RoadmapSection />
        <ReadyCTA />
      </main>
        <BlockchainFooter />
      </div>
    </div>
  );
}
