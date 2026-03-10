"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "../translations";
import CustomSelect from "@/components/ui/CustomSelect";

const MOCK_EVENTS = [
  { id: "1", title: "test", date: "MÄR 7", time: "00:00", location: "Berlin Brandenburg (BER)", participants: "1", status: "live", typeKey: "onsite" as const },
  { id: "2", title: "test", date: "MÄR 8", time: "00:00", location: "Belarus", participants: "1/1", status: "upcoming", typeKey: "onsite" as const },
  { id: "3", title: "123", date: "MÄR 14", time: "00:00", location: "berlin", participants: "1/8", status: "upcoming", typeKey: "onsite" as const },
];

export default function EventsPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [showFilters, setShowFilters] = useState(false);
  const [community, setCommunity] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="content-container">
      <Link href="/tribe-dev" className="inline-flex items-center gap-2 text-sm text-[#0866FF] hover:underline mb-8">
        {t.backToTribeDev}
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">{t.myEvents}</h1>
          <p className="text-[#808080] mt-1">{t.myEventsDesc}</p>
        </div>
        <Link
          href="/tribe-dev/events/create"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #00D4FF 0%, #0055FF 100%)", boxShadow: "0px 8px 20px 1.14px rgba(1,170,255,0.3)" }}
        >
          {t.createEvent}
        </Link>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setTab("upcoming")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === "upcoming" ? "bg-[var(--color-bg-active)] border border-[#C4B5FD] text-[#6E22F2]" : "bg-[#FAFAFA] border border-[#EBEBEB] text-[#6B7280] hover:bg-[#F5F5F5]"
              }`}
            >
              {t.upcoming}
            </button>
            <button
              onClick={() => setTab("past")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === "past" ? "bg-[var(--color-bg-active)] border border-[#C4B5FD] text-[#6E22F2]" : "bg-[#FAFAFA] border border-[#EBEBEB] text-[#6B7280] hover:bg-[#F5F5F5]"
              }`}
            >
              {t.past}
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                showFilters ? "bg-[var(--color-bg-active)] border border-[#C4B5FD] text-[#6E22F2]" : "bg-[#FAFAFA] border border-[#EBEBEB] text-[#6B7280] hover:bg-[#F5F5F5]"
              }`}
              title={t.allCommunities}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-bg-active)] border border-[#C4B5FD] text-[#6E22F2] transition-colors"
            >
              {t.all}
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#FAFAFA] border border-[#EBEBEB] text-[#6B7280] hover:bg-[#F5F5F5] transition-colors"
            >
              {t.myEventsFilter}
            </button>
          </div>
        </div>
        {showFilters && (
          <div className="flex flex-wrap gap-4">
            <CustomSelect
              value={community}
              onChange={setCommunity}
              options={[{ value: "", label: t.allCommunities }]}
              placeholder={t.allCommunities}
              minWidth="180px"
            />
            <CustomSelect
              value={category}
              onChange={setCategory}
              options={[{ value: "", label: t.allCategories }]}
              placeholder={t.allCategories}
              minWidth="180px"
            />
          </div>
        )}
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xs font-semibold text-[#0866FF] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-[#0866FF]/40" />
            {t.today}
          </h2>
          <div className="space-y-3">
            {MOCK_EVENTS.filter((e) => e.date === "MÄR 7").map((ev) => (
              <EventCard key={ev.id} event={ev} t={t} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xs font-semibold text-[#0866FF] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-[#0866FF]/40" />
            {t.tomorrow}
          </h2>
          <div className="space-y-3">
            {MOCK_EVENTS.filter((e) => e.date === "MÄR 8").map((ev) => (
              <EventCard key={ev.id} event={ev} t={t} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xs font-semibold text-[#0866FF] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-[#0866FF]/40" />
            {t.nextWeek}
          </h2>
          <div className="space-y-3">
            {MOCK_EVENTS.filter((e) => e.date === "MÄR 14").map((ev) => (
              <EventCard key={ev.id} event={ev} t={t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function EventCard({ event, t }: { event: (typeof MOCK_EVENTS)[0]; t: (typeof T)["ru"] | (typeof T)["de"] }) {
  return (
    <Link
      href={`/tribe-dev/events/${event.id}`}
      className="group flex gap-5 p-5 rounded-2xl border border-[#E8EEF4] bg-white shadow-sm hover:shadow-md hover:border-[#0866FF]/20 transition-all duration-200 ease-out"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0055FF] flex flex-col items-center justify-center text-white flex-shrink-0 shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">{event.date.split(" ")[0]}</span>
        <span className="text-lg font-bold leading-tight">{event.date.split(" ")[1]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-[#1E1E1E] group-hover:text-[#0866FF] transition-colors">{event.title}</h3>
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
              event.status === "live" ? "bg-[#EB5757]/10 text-[#EB5757]" : "bg-[#D0E6FC]/80 text-[#0866FF]"
            }`}
          >
            {event.status === "live" ? t.live : t.upcomingStatus}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs bg-[#F0F7F0] text-[#2D7A2D] flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t[event.typeKey]}
          </span>
        </div>
        <div className="flex items-center gap-5 mt-3 text-sm text-[#6B7280]">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {event.participants} {t.participants}
          </span>
        </div>
      </div>
      {event.status === "upcoming" && (
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white self-center transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shrink-0"
          style={{ background: "linear-gradient(135deg, #00D4FF 0%, #0055FF 100%)", boxShadow: "0 4px 14px rgba(0, 85, 255, 0.25)" }}
        >
          {t.join}
        </button>
      )}
    </Link>
  );
}
