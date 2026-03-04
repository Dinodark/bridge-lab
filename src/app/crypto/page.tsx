import CryptoHeader from "@/components/crypto/CryptoHeader";
import CryptoHero from "@/components/crypto/CryptoHero";
import PlatformIntro from "@/components/crypto/PlatformIntro";
import FeaturedCampaigns from "@/components/crypto/FeaturedCampaigns";
import HelpVerifyCampaigns from "@/components/crypto/HelpVerifyCampaigns";
import MediaOfTheWeek from "@/components/crypto/MediaOfTheWeek";
import DevelopmentRoadmap from "@/components/crypto/DevelopmentRoadmap";
import LeadershipOfTheWeek from "@/components/crypto/LeadershipOfTheWeek";
import PlatformNews from "@/components/crypto/PlatformNews";
import BottomNav from "@/components/crypto/BottomNav";

export const metadata = {
  title: "Bridge Crypto — Криптоблаготворительность",
  description: "Community driven crypto charity platform. Transparent charity based on web3 technologies.",
};

export default function CryptoPage() {
  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      <CryptoHeader />
      <main>
        <CryptoHero />
        <PlatformIntro />
        <FeaturedCampaigns />
        <HelpVerifyCampaigns />
        <MediaOfTheWeek />
        <DevelopmentRoadmap />
        <LeadershipOfTheWeek />
        <PlatformNews />
      </main>
      <BottomNav />
    </div>
  );
}
