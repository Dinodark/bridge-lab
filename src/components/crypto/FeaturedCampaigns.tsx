"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const campaigns = [
  {
    id: 1,
    title: "Eine junge Mutter ging viel zu früh - Wir brauchen dich!",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
    overlay: "Save the children",
    raised: 4500,
    goal: 10000,
    daysLeft: 0,
  },
  {
    id: 2,
    title: "Clean Water for Rural Communities",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    overlay: "Clean water",
    raised: 2300,
    goal: 5000,
    daysLeft: 12,
  },
  {
    id: 3,
    title: "Medical Support for Refugees",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    overlay: "Healthcare",
    raised: 8900,
    goal: 15000,
    daysLeft: 5,
  },
];

export default function FeaturedCampaigns() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="campaigns" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="max-w-content mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">Featured Campaigns</h2>
        <p className="text-zinc-600 mb-6 sm:mb-8">They need your help.</p>

        <div className="relative overflow-hidden lg:overflow-visible">
          <button
            onClick={() => scroll("left")}
            className="group hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 text-zinc-700 items-center justify-center transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-zinc-400 group-hover:shadow-[0_0_24px_rgba(0,0,0,0.08)] group-hover:bg-white" />
            <svg className="relative w-10 h-10 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-scroll overflow-y-hidden pb-4 scrollbar-hide scroll-smooth scroll-x-mobile lg:grid lg:grid-cols-3 lg:overflow-visible lg:overflow-x-visible"
          >
            {campaigns.map((campaign) => (
              <article
                key={campaign.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 33vw"
                  />
                  <div className="absolute inset-0 bg-zinc-900/40" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-zinc-900">
                    {campaign.overlay}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-zinc-900 mb-3 line-clamp-2">{campaign.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600">Raised Crypto</span>
                      <span className="font-medium">{campaign.daysLeft} days left</span>
                    </div>
                    <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-900 rounded-full"
                        style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Remaining</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-full border border-zinc-300 text-zinc-700 text-sm font-medium hover:bg-zinc-50">
                      Intervenieren +
                    </button>
                    <Link
                      href={`/campaign/${campaign.id}`}
                      className="flex-1 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium text-center hover:bg-zinc-800"
                    >
                      Donate Now +
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="group hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 text-zinc-700 items-center justify-center transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-hover:border-zinc-400 group-hover:shadow-[0_0_24px_rgba(0,0,0,0.08)] group-hover:bg-white" />
            <svg className="relative w-10 h-10 translate-x-1 transition-transform duration-300 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
