"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    name: "Josh Blackman",
    role: "Head of Culture",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bridge is transforming how we think about charitable impact.",
  },
  {
    name: "Sarah Chen",
    role: "Community Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "The transparency and traceability of blockchain charity is revolutionary. Every donor can see exactly where their contribution goes.",
  },
];

export default function BuiltByBelievers() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Built by Believers
        </h2>
        <p className="text-white/70 text-center mb-12">
          Our team is committed to making charity transparent and impactful
        </p>
        <div className="relative overflow-hidden rounded-2xl">
          {/* Свечение под блоком — широкое, лёгкое, насыщенное */}
          <div
            className="absolute -inset-16 -z-10 rounded-3xl opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 50% 120%, rgba(139, 92, 246, 0.35), rgba(34, 211, 238, 0.2) 30%, transparent 60%)",
            }}
          />
          <div className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md overflow-hidden">
            <div
              className="absolute top-4 right-4 w-3 h-3 bg-violet-400/40 rounded-sm"
              aria-hidden
            />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-violet-400">{t.role}</div>
                </div>
              </div>
              <p className="mt-6 text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
                  className="p-2 rounded-full btn-ghost-violet"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))}
                  className="p-2 rounded-full btn-ghost-violet"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
