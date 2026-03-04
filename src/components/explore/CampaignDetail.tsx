import Image from "next/image";
import Link from "next/link";

const campaignData: Record<string, { title: string; image: string; raised: number; goal: number; daysLeft: number; progress: number }> = {
  "1": {
    title: "Eine junge Mutter ging viel zu früh - Wir brauchen dich!",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=600&fit=crop",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 65,
  },
  "2": {
    title: "Supporta il progetto Fuck Cancer di @pettor_ale",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 72,
  },
  "3": {
    title: "Support Sienna's Recovery From a Rare Brain Condition",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 45,
  },
  "4": {
    title: "Healing Support for BLUE LINE Stabbing Survivor",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 86,
  },
};

export default function CampaignDetail({ campaignId }: { campaignId: string }) {
  const campaign = campaignData[campaignId] || campaignData["4"];

  return (
    <main className="mt-12">
      <div className="bg-white rounded-[60px] p-8 sm:p-12 lg:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#282b33] mb-8">
              {campaign.title}
            </h1>
            <div className="flex items-center gap-3 px-8 py-3 rounded-full bg-[#01ee8b] w-fit mb-8">
              <svg className="w-6 h-6 text-[#474747]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="font-semibold text-[#474747]">2.5k donations</span>
            </div>
            <h2 className="text-xl font-bold text-[#282b33] mb-6">{campaign.title}</h2>
            <div className="h-4 bg-[#d9d9d9]/50 rounded-2xl overflow-hidden mb-6">
              <div
                className="h-full bg-[#01ee8b] rounded-2xl"
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
            <div className="flex items-center gap-6 text-[#959aa8] text-xl mb-4">
              <span>Raised €{campaign.raised.toLocaleString()}</span>
              <span className="flex-1 border-t border-dashed border-[#959aa8]/50" />
              <span>€{campaign.goal.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-6 text-[#959aa8] text-xl mb-8">
              <span>Days remaining</span>
              <span className="flex-1 border-t border-dashed border-[#959aa8]/50" />
              <span>{campaign.daysLeft}</span>
            </div>
            <Link
              href={`/campaign/${campaignId}/donate`}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#9550ff] text-white text-2xl font-semibold hover:bg-[#8440e8]"
            >
              Donate
              <svg className="w-8 h-8 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="flex-1 relative aspect-[4/3] min-h-[300px] rounded-[24px] overflow-hidden">
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
