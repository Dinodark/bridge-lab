"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const verifyCampaigns = [
  {
    id: 1,
    title: "Clean Water for Rural Communities",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop",
    overlay: "Clean water",
  },
  {
    id: 2,
    title: "Education for Refugee Children",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    overlay: "Education",
  },
  {
    id: 3,
    title: "Food Security Initiative",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop",
    overlay: "Food aid",
  },
];

export default function HelpVerifyCampaigns() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-content mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">Help Verify Campaigns</h2>
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
            {verifyCampaigns.map((campaign) => (
              <article
                key={campaign.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-200"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 33vw"
                  />
                  <div className="absolute inset-0 bg-zinc-900/30" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-zinc-900">
                    {campaign.overlay}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-zinc-900 mb-4">{campaign.title}</h3>
                  <Link
                    href={`/verify/${campaign.id}`}
                    className="inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800"
                  >
                    Review Campaign
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
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
