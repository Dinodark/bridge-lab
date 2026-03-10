import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreFooter from "@/components/explore/ExploreFooter";
import ExploreContent from "@/components/explore/ExploreContent";

export const metadata = {
  title: "Explore Cases — Bridge Crypto Charity",
  description: "Find projects that matter to you",
};

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] pt-4 pb-12">
      <div className="content-container">
        <ExploreHeader />
        <ExploreContent />
        <ExploreFooter />
      </div>
    </div>
  );
}
