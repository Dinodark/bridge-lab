"use client";

import { use } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "../../translations";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  use(params); // unwrap for Next.js 15+ async params
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <div className="content-container">
      <Link
        href="/tribe-dev/events"
        className="inline-flex items-center gap-1.5 text-sm text-[#6E22F2] hover:text-[#7C3AED] transition-colors mb-6"
      >
        {t.back}
      </Link>

      <div className="rounded-2xl overflow-hidden h-48 sm:h-56 mb-5 shadow-sm">
        <img
          src="/assets/a4265d49136445efa1a4b56b561316f9_raw.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#EB5757]/10 text-[#EB5757] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EB5757] animate-pulse" />
          {t.live}
        </span>
        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F0F7F0] text-[#2D7A2D]">
          {t.onsite}
        </span>
      </div>

      <h1 className="text-xl font-semibold text-[#1E1E1E] mb-5">Community Meetup Berlin</h1>

      <div className="rounded-xl border border-[#E8EEF4] bg-white p-4 mb-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-active)] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#6E22F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">{t.date}</span>
              <p className="text-sm font-medium text-[#1E1E1E]">Samstag, 7. März 2026</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-active)] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#6E22F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">{t.time}</span>
              <p className="text-sm font-medium text-[#1E1E1E]">00:00 – 10:00</p>
            </div>
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-active)] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#6E22F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">{t.location}</span>
              <p className="text-sm font-medium text-[#1E1E1E]">Flughafen Berlin Brandenburg (BER) „Willy Brandt"</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-active)] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#6E22F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">{t.participants}</span>
              <p className="text-sm font-medium text-[#1E1E1E]">5 {t.participants}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#E8EEF4] bg-white p-4 mb-4 shadow-sm">
        <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2">{t.description}</h2>
        <p className="text-sm text-[#4B5563] leading-relaxed">
        Неформальная встреча участников сообщества OneTribe в зоне вылета аэропорта BER. Обсудим планы на сезон, поделимся идеями и познакомимся с новыми участниками за чашкой кофе.
      </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-[#E8EEF4] bg-white text-[#6B7280] hover:bg-[#FAFAFA] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {t.edit}
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-[#EB5757]/10 text-[#EB5757] hover:bg-[#EB5757]/20 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {t.cancelEvent}
        </button>
      </div>

      <div className="rounded-xl border border-[#E8EEF4] bg-white overflow-hidden mb-4 shadow-sm">
        <div className="px-4 py-3 border-b border-[#E8EEF4]">
          <h2 className="text-sm font-medium text-[#1E1E1E]">{t.locationTitle}</h2>
        </div>
        <div className="w-full aspect-[4/3] min-h-[200px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19490.232222631468!2d13.490575963232434!3d52.36536035328495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a846d3cf283051%3A0x9014409747516a08!2sBerlin%20Brandenburg%20Airport!5e0!3m2!1sen!2sde!4v1772848059691!5m2!1sen!2sde"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Berlin Brandenburg Airport"
          />
        </div>
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-3 text-sm text-[#6E22F2] hover:text-[#7C3AED] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {t.openInGoogleMaps}
        </Link>
      </div>

      <div className="rounded-xl border border-[#E8EEF4] bg-white p-4 shadow-sm">
        <h2 className="text-sm font-medium text-[#1E1E1E] mb-3">{t.participantsSection} (5)</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Mirjana Pavlovic", color: "bg-[#6E22F2]/20 text-[#6E22F2]", level: 12 },
            { name: "Marie-Claire", color: "bg-[#00D4FF]/20 text-[#0284C7]", level: 7 },
            { name: "Sabine Müller-Hartmann", color: "bg-[#C752FF]/20 text-[#9333EA]", level: 18 },
            { name: "Petra Schumann — TribeConnect", color: "bg-[#10B981]/20 text-[#059669]", level: 23 },
            { name: "Klaus Weber", color: "bg-[#F59E0B]/20 text-[#D97706]", level: 5 },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E8EEF4] bg-[#FAFAFA]"
            >
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${p.color}`}>
                  {p.name.charAt(0)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#0866FF] flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">
                  {p.level}
                </div>
              </div>
              <span className="text-sm font-medium text-[#1E1E1E]">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
