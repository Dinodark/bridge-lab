"use client";

import { useState, useCallback } from "react";

export default function DaoSphere() {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="relative w-40 h-40 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Сфера */}
      <div
        className={`relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center overflow-hidden transition-transform duration-500 ease-out cursor-pointer animate-dao-pulse ${
          isHovered ? "scale-110 dao-sphere-hover" : "scale-100"
        }`}
        style={{
          boxShadow:
            "0 0 60px rgba(178,137,249,0.4), 0 0 120px rgba(72,229,255,0.15)",
        }}
      >
      {/* Градиенты сферы */}
      <div className="absolute inset-0 rounded-full overflow-hidden z-[1]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #5a1fc9, #3d1590)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full dao-sphere-layer dao-sphere-cyan"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #48e5ff, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full dao-sphere-layer dao-sphere-violet"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #b289f9, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full dao-sphere-layer dao-sphere-pink"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #f989b4, transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center dao-sphere-text">
        <span className="text-[28px] font-extrabold tracking-tight relative inline-block">
          {"DAO".split("").map((char, i) => (
            <span key={i} className="dao-matrix-letter">
              {char}
            </span>
          ))}
          {/* Белые буквы поверх при hover — появляются из размытия, светятся */}
          <span className="dao-matrix-white absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center text-[28px] font-extrabold tracking-tight pointer-events-none">
            {"DAO".split("").map((char, i) => (
              <span key={`w-${i}`} className={`dao-matrix-letter-white dao-matrix-letter-white-${i + 1}`}>
                {char}
              </span>
            ))}
          </span>
        </span>
        <span className="relative block mt-0.5 h-[12px] w-full">
          <span className="dao-label dao-label-tribe dao-label-row">
            {"Tribe".split("").map((c, i) => (
              <span key={i} className={`dao-label-letter dao-label-letter-tribe-${i + 1} ${i === 1 ? "dao-label-flicker-1" : i === 2 ? "dao-label-flicker-3" : i === 3 ? "dao-label-flicker-2" : ""}`}>{c}</span>
            ))}
          </span>
          <span className="dao-label dao-label-bridge dao-label-row">
            {"bridge".split("").map((c, i) => (
              <span key={i} className={`dao-label-letter dao-label-letter-bridge-${i + 1} ${i === 1 ? "dao-label-flicker-1" : i === 2 ? "dao-label-flicker-3" : i === 3 ? "dao-label-flicker-2" : ""}`}>{c}</span>
            ))}
          </span>
        </span>
      </div>
      </div>
    </div>
  );
}
