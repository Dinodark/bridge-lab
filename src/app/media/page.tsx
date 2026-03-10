import MediaHeader from "@/components/media/MediaHeader";
import MarvinCarousel from "@/components/MarvinCarousel";
import TribeCarousel from "@/components/TribeCarousel";
import MediaGrid from "@/components/media/MediaGrid";
import MarvinGallery from "@/components/media/MarvinGallery";
import CharacterModels from "@/components/media/CharacterModels";
import TribeBannerTool from "@/components/media/TribeBannerTool";

export const metadata = {
  title: "Media — Bridge",
  description: "Видео, изображения, истории и AI-модели персонажей",
};

export default function MediaPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)", fontFamily: "var(--font-body)" }}>
      <div className="relative z-10">
        <MediaHeader />
        <main>
          <MarvinCarousel variant="light" />
          <TribeCarousel variant="light" />
          <MediaGrid />
          <MarvinGallery />
          <CharacterModels />
          <TribeBannerTool />
        </main>
      </div>
    </div>
  );
}
