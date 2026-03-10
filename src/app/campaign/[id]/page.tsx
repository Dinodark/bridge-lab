import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreFooter from "@/components/explore/ExploreFooter";
import CampaignDetail from "@/components/explore/CampaignDetail";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    title: `Campaign ${id} — Bridge Crypto Charity`,
    description: "Support this campaign",
  };
}

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-[#FAFAFC] pt-4 pb-12">
      <div className="content-container">
        <ExploreHeader />
        <CampaignDetail campaignId={id} />
        <ExploreFooter />
      </div>
    </div>
  );
}
