"use client";

import { useState, useEffect } from "react";

// ============================================================
// BRAND DATA — меняй под любой проект
// ============================================================
const BRAND = {
  name: "OneTribe",
  tagline: "One World · One Tribe",
  description:
    "Децентрализованная социальная экосистема для настоящих людей. Онлайн-сообщество, которое становится офлайн-движением.",
  personality: ["Authentic", "Bold", "Human", "Free", "Alive"],
  voice: [
    "Говорим прямо",
    "Без корпоративного языка",
    "С энергией движения",
    "Вдохновляем, не продаём",
  ],
  colors: {
    primary: [
      { name: "Electric Blue", hex: "#48E5FF", use: "Акценты, CTA, highlights" },
      { name: "Soft Violet", hex: "#B289F9", use: "Основной градиент, фоны" },
      { name: "Warm Pink", hex: "#F989B4", use: "Акценты, иллюстрации" },
      { name: "Peach Gold", hex: "#FFBC6F", use: "Тепло, финансовые смыслы" },
    ],
    secondary: [
      { name: "Deep Purple", hex: "#6E22F2", use: "CTA кнопки, заголовки" },
      { name: "Bright Purple", hex: "#C752FF", use: "Градиент 2, акценты" },
      { name: "Link Blue", hex: "#0866FF", use: "Ссылки, интерактив" },
      { name: "Coral", hex: "#FD6F6E", use: "Уведомления, важное" },
    ],
    neutral: [
      { name: "Black", hex: "#1E1E1E", use: "Основной текст" },
      { name: "Gray", hex: "#808080", use: "Secondary text" },
      { name: "Light Gray", hex: "#E6E6E6", use: "Borders, dividers" },
      { name: "Off White", hex: "#FCFCFC", use: "Фоны секций" },
      { name: "White", hex: "#FFFFFF", use: "Основной фон" },
    ],
    gradients: [
      {
        name: "Gradient 1 — Spectrum",
        value: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4, #FFBC6F)",
        css: "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4, #FFBC6F)",
      },
      {
        name: "Gradient 2 — Purple",
        value: "linear-gradient(135deg, #6E22F2, #C752FF)",
        css: "linear-gradient(135deg, #6E22F2, #C752FF)",
      },
    ],
  },
  typography: {
    font: "Inter Tight",
    fallback: "Inter, sans-serif",
    scale: [
      {
        name: "Display",
        size: "64px",
        weight: "800",
        lh: "1.1",
        ls: "-0.02em",
        use: "Hero заголовки",
      },
      {
        name: "H1",
        size: "48px",
        weight: "700",
        lh: "1.15",
        ls: "-0.01em",
        use: "Заголовки страниц",
      },
      {
        name: "H2",
        size: "36px",
        weight: "700",
        lh: "1.2",
        ls: "-0.01em",
        use: "Секции",
      },
      {
        name: "H3",
        size: "24px",
        weight: "600",
        lh: "1.3",
        ls: "0",
        use: "Подзаголовки",
      },
      {
        name: "Body L",
        size: "18px",
        weight: "400",
        lh: "1.6",
        ls: "0",
        use: "Основной текст",
      },
      {
        name: "Body M",
        size: "16px",
        weight: "400",
        lh: "1.6",
        ls: "0",
        use: "UI текст",
      },
      {
        name: "Caption",
        size: "12px",
        weight: "500",
        lh: "1.4",
        ls: "0.04em",
        use: "Подписи, labels",
      },
      {
        name: "Overline",
        size: "11px",
        weight: "600",
        lh: "1.4",
        ls: "0.1em",
        use: "Категории, теги",
      },
    ],
  },
};

const NAV = [
  { id: "foundation", label: "Foundation", icon: "◈" },
  { id: "colors", label: "Colors", icon: "◉" },
  { id: "typography", label: "Typography", icon: "Aa" },
  { id: "logo", label: "Logo", icon: "◎" },
  { id: "iconography", label: "Icons", icon: "⬡" },
  { id: "imagery", label: "Imagery", icon: "▣" },
  { id: "motion", label: "Motion", icon: "◌" },
  { id: "patterns", label: "Patterns", icon: "⊞" },
  { id: "layout", label: "Layout", icon: "▦" },
  { id: "applications", label: "Applications", icon: "◧" },
];

function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      style={{
        background: copied ? "#1E1E1E" : "rgba(0,0,0,0.07)",
        color: copied ? "#fff" : "#666",
        border: "none",
        cursor: "pointer",
        borderRadius: 6,
        padding: "3px 8px",
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "monospace",
        transition: "all 0.2s",
      }}
    >
      {copied ? "✓ copied" : text}
    </button>
  );
}

function ColorSwatch({
  color,
}: {
  color: { name: string; hex: string; use: string };
}) {
  const isLight =
    color.hex === "#FFFFFF" ||
    color.hex === "#FCFCFC" ||
    color.hex === "#E6E6E6";
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        background: "#fff",
      }}
    >
      <div
        style={{
          height: 80,
          background: color.hex,
          border: isLight ? "1px solid #E6E6E6" : "none",
        }}
      />
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: "#1E1E1E",
            marginBottom: 2,
          }}
        >
          {color.name}
        </div>
        <div style={{ fontSize: 11, color: "#808080", marginBottom: 8 }}>
          {color.use}
        </div>
        <CopyBadge text={color.hex} />
      </div>
    </div>
  );
}

function GradientSwatch({
  g,
}: {
  g: { name: string; value: string; css: string };
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(g.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ height: 80, background: g.value }} />
      <div style={{ padding: "12px 14px", background: "#fff" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: "#1E1E1E",
            marginBottom: 8,
          }}
        >
          {g.name}
        </div>
        <button
          onClick={copy}
          style={{
            background: copied ? "#1E1E1E" : "rgba(0,0,0,0.07)",
            color: copied ? "#fff" : "#666",
            border: "none",
            cursor: "pointer",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 10,
            fontFamily: "monospace",
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓ copied" : "copy CSS"}
        </button>
      </div>
    </div>
  );
}

function TshirtMockup({ dark }: { dark: boolean }) {
  const bg = dark ? "#1E1E1E" : "#FFFFFF";
  const textColor = dark ? "#FFFFFF" : "#1E1E1E";
  const strokeColor = dark ? "#2a2a2a" : "#E0E0E0";
  return (
    <svg
      viewBox="0 0 520 540"
      style={{
        width: "100%",
        maxWidth: 280,
        filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.15))",
      }}
    >
      <defs>
        <linearGradient id="tg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#48E5FF" />
          <stop offset="33%" stopColor="#B289F9" />
          <stop offset="66%" stopColor="#F989B4" />
          <stop offset="100%" stopColor="#FFBC6F" />
        </linearGradient>
        <filter id="tglow">
          <feGaussianBlur stdDeviation="20" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M60 80 L0 180 L80 210 L80 510 L440 510 L440 210 L520 180 L460 80 C430 90 390 110 350 115 C330 148 300 165 260 165 C220 165 190 148 170 115 C130 110 90 90 60 80Z"
        fill={bg}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <ellipse
        cx="260"
        cy="300"
        rx="100"
        ry="70"
        fill="url(#tg1)"
        opacity={dark ? 0.12 : 0.07}
        filter="url(#tglow)"
      />
      <circle
        cx="260"
        cy="272"
        r="42"
        fill="none"
        stroke="url(#tg1)"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <polygon
        points="260,242 290,292 230,292"
        fill="none"
        stroke="url(#tg1)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="260" cy="272" r="5" fill="url(#tg1)" />
      <text
        x="260"
        y="332"
        textAnchor="middle"
        fill={textColor}
        fontSize="14"
        fontWeight="700"
        letterSpacing="4"
        fontFamily="Inter,sans-serif"
      >
        ONETRIBE
      </text>
      <text
        x="260"
        y="348"
        textAnchor="middle"
        fill="#B289F9"
        fontSize="8"
        fontWeight="500"
        letterSpacing="3"
        fontFamily="Inter,sans-serif"
      >
        ONE WORLD · ONE TRIBE
      </text>
    </svg>
  );
}

function StoriesMockup() {
  return (
    <div
      style={{
        width: 160,
        height: 284,
        borderRadius: 20,
        background:
          "linear-gradient(160deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#48E5FF",
          opacity: 0.25,
          filter: "blur(25px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 10,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "#B289F9",
          opacity: 0.3,
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 40,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#F989B4",
          opacity: 0.2,
          filter: "blur(18px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#48E5FF,#B289F9,#F989B4)",
            }}
          />
          <span
            style={{
              color: "#fff",
              fontSize: 9,
              fontWeight: 600,
              fontFamily: "Inter,sans-serif",
            }}
          >
            onetribe
          </span>
        </div>
        <div>
          <div
            style={{
              fontSize: 7,
              color: "#B289F9",
              fontWeight: 600,
              letterSpacing: 2,
              marginBottom: 6,
              fontFamily: "Inter,sans-serif",
            }}
          >
            TRIBE AWAKENING
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#fff",
              fontWeight: 700,
              lineHeight: 1.3,
              fontFamily: "Inter,sans-serif",
              marginBottom: 8,
            }}
          >
            Ты готов к настоящему?
          </div>
          <div
            style={{
              fontSize: 8,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
              fontFamily: "Inter,sans-serif",
            }}
          >
            Одно племя. Один вектор. Начни сегодня.
          </div>
          <div
            style={{
              marginTop: 10,
              background: "linear-gradient(90deg,#6E22F2,#C752FF)",
              borderRadius: 20,
              padding: "5px 10px",
              display: "inline-block",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 8,
                fontWeight: 700,
                fontFamily: "Inter,sans-serif",
              }}
            >
              Присоединиться →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 64 }}>
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#B289F9",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Brand Guidelines
        </div>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#1E1E1E",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 16,
              color: "#808080",
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

export default function BrandGuidelinesPage() {
  const [active, setActive] = useState("foundation");

  const scrollTo = (id: string) => {
    setActive(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActive(n.id);
            break;
          }
        }
      }
    };
    const container = document.getElementById("scroll-container");
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter Tight', Inter, sans-serif",
        background: "#FCFCFC",
      }}
    >
      {/* Sidebar — sticky с прокруткой навигации */}
      <div
        style={{
          width: 200,
          flexShrink: 0,
          alignSelf: "flex-start",
          position: "sticky",
          top: 40,
          height: "calc(100vh - 40px)",
          background: "#fff",
          borderRight: "1px solid #E6E6E6",
          display: "flex",
          flexDirection: "column",
          padding: "24px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "0 20px 24px",
            borderBottom: "1px solid #E6E6E6",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, #48E5FF, #B289F9, #F989B4, #FFBC6F)",
              marginBottom: 10,
            }}
          />
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#1E1E1E",
              letterSpacing: "-0.01em",
            }}
          >
            OneTribe
          </div>
          <div style={{ fontSize: 10, color: "#808080", marginTop: 2 }}>
            Brand Guidelines v1.0
          </div>
        </div>
        <nav
          style={{
            padding: "16px 0",
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "9px 20px",
                border: "none",
                cursor: "pointer",
                background:
                  active === n.id
                    ? "linear-gradient(90deg, rgba(178,137,249,0.12), transparent)"
                    : "transparent",
                borderLeft:
                  active === n.id ? "3px solid #B289F9" : "3px solid transparent",
                color: active === n.id ? "#6E22F2" : "#808080",
                fontSize: 13,
                fontWeight: active === n.id ? 700 : 500,
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 14, opacity: 0.7 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div
        id="scroll-container"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "48px 56px",
          scrollPaddingTop: 60,
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: 64,
            padding: 48,
            borderRadius: 24,
            background:
              "linear-gradient(135deg, #48E5FF08, #B289F915, #F989B410, #FFBC6F08)",
            border: "1px solid #E6E6E6",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "#B289F9",
              opacity: 0.08,
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: 100,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "#48E5FF",
              opacity: 0.1,
              filter: "blur(35px)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#B289F9",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Brand Guidelines
            </div>
            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: "#1E1E1E",
                margin: "0 0 8px",
                letterSpacing: "-0.03em",
              }}
            >
              OneTribe
            </h1>
            <p
              style={{
                fontSize: 20,
                background:
                  "linear-gradient(90deg,#48E5FF,#B289F9,#F989B4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                margin: "0 0 16px",
              }}
            >
              One World · One Tribe
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#808080",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: 0,
              }}
            >
              {BRAND.description}
            </p>
          </div>
        </div>

        {/* 1. FOUNDATION */}
        <div id="foundation" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Brand Foundation"
            subtitle="Душа бренда — зачем мы существуем и во что верим"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                {
                  label: "Mission",
                  text: "Создать экосистему для настоящих человеческих связей — без алгоритмов, ботов и фальши",
                },
                {
                  label: "Vision",
                  text: "Мир, где онлайн-сообщества становятся реальными движениями, меняющими жизни людей",
                },
                {
                  label: "Values",
                  text: "Подлинность · Свобода · Сообщество · Рост · Децентрализация",
                },
                {
                  label: "Positioning",
                  text: "Новая здоровая социальная сеть — настоящие встречи, настоящие люди, реальное взаимодействие",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: 24,
                    borderRadius: 16,
                    background: "#fff",
                    border: "1px solid #E6E6E6",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#B289F9",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#1E1E1E",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Brand Personality
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {BRAND.personality.map((p) => (
                  <span
                    key={p}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 100,
                      background:
                        "linear-gradient(135deg,#48E5FF15,#B289F920)",
                      border: "1px solid #B289F940",
                      color: "#6E22F2",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Brand Voice
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {BRAND.voice.map((v) => (
                  <div
                    key={v}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                      color: "#1E1E1E",
                    }}
                  >
                    <span style={{ color: "#48E5FF", fontSize: 16 }}>→</span>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* 2. COLORS */}
        <div id="colors" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Color System"
            subtitle="Палитра, которая передаёт энергию, жизнь и движение"
          >
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Primary Palette
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 12,
                }}
              >
                {BRAND.colors.primary.map((c) => (
                  <ColorSwatch key={c.hex} color={c} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Secondary / Accent
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 12,
                }}
              >
                {BRAND.colors.secondary.map((c) => (
                  <ColorSwatch key={c.hex} color={c} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Neutral Palette
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5,1fr)",
                  gap: 12,
                }}
              >
                {BRAND.colors.neutral.map((c) => (
                  <ColorSwatch key={c.hex} color={c} />
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E1E1E",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Gradients
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {BRAND.colors.gradients.map((g) => (
                  <GradientSwatch key={g.name} g={g} />
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* 3. TYPOGRAPHY */}
        <div id="typography" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Typography"
            subtitle="Inter Tight — чистый, современный, человечный"
          >
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Typeface
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 24,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 64,
                    fontWeight: 800,
                    color: "#1E1E1E",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  Aa
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 4,
                    }}
                  >
                    Inter Tight
                  </div>
                  <div style={{ fontSize: 13, color: "#808080" }}>
                    Primary typeface · All weights 100–900
                  </div>
                  <div style={{ fontSize: 13, color: "#808080", marginTop: 2 }}>
                    google.com/fonts/specimen/Inter+Tight
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 20,
                  fontSize: 18,
                  color: "#808080",
                  letterSpacing: "0.05em",
                }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 !@#$%&*()
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Type Scale
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {BRAND.typography.scale.map((t, i) => (
                  <div
                    key={t.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 24,
                      padding: "14px 0",
                      borderBottom:
                        i < BRAND.typography.scale.length - 1
                          ? "1px solid #F0F0F0"
                          : "none",
                    }}
                  >
                    <div style={{ width: 80, flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#B289F9",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#808080",
                          marginTop: 2,
                        }}
                      >
                        {t.size} / {t.weight}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        fontSize: t.size,
                        fontWeight: t.weight as React.CSSProperties["fontWeight"],
                        letterSpacing: t.ls,
                        lineHeight: t.lh,
                        color: "#1E1E1E",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.name === "Display"
                        ? "One Tribe"
                        : t.name === "H1"
                          ? "Начало нового мира"
                          : t.name === "H2"
                            ? "Настоящие люди, настоящие встречи"
                            : t.name === "H3"
                              ? "Присоединись к движению"
                              : t.name === "Overline"
                                ? "TRIBE AWAKENING"
                                : "Мы создаём экосистему для жизни завтрашнего дня"}
                    </div>
                    <div
                      style={{
                        width: 100,
                        flexShrink: 0,
                        fontSize: 10,
                        color: "#808080",
                        textAlign: "right",
                      }}
                    >
                      {t.use}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* 4. LOGO */}
        <div id="logo" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Logo System"
            subtitle="Правила использования и охранное поле"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  padding: 40,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#808080",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Light Background
                </div>
                <svg viewBox="0 0 120 120" width={80}>
                  <defs>
                    <linearGradient
                      id="lg1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#48E5FF" />
                      <stop offset="50%" stopColor="#B289F9" />
                      <stop offset="100%" stopColor="#F989B4" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#lg1)"
                    strokeWidth="3"
                  />
                  <polygon
                    points="60,22 92,78 28,78"
                    fill="none"
                    stroke="url(#lg1)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <circle cx="60" cy="60" r="7" fill="url(#lg1)" />
                </svg>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#1E1E1E",
                  }}
                >
                  ONETRIBE
                </div>
              </div>
              <div
                style={{
                  padding: 40,
                  borderRadius: 16,
                  background: "#1E1E1E",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#808080",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Dark Background
                </div>
                <svg viewBox="0 0 120 120" width={80}>
                  <defs>
                    <linearGradient
                      id="lg2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#48E5FF" />
                      <stop offset="50%" stopColor="#B289F9" />
                      <stop offset="100%" stopColor="#F989B4" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#lg2)"
                    strokeWidth="3"
                  />
                  <polygon
                    points="60,22 92,78 28,78"
                    fill="none"
                    stroke="url(#lg2)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <circle cx="60" cy="60" r="7" fill="url(#lg2)" />
                </svg>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#fff",
                  }}
                >
                  ONETRIBE
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#B289F9",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Do / Don&apos;t
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#22C55E",
                      marginBottom: 10,
                    }}
                  >
                    ✓ DO
                  </div>
                  {[
                    "Использовать оригинальные цвета бренда",
                    "Соблюдать охранное поле (мин. 16px)",
                    "Использовать на контрастном фоне",
                    "Сохранять пропорции логотипа",
                  ].map((d) => (
                    <div
                      key={d}
                      style={{
                        fontSize: 12,
                        color: "#1E1E1E",
                        marginBottom: 6,
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "#22C55E", flexShrink: 0 }}>✓</span>
                      {d}
                    </div>
                  ))}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#EF4444",
                      marginBottom: 10,
                    }}
                  >
                    ✗ DON&apos;T
                  </div>
                  {[
                    "Растягивать или деформировать",
                    "Менять цвета на нефирменные",
                    "Добавлять тени или обводки",
                    "Размещать на пёстром фоне без подложки",
                  ].map((d) => (
                    <div
                      key={d}
                      style={{
                        fontSize: 12,
                        color: "#1E1E1E",
                        marginBottom: 6,
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "#EF4444", flexShrink: 0 }}>✗</span>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 5. ICONOGRAPHY */}
        <div id="iconography" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Iconography"
            subtitle="Стиль иконок — outline, 2px stroke, скруглённые концы"
          >
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  padding: "16px 0",
                }}
              >
                {[
                  {
                    d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                    label: "Community",
                  },
                  {
                    d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
                    label: "People",
                  },
                  {
                    d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
                    label: "Chat",
                  },
                  {
                    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                    label: "Trust",
                  },
                  {
                    d: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10A15.3 15.3 0 018 12a15.3 15.3 0 014-10z",
                    label: "Global",
                  },
                  {
                    d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
                    label: "Energy",
                  },
                  {
                    d: "M12 20V10M18 20V4M6 20v-4",
                    label: "Growth",
                  },
                  {
                    d: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
                    label: "Love",
                  },
                ].map((icon) => (
                  <div
                    key={icon.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "#FCFCFC",
                        border: "1px solid #E6E6E6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width={22}
                        fill="none"
                        stroke="#6E22F2"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={icon.d} />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#808080",
                        fontWeight: 500,
                      }}
                    >
                      {icon.label}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "#FCFCFC",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div style={{ fontSize: 11, color: "#808080" }}>
                  <strong style={{ color: "#1E1E1E" }}>Стиль:</strong> Outline ·{" "}
                  <strong style={{ color: "#1E1E1E" }}>Stroke:</strong> 1.8–2px
                  · <strong style={{ color: "#1E1E1E" }}>Grid:</strong> 24×24px ·{" "}
                  <strong style={{ color: "#1E1E1E" }}>Corner:</strong> Round ·{" "}
                  <strong style={{ color: "#1E1E1E" }}>Color:</strong> Brand
                  Purple / Gradient
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 6. IMAGERY */}
        <div id="imagery" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Imagery & Photography"
            subtitle="Визуальный язык, который транслирует ценности бренда"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#22C55E",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  ✓ Используем
                </div>
                {[
                  "Живые моменты, не постановочные",
                  "Люди в настоящих ситуациях",
                  "Тёплые, натуральные тона",
                  "Офлайн-встречи и события",
                  "Эмоции: радость, концентрация, связь",
                  "Естественный свет",
                ].map((i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 13,
                      color: "#1E1E1E",
                      marginBottom: 7,
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#22C55E" }}>✓</span>
                    {i}
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#EF4444",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  ✗ Избегаем
                </div>
                {[
                  "Стоковые улыбающиеся офисные люди",
                  "Перенасыщенные фильтры",
                  "Холодный корпоративный стиль",
                  "Изолированные объекты на белом",
                  "Клише: рукопожатия, галочки",
                  "Постановочное счастье",
                ].map((i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 13,
                      color: "#1E1E1E",
                      marginBottom: 7,
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#EF4444" }}>✗</span>
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 24,
                borderRadius: 16,
                background: "linear-gradient(135deg,#48E5FF08,#B289F912)",
                border: "1px solid #B289F930",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Visual Treatment
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#1E1E1E",
                  lineHeight: 1.7,
                }}
              >
                Декоративные элементы — размытые градиентные пятна с мягкими
                краями. Эффект глубины резкости. Создают ощущение живого медиа,
                динамики и воздуха. Всегда на светлом или тёмном фоне, никогда
                не перекрывают основной контент.
              </div>
            </div>
          </Section>
        </div>

        {/* 7. MOTION */}
        <div id="motion" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Motion & Animation"
            subtitle="Движение, которое вдохновляет — не раздражает"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              {[
                {
                  name: "Easing",
                  value: "ease-out",
                  note: "Для появлений и переходов",
                },
                {
                  name: "Duration S",
                  value: "200ms",
                  note: "Hover, micro-interactions",
                },
                {
                  name: "Duration M",
                  value: "400ms",
                  note: "Переходы между экранами",
                },
                {
                  name: "Duration L",
                  value: "600ms",
                  note: "Hero-анимации, intro",
                },
                {
                  name: "Blur Glow",
                  value: "20–40px",
                  note: "Декоративные пятна",
                },
                {
                  name: "Opacity",
                  value: "0 → 1",
                  note: "Стандартное появление",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  style={{
                    padding: 20,
                    borderRadius: 14,
                    background: "#fff",
                    border: "1px solid #E6E6E6",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "#B289F9",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#1E1E1E",
                      marginBottom: 4,
                      fontFamily: "monospace",
                    }}
                  >
                    {item.value}
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Принципы
              </div>
              {[
                "Движение всегда служит смыслу — не развлекает ради развлечения",
                "Градиентные пятна дышат медленно (3–6 сек цикл)",
                "Текст появляется снизу вверх (translateY 12px → 0)",
                "Логотип анимируется обводкой (stroke-dashoffset)",
                "Никаких резких вспышек или агрессивных transitions",
              ].map((p) => (
                <div
                  key={p}
                  style={{
                    fontSize: 13,
                    color: "#1E1E1E",
                    marginBottom: 8,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <span style={{ color: "#48E5FF", flexShrink: 0 }}>→</span>
                  {p}
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* 8. PATTERNS */}
        <div id="patterns" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Patterns & Textures"
            subtitle="Фирменные декоративные элементы"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 16,
              }}
            >
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    height: 120,
                    borderRadius: 10,
                    background: "#FCFCFC",
                    marginBottom: 14,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 20,
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "#48E5FF",
                      opacity: 0.4,
                      filter: "blur(20px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 15,
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      background: "#B289F9",
                      opacity: 0.5,
                      filter: "blur(16px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 15,
                      left: 40,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#F989B4",
                      opacity: 0.4,
                      filter: "blur(14px)",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1E1E1E",
                    marginBottom: 4,
                  }}
                >
                  Glow Blobs
                </div>
                <div style={{ fontSize: 11, color: "#808080" }}>
                  Основной декоративный мотив. Размытые цветные пятна на светлом
                  фоне.
                </div>
              </div>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    height: 120,
                    borderRadius: 10,
                    background: "#FCFCFC",
                    marginBottom: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg viewBox="0 0 100 100" width={80}>
                    <defs>
                      <linearGradient
                        id="pg1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#48E5FF"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="100%"
                          stopColor="#B289F9"
                          stopOpacity={0.4}
                        />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#pg1)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="28"
                      fill="none"
                      stroke="url(#pg1)"
                      strokeWidth="1"
                    />
                    <polygon
                      points="50,15 82,65 18,65"
                      fill="none"
                      stroke="url(#pg1)"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="4"
                      fill="#B289F9"
                      opacity={0.6}
                    />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1E1E1E",
                    marginBottom: 4,
                  }}
                >
                  Sacred Geometry
                </div>
                <div style={{ fontSize: 11, color: "#808080" }}>
                  Круги, треугольники — символы единства и племени. Используется
                  в фоне.
                </div>
              </div>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    height: 120,
                    borderRadius: 10,
                    background: "#FCFCFC",
                    marginBottom: 14,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 48,
                      fontWeight: 900,
                      color: "#B289F9",
                      opacity: 0.08,
                      letterSpacing: "-0.03em",
                      whiteSpace: "nowrap",
                      userSelect: "none",
                    }}
                  >
                    tribe tribe
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1E1E1E",
                    marginBottom: 4,
                  }}
                >
                  Word Watermark
                </div>
                <div style={{ fontSize: 11, color: "#808080" }}>
                  Крупный полупрозрачный текст как фоновый элемент. Из примеров
                  креативов.
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 9. LAYOUT */}
        <div id="layout" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Layout & Grid"
            subtitle="Принципы сетки и пространства"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#B289F9",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Spacing Scale
                </div>
                {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
                  <div
                    key={s}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: s,
                        height: s,
                        background:
                          "linear-gradient(135deg,#48E5FF,#B289F9)",
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "#1E1E1E",
                      }}
                    >
                      {s}px
                    </span>
                    <span style={{ fontSize: 11, color: "#808080" }}>
                      {s <= 8 ? "XS" : s <= 16 ? "S" : s <= 24 ? "M" : s <= 32 ? "L" : "XL"}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E6E6E6",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#B289F9",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Border Radius Scale
                </div>
                {[
                  { r: 4, name: "XS — inputs, tags" },
                  { r: 8, name: "S — buttons" },
                  { r: 12, name: "M — cards small" },
                  { r: 16, name: "L — cards" },
                  { r: 24, name: "XL — panels, modals" },
                  { r: 9999, name: "Full — pills, avatars" },
                ].map((item) => (
                  <div
                    key={item.r}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 24,
                        background:
                          "linear-gradient(135deg,#48E5FF30,#B289F940)",
                        border: "1.5px solid #B289F9",
                        borderRadius: item.r,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "#1E1E1E",
                      }}
                    >
                      {item.r === 9999 ? "9999" : item.r}px
                    </span>
                    <span style={{ fontSize: 11, color: "#808080" }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #E6E6E6",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Принципы композиции
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {[
                  "Воздух важнее плотности — не бойся пустого пространства",
                  "Контент всегда на первом месте, декор — поддерживает",
                  "Выравнивание по сетке 8px",
                  "Максимальная ширина контента 1280px",
                  "Мобайл-фёрст для всех digital-форматов",
                  "Контраст текста минимум 4.5:1 (WCAG AA)",
                ].map((p) => (
                  <div
                    key={p}
                    style={{
                      fontSize: 13,
                      color: "#1E1E1E",
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#48E5FF", flexShrink: 0 }}>→</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* 10. APPLICATIONS */}
        <div id="applications" style={{ scrollMarginTop: 60 }}>
          <Section
            title="Applications"
            subtitle="Бренд в реальном мире — digital и физические носители"
          >
            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Merch — T-Shirt
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: 24 }}>
                  <TshirtMockup dark={false} />
                  <TshirtMockup dark={true} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    Classic Tee — Minimal Logo
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      maxWidth: 260,
                    }}
                  >
                    Логотип по центру груди. Градиентный символ + wordmark.
                    Минимализм, который говорит сам за себя.
                  </div>
                  <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    {["#FFFFFF", "#1E1E1E", "#6E22F2"].map((c) => (
                      <div
                        key={c}
                        title={c}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: c,
                          border: "2px solid #E6E6E6",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 11, color: "#808080" }}>
                    Доступные цвета: White, Black, Deep Purple
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 32,
                borderRadius: 20,
                background: "#fff",
                border: "1px solid #E6E6E6",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#B289F9",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Digital — Stories / Reels
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <StoriesMockup />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 12,
                    }}
                  >
                    Tribe Awakening Stories
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#808080",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    Тёмный фон + градиентные пятна. Создаёт ощущение живого
                    медиа. Энергия, вдохновение, движение.
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Формат:</strong> 1080
                      × 1920px
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#1E1E1E" }}>Шрифт:</strong> Inter
                      Tight Bold
                    </div>
                    <div>
                      <strong style={{ color: "#1E1E1E" }}>Фон:</strong> #0a0a1a
                      + gradient blobs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
              }}
            >
              {[
                {
                  name: "Event Banner",
                  size: "3000 × 1000px",
                  note: "Горизонтальный баннер мероприятия",
                },
                {
                  name: "Flag",
                  size: "900 × 1350px",
                  note: "Флаг 2:3, логотип по центру",
                },
                {
                  name: "Name Badge",
                  size: "90 × 55mm",
                  note: "Бейдж участника события",
                },
                {
                  name: "Sticker Pack",
                  size: "512 × 512px",
                  note: "6 стикеров, белая обводка 4px",
                },
                {
                  name: "Roll-up",
                  size: "850 × 2000mm",
                  note: "Стенд на мероприятии",
                },
                {
                  name: "Mug / Bottle",
                  size: "wrap print",
                  note: "Логотип + слоган по кругу",
                },
              ].map((f) => (
                <div
                  key={f.name}
                  style={{
                    padding: 20,
                    borderRadius: 14,
                    background: "#fff",
                    border: "1px solid #E6E6E6",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#1E1E1E",
                      marginBottom: 4,
                    }}
                  >
                    {f.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "#B289F9",
                      marginBottom: 6,
                    }}
                  >
                    {f.size}
                  </div>
                  <div style={{ fontSize: 11, color: "#808080" }}>
                    {f.note}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            padding: "24px 0",
            borderTop: "1px solid #E6E6E6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 12, color: "#808080" }}>
            OneTribe Brand Guidelines v1.0
          </div>
          <div
            style={{
              fontSize: 12,
              background:
                "linear-gradient(90deg,#48E5FF,#B289F9,#F989B4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            One World · One Tribe
          </div>
        </div>
      </div>
    </div>
  );
}
