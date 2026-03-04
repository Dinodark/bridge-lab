"use client";

import { useState } from "react";

export default function MerchPage() {
  const [isBlack, setIsBlack] = useState(false);

  const bg = isBlack ? "#1E1E1E" : "#FFFFFF";
  const printColor = isBlack ? "white" : "#1E1E1E";
  const accentGradient = "url(#grad1)";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter Tight', 'Inter', sans-serif",
        gap: 32,
      }}
    >
      {/* Toggle */}
      <div style={{ display: "flex", gap: 12 }}>
        {["Белая", "Чёрная"].map((label, i) => (
          <button
            key={i}
            onClick={() => setIsBlack(i === 1)}
            style={{
              padding: "10px 28px",
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              background:
                (i === 1) === isBlack
                  ? "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4, #FFBC6F)"
                  : "#E6E6E6",
              color: (i === 1) === isBlack ? "white" : "#808080",
              transition: "all 0.3s ease",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* T-shirt SVG */}
      <svg
        viewBox="0 0 520 560"
        width={420}
        style={{
          filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.15))",
          transition: "all 0.4s ease",
        }}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48E5FF" />
            <stop offset="33%" stopColor="#B289F9" />
            <stop offset="66%" stopColor="#F989B4" />
            <stop offset="100%" stopColor="#FFBC6F" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6E22F2" />
            <stop offset="100%" stopColor="#C752FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* T-shirt shape */}
        <path
          d="M 60 80
             L 0 180 L 80 210 L 80 520 L 440 520 L 440 210 L 520 180 L 460 80
             C 430 90 390 110 350 115
             C 330 148 300 168 260 168
             C 220 168 190 148 170 115
             C 130 110 90 90 60 80 Z"
          fill={bg}
          stroke={isBlack ? "#333" : "#E0E0E0"}
          strokeWidth="1.5"
          style={{ transition: "all 0.4s ease" }}
        />

        {/* Ambient glow blob on shirt */}
        <ellipse
          cx="260"
          cy="290"
          rx="110"
          ry="80"
          fill="url(#grad1)"
          opacity={isBlack ? 0.15 : 0.08}
          filter="url(#glow)"
        />

        {/* Logo area - center chest */}
        <g transform="translate(200, 230)">
          {/* Outer ring */}
          <circle
            cx="60"
            cy="40"
            r="38"
            fill="none"
            stroke={accentGradient}
            strokeWidth="2.5"
            opacity="0.6"
          />
          {/* Inner symbol — triangle representing tribe/peak */}
          <polygon
            points="60,8 92,62 28,62"
            fill="none"
            stroke={accentGradient}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Center dot */}
          <circle cx="60" cy="40" r="4" fill="url(#grad1)" />

          {/* ONETRIBE text */}
          <text
            x="60"
            y="100"
            textAnchor="middle"
            fill={printColor}
            fontSize="15"
            fontWeight="700"
            fontFamily="'Inter Tight', 'Inter', sans-serif"
            letterSpacing="4"
            style={{ transition: "fill 0.4s ease" }}
          >
            ONETRIBE
          </text>
          <text
            x="60"
            y="118"
            textAnchor="middle"
            fill={isBlack ? "#808080" : "#B0B0B0"}
            fontSize="8"
            fontWeight="400"
            fontFamily="'Inter Tight', 'Inter', sans-serif"
            letterSpacing="3"
          >
            ONE WORLD · ONE TRIBE
          </text>
        </g>
      </svg>

      {/* Label */}
      <div
        style={{
          textAlign: "center",
          color: "#808080",
          fontSize: 13,
          letterSpacing: 1,
        }}
      >
        OneTribe Merch · Classic Tee · {isBlack ? "Black" : "White"}
      </div>
    </div>
  );
}
