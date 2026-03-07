"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { T } from "../../translations";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomDatePicker from "@/components/ui/CustomDatePicker";

export default function CreateEventPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = T[lang];
  const [type, setType] = useState<"online" | "onsite" | "hybrid">("online");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(t.categoryOptions[0]);

  useEffect(() => {
    setCategory(t.categoryOptions[0]);
  }, [lang]);
  const [limitParticipants, setLimitParticipants] = useState(false);
  const [maxParticipants, setMaxParticipants] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");
  const [locationName, setLocationName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/tribe-dev/events");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/tribe-dev/events" className="inline-flex items-center gap-2 text-sm text-[#0866FF] hover:underline mb-8">
        {t.backToEvents}
      </Link>

      <h1 className="text-2xl font-bold text-[#1E1E1E] mb-8">{t.createEvent}</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.community}</label>
          <div className="h-12 px-4 rounded-lg border border-[#CCCCCC] bg-[#F2F2F2] flex items-center text-[#808080]">
            ONETRIBE
          </div>
          <p className="text-xs text-[#808080] mt-1">{t.chooseCommunity}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.eventTitle}</label>
          <input
            type="text"
            placeholder={t.eventTitlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={255}
            className="w-full h-12 px-4 rounded-lg border border-[#CCCCCC] bg-white placeholder:text-[#808080] focus:border-[#4D4D4D] focus:ring-2 focus:ring-[#E6E6E6] outline-none"
          />
          <p className="text-xs text-[#808080] mt-1">{title.length}/255</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.description}</label>
          <textarea
            placeholder={t.descriptionPlaceholder}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-[#CCCCCC] bg-white placeholder:text-[#808080] focus:border-[#4D4D4D] focus:ring-2 focus:ring-[#E6E6E6] outline-none resize-y"
          />
          <p className="text-xs text-[#808080] mt-1">{t.forRichText}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E1E1E] mb-3">{t.typeAndCategory}</label>
          <div className="flex gap-2 mb-4">
            {(["online", "onsite", "hybrid"] as const).map((typeKey) => (
              <button
                key={typeKey}
                type="button"
                onClick={() => setType(typeKey)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  type === typeKey
                    ? "bg-[#D0E6FC] border border-[#0866FF] text-[#0866FF]"
                    : "bg-white border border-[#E6E6E6] text-[#808080] hover:bg-[#F2F2F2]"
                }`}
              >
                {typeKey === "online" && (
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
                {typeKey === "onsite" && (
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                {typeKey === "hybrid" && (
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 014 10 10 10 0 01-4 10 10 10 0 01-4-10 10 10 0 014-10z" />
                  </svg>
                )}
                {typeKey === "online" ? t.online : typeKey === "onsite" ? t.onsite : t.hybrid}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-xs text-[#808080] mb-1">{t.category}</label>
            <CustomSelect
              value={category}
              onChange={setCategory}
              options={t.categoryOptions.map((opt) => ({ value: opt, label: opt }))}
              placeholder={t.categoryOptions[0]}
              className="w-full h-12"
            />
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#1E1E1E] mb-4">{t.dateAndTime}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.startDate}</label>
              <CustomDatePicker
                value={startDate}
                onChange={setStartDate}
                placeholder={t.selectStart}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.endDate}</label>
              <CustomDatePicker
                value={endDate}
                onChange={setEndDate}
                placeholder={t.selectEnd}
              />
            </div>
          </div>
          <p className="text-xs text-[#808080] mt-2">{t.timezone}</p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#1E1E1E] mb-4">{t.eventLocation}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.searchAddress}</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t.searchAddressPlaceholder}
                className="w-full h-12 px-4 rounded-lg border border-[#CCCCCC] bg-white placeholder:text-[#808080] focus:border-[#4D4D4D] focus:ring-2 focus:ring-[#E6E6E6] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.locationNameOptional}</label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder={t.locationNamePlaceholder}
                className="w-full h-12 px-4 rounded-lg border border-[#CCCCCC] bg-white placeholder:text-[#808080] focus:border-[#4D4D4D] focus:ring-2 focus:ring-[#E6E6E6] outline-none"
              />
              <p className="text-xs text-[#808080] mt-1">{t.locationNameHint}</p>
            </div>
          </div>
        </div>

        {type === "online" && (
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.meetingUrl}</label>
            <input
              type="url"
              placeholder={t.meetingUrlPlaceholder}
              className="w-full h-12 px-4 rounded-lg border border-[#CCCCCC] bg-white placeholder:text-[#808080] focus:border-[#4D4D4D] outline-none"
            />
            <p className="text-xs text-[#808080] mt-1">{t.linkVisibleBefore}</p>
          </div>
        )}

        <div>
          <h3 className="text-base font-bold text-[#1E1E1E] mb-4">{t.settings}</h3>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#1E1E1E]">{t.limitParticipants}</label>
            <button
              type="button"
              onClick={() => setLimitParticipants(!limitParticipants)}
              className={`w-12 h-6 rounded-full transition-colors ${
                limitParticipants ? "bg-[#0866FF]" : "bg-[#CCCCCC]"
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  limitParticipants ? "translate-x-[26px]" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-[#808080] mt-1">{t.limitParticipantsDesc}</p>
          {limitParticipants && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">{t.maxParticipantsLabel}</label>
              <input
                type="number"
                min={1}
                placeholder={t.maxParticipantsPlaceholder}
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-[#CCCCCC] bg-white placeholder:text-[#808080] focus:border-[#4D4D4D] focus:ring-2 focus:ring-[#E6E6E6] outline-none"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Link
            href="/tribe-dev/events"
            className="px-6 py-3 rounded-lg border border-[#CCCCCC] bg-white text-[#1E1E1E] font-medium hover:bg-[#F2F2F2] transition-colors"
          >
            {t.cancel}
          </Link>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #00D4FF 0%, #0055FF 100%)", boxShadow: "0px 8px 20px 1.14px rgba(1,170,255,0.3)" }}
          >
            {t.createEventSubmit}
          </button>
        </div>
      </form>
    </div>
  );
}
