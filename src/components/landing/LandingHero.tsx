import Image from "next/image";
import Link from "next/link";
import BackgroundDots from "./BackgroundDots";

const campaigns = [
  {
    id: 1,
    title: "Eine junge Mutter ging viel zu früh - Wir brauchen dich!",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=400&fit=crop",
    backers: "2.5k backers",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 65,
  },
  {
    id: 2,
    title: "Medical Supplies for Gaza",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    backers: "2.5k backers",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 72,
  },
  {
    id: 3,
    title: "Solar Power for Remote Villages",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    backers: "2.5k backers",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 22,
  },
];

export default function LandingHero() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(115,66,232,0.25)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(134,233,190,0.08)_0%,_transparent_50%)]" />
      <BackgroundDots />
      
      <div className="relative max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-end lg:gap-[72px]">
        <div className="flex-1 mb-12 lg:mb-0">
          <h1 className="text-[48px] sm:text-[56px] lg:text-[80px] font-bold leading-[1.05] text-[#86e9be] mb-6">
            The First Blockchain Charity Platform
          </h1>
          <p className="text-[28px] sm:text-[33px] font-medium text-[#FAFAFC] mb-6">
            Where Good Deeds Become Digital Legacy
          </p>
          <p className="text-[19px] text-[#FAFAFC] mb-8 max-w-[628px] leading-relaxed">
            We&apos;re transforming charity into a transparent, gamified ecosystem where every donation becomes a collectible NFT and every donor becomes part of a movement.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="flex items-center gap-2 h-[62px] px-8 rounded-[75px] bg-[#7342E8] text-white text-[20px] font-medium hover:bg-[#6342d8] transition-colors">
              Join the Movement
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <Link
              href="#"
              className="flex items-center gap-2 h-[62px] px-8 rounded-[75px] border-[1.5px] border-[#7342E8] border-solid text-white text-[20px] font-medium hover:bg-[#7342E8]/10 transition-colors"
            >
              View Deck
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
          <p className="text-[14px] text-[#FAFAFC]/35">
            Launching Q2 2026 · $592B Market Opportunity
          </p>
        </div>
        <div className="flex-1 overflow-hidden lg:min-w-0">
          <div className="flex gap-4 w-max animate-marquee-slow">
            {campaigns.map((campaign) => (
              <article
                key={`a-${campaign.id}`}
                className="flex-shrink-0 w-[293px] bg-white rounded-[24px] overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover grayscale"
                    sizes="293px"
                  />
                  <div className="absolute bottom-2 right-2 px-3 py-2 rounded-2xl bg-black/60">
                    <div className="flex items-center gap-1.5 text-white text-[12px]">
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {campaign.backers}
                    </div>
                  </div>
                </div>
                <div className="p-6 pb-[34px] flex flex-col gap-[25px]">
                  <h3 className="font-medium text-black text-[17px] leading-tight line-clamp-2">{campaign.title}</h3>
                  <div className="h-[6px] bg-[#FAFAFC] rounded-[8px] overflow-hidden">
                    <div
                      className="h-full rounded-[8px] bg-gradient-to-r from-[#7342E8] to-[#fc1750]"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-[#666] text-[12.5px]">
                    <span>Raised €{campaign.raised.toLocaleString()}</span>
                    <span className="flex-1 border-t border-dashed border-[#666]" />
                    <span>€{campaign.goal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#666] text-[12.5px]">
                    <span>Days remaining</span>
                    <span className="flex-1 border-t border-dashed border-[#666]" />
                    <span>{campaign.daysLeft}</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-1.5 h-[44px] rounded-[63px] bg-[#86e9be] text-black text-[12px] font-medium hover:bg-[#76d9ae] transition-colors">
                    Donate Now
                    <svg className="w-4 h-4 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
            {campaigns.map((campaign) => (
              <article
                key={`b-${campaign.id}`}
                className="flex-shrink-0 w-[293px] bg-white rounded-[24px] overflow-hidden shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover grayscale"
                    sizes="293px"
                  />
                  <div className="absolute bottom-2 right-2 px-3 py-2 rounded-2xl bg-black/60">
                    <div className="flex items-center gap-1.5 text-white text-[12px]">
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {campaign.backers}
                    </div>
                  </div>
                </div>
                <div className="p-6 pb-[34px] flex flex-col gap-[25px]">
                  <h3 className="font-medium text-black text-[17px] leading-tight line-clamp-2">{campaign.title}</h3>
                  <div className="h-[6px] bg-[#FAFAFC] rounded-[8px] overflow-hidden">
                    <div
                      className="h-full rounded-[8px] bg-gradient-to-r from-[#7342E8] to-[#fc1750]"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-[#666] text-[12.5px]">
                    <span>Raised €{campaign.raised.toLocaleString()}</span>
                    <span className="flex-1 border-t border-dashed border-[#666]" />
                    <span>€{campaign.goal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#666] text-[12.5px]">
                    <span>Days remaining</span>
                    <span className="flex-1 border-t border-dashed border-[#666]" />
                    <span>{campaign.daysLeft}</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-1.5 h-[44px] rounded-[63px] bg-[#86e9be] text-black text-[12px] font-medium hover:bg-[#76d9ae] transition-colors">
                    Donate Now
                    <svg className="w-4 h-4 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-white/70 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
