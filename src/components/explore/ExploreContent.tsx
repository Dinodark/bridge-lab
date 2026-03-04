"use client";

import { useState } from "react";
import CampaignCard from "./CampaignCard";

const categories = [
  { id: "new", label: "New", active: true },
  { id: "children", label: "Children" },
  { id: "health", label: "Health" },
  { id: "education", label: "Education" },
  { id: "animals", label: "Animals" },
  { id: "emergency", label: "Emergency" },
];

const campaigns = [
  {
    id: 1,
    title: "Eine junge Mutter ging viel zu früh - Wir brauchen dich!",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=400&fit=crop",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 65,
  },
  {
    id: 2,
    title: "Supporta il progetto Fuck Cancer di @pettor_ale",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 72,
  },
  {
    id: 3,
    title: "Support Sienna's Recovery From a Rare Brain Condition",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 45,
  },
  {
    id: 4,
    title: "Healing Support for BLUE LINE Stabbing Survivor",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
    raised: 137650,
    goal: 160000,
    daysLeft: 35,
    progress: 86,
  },
];

export default function ExploreContent() {
  const [activeCategory, setActiveCategory] = useState("new");
  const [filter, setFilter] = useState<"active" | "completed">("active");

  return (
    <main className="mt-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#9550ff] mb-2 inline-flex items-center gap-3">
          Explore Cases
          <span className="text-red-500">❤</span>
          <span className="text-[#282b33]">190</span>
        </h1>
        <p className="text-[#959aa8] text-lg">Find projects that matter to you</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0 space-y-6">
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-2xl text-left font-semibold transition-colors ${
                  cat.active
                    ? "bg-[#9550ff] text-white"
                    : "bg-white text-[#9550ff] hover:bg-[#9550ff]/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-[#959aa8] text-sm mb-1">This week raised</p>
            <p className="text-2xl font-bold text-[#282b33]">$458 521 570</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-[#959aa8] text-sm mb-1">Most active category</p>
            <p className="text-2xl font-bold text-[#282b33]">7520</p>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#959aa8]/30 bg-white">
              <span className="text-[#282b33]">All countries</span>
              <svg className="w-5 h-5 text-[#959aa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex rounded-xl overflow-hidden border border-[#959aa8]/30">
              <button
                onClick={() => setFilter("active")}
                className={`px-6 py-3 font-semibold text-sm ${
                  filter === "active" ? "bg-[#9550ff] text-white" : "bg-white text-[#282b33]"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-6 py-3 font-semibold text-sm ${
                  filter === "completed" ? "bg-[#9550ff] text-white" : "bg-white text-[#282b33]"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {campaigns.map((c) => (
              <CampaignCard
                key={c.id}
                id={c.id}
                title={c.title}
                image={c.image}
                raised={c.raised}
                goal={c.goal}
                daysLeft={c.daysLeft}
                progress={c.progress}
                donations="2.5k donations"
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#9550ff] mb-6">Featured Project</h2>
          <div className="overflow-hidden">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-x-mobile">
              {campaigns.map((c) => (
                <div key={`f-${c.id}`} className="flex-shrink-0 w-[350px] sm:w-[400px]">
                  <CampaignCard
                    id={c.id}
                    title={c.title}
                    image={c.image}
                    raised={c.raised}
                    goal={c.goal}
                    daysLeft={c.daysLeft}
                    progress={c.progress}
                    donations="2.5k donations"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
