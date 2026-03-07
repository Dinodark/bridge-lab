"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type TriAnim = "none" | "rotate" | "pulse-ball" | "scale" | "rotate-slow" | "flicker" | "float";

const THEMES = {
  fire: {
    nameRu: "Year of the Fire Horse · 2026",
    nameDe: "Jahr des Feuerpferds · 2026",
    descRu: "Огонь очищает · Племя зажигает мир. Огненная Лошадь несёт перемены.",
    descDe: "Feuer reinigt · Tribe entzündet die Welt. Das Feuerpferd bringt den Wandel.",
    triAnim: "none" as TriAnim,
    bg: "radial-gradient(ellipse 80% 60% at 50% 75%, rgba(200,50,0,0.25) 0%, rgba(80,10,0,0.08) 45%, transparent 70%)",
    c1: "#FF6600",
    c2: "#FF2200",
    glow: "rgba(255,80,0,0.5)",
    blur: 7,
    pulse: 0.9,
    mkColor: () => `hsl(${10 + Math.random() * 35},100%,${50 + Math.random() * 30}%)`,
    up: true,
    count: 24,
  },
  water: {
    nameRu: "Flow · Поток",
    nameDe: "Flow · Fluss",
    descRu: "Сила воды — в движении. Tribe течёт везде. Гибкость — наша сила.",
    descDe: "Die Kraft des Wassers liegt in der Bewegung. Tribe fließt überall. Flexibilität ist unsere Stärke.",
    triAnim: "pulse-ball" as TriAnim,
    bg: "radial-gradient(ellipse 80% 60% at 50% 25%, rgba(0,100,220,0.2) 0%, rgba(0,20,80,0.06) 45%, transparent 70%)",
    c1: "#00CFFF",
    c2: "#0055FF",
    glow: "rgba(0,160,255,0.4)",
    blur: 5,
    pulse: 0.4,
    mkColor: () => `hsl(${195 + Math.random() * 35},100%,${55 + Math.random() * 25}%)`,
    up: false,
    count: 20,
  },
  earth: {
    nameRu: "Roots · Корни",
    nameDe: "Roots · Wurzeln",
    descRu: "Племя укоренено. Мы растём вместе. Сила — в земле.",
    descDe: "Tribe ist verwurzelt. Wir wachsen gemeinsam. Die Kraft liegt in der Erde.",
    triAnim: "scale" as TriAnim,
    bg: "radial-gradient(ellipse 80% 60% at 50% 65%, rgba(30,110,20,0.18) 0%, rgba(5,30,0,0.06) 45%, transparent 70%)",
    c1: "#55FF33",
    c2: "#1A7700",
    glow: "rgba(70,200,30,0.35)",
    blur: 5,
    pulse: 0.3,
    mkColor: () => `hsl(${95 + Math.random() * 45},75%,${40 + Math.random() * 30}%)`,
    up: true,
    count: 18,
  },
  cosmos: {
    nameRu: "Cosmos · Бесконечность",
    nameDe: "Cosmos · Unendlichkeit",
    descRu: "Tribe за пределами границ. One Universe. Мы везде — и нигде.",
    descDe: "Tribe jenseits der Grenzen. One Universe. Wir sind überall — und nirgends.",
    triAnim: "rotate-slow" as TriAnim,
    bg: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(90,0,180,0.22) 0%, rgba(15,0,50,0.08) 45%, transparent 70%)",
    c1: "#CC88FF",
    c2: "#5500FF",
    glow: "rgba(160,60,255,0.4)",
    blur: 4,
    pulse: 0.2,
    mkColor: () => `hsl(${255 + Math.random() * 70},100%,${65 + Math.random() * 25}%)`,
    up: false,
    count: 28,
  },
  storm: {
    nameRu: "Storm · Буря перемен",
    nameDe: "Storm · Sturm des Wandels",
    descRu: "Из хаоса — рождается порядок. Tribe в движении · Неудержимо.",
    descDe: "Aus dem Chaos entsteht Ordnung. Tribe in Bewegung · Unaufhaltsam.",
    triAnim: "flicker" as TriAnim,
    bg: "radial-gradient(ellipse 70% 50% at 35% 40%, rgba(200,190,0,0.15) 0%, rgba(60,50,0,0.05) 45%, transparent 70%)",
    c1: "#FFEE00",
    c2: "#FF7700",
    glow: "rgba(240,200,0,0.4)",
    blur: 6,
    pulse: 1.2,
    mkColor: () => `hsl(${35 + Math.random() * 30},100%,${60 + Math.random() * 25}%)`,
    up: false,
    count: 18,
  },
  void: {
    nameRu: "Void · Начало начал",
    nameDe: "Void · Anfang des Anfangs",
    descRu: "Тишина перед рождением нового. Из пустоты — всё возможное.",
    descDe: "Stille vor der Geburt des Neuen. Aus der Leere — alles möglich.",
    triAnim: "float" as TriAnim,
    bg: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 50%)",
    c1: "#ffffff",
    c2: "#888888",
    glow: "rgba(255,255,255,0.2)",
    blur: 2,
    pulse: 0.12,
    mkColor: () => `hsl(0,0%,${60 + Math.random() * 35}%)`,
    up: true,
    count: 12,
  },
} as const;

type ThemeKey = keyof typeof THEMES;

const THEME_KEYS: ThemeKey[] = ["fire", "water", "earth", "cosmos", "storm", "void"];
const THEME_ICONS: Record<ThemeKey, string> = {
  fire: "🔥",
  water: "🌊",
  earth: "🌿",
  cosmos: "✦",
  storm: "⚡",
  void: "◎",
};

const UI = {
  ru: { subtitle: "Tribe · Living Identity", keys: "Keys 1–6" },
  de: { subtitle: "Tribe · Lebendige Identität", keys: "Tasten 1–6" },
};

export default function TribePage() {
  const { lang } = useLanguage();
  const [theme, setTheme] = useState<ThemeKey>("fire");
  const [flash, setFlash] = useState(false);
  const triCanvasRef = useRef<HTMLCanvasElement>(null);
  const fireCanvasRef = useRef<HTMLCanvasElement>(null);
  const waterOrbitRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  const t = THEMES[theme];
  const tName = lang === "ru" ? t.nameRu : t.nameDe;
  const tDesc = lang === "ru" ? t.descRu : t.descDe;

  const applyTheme = (key: ThemeKey) => {
    if (key === theme) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    setTheme(key);
  };

  useEffect(() => {
    const kmap: Record<string, ThemeKey> = {
      "1": "fire",
      "2": "water",
      "3": "earth",
      "4": "cosmos",
      "5": "storm",
      "6": "void",
    };
    const onKey = (e: KeyboardEvent) => {
      if (kmap[e.key]) applyTheme(kmap[e.key]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [theme]);

  useEffect(() => {
    const canvas = triCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 280;
    canvas.height = 280;

    let raf: number;
    const draw = () => {
      timeRef.current += 0.016 * t.pulse;
      const pulse = 0.7 + 0.3 * Math.sin(timeRef.current * 2);
      ctx.clearRect(0, 0, 280, 280);

      const cx = 140;
      const pts: [number, number][] = [[140, 28], [228, 192], [52, 192]];

      [2, 1].forEach((layer, i) => {
        ctx.save();
        ctx.globalAlpha = (0.04 - i * 0.015) * pulse;
        ctx.strokeStyle = t.glow;
        ctx.lineWidth = layer * 8;
        ctx.shadowBlur = 20;
        ctx.shadowColor = t.glow;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        ctx.lineTo(pts[1][0], pts[1][1]);
        ctx.lineTo(pts[2][0], pts[2][1]);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      });

      if (theme === "storm") {
        pts.forEach((p1, i) => {
          const p2 = pts[(i + 1) % 3];
          const f = Math.sin(timeRef.current * 3 + i * 2) * 0.5 + 0.5;
          const sx = p1[0] + (p2[0] - p1[0]) * f;
          const sy = p1[1] + (p2[1] - p1[1]) * f;
          ctx.save();
          ctx.globalAlpha = 0.6 * pulse;
          ctx.fillStyle = t.c1;
          ctx.shadowBlur = 12;
          ctx.shadowColor = t.glow;
          ctx.beginPath();
          ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [theme, t.pulse, t.glow, t.c1]);

  useEffect(() => {
    const canvas = fireCanvasRef.current;
    if (!canvas || theme !== "fire") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 280;
    canvas.height = 280;

    type Ember = { x: number; y: number; vy: number; vx: number; r: number; life: number; maxLife: number; hue: number; flicker: number };
    const embers: Ember[] = [];
    for (let i = 0; i < 32; i++) {
      embers.push({
        x: 100 + Math.random() * 80,
        y: 140 + Math.random() * 80,
        vy: -(0.8 + Math.random() * 1.5),
        vx: (Math.random() - 0.5) * 0.8,
        r: 1.5 + Math.random() * 2.5,
        life: Math.random() * 60,
        maxLife: 40 + Math.random() * 80,
        hue: 15 + Math.random() * 35,
        flicker: Math.random() * Math.PI * 2,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, 280, 280);
      embers.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        e.life++;
        if (e.life > e.maxLife || e.y < -10) {
          e.x = 100 + Math.random() * 80;
          e.y = 180 + Math.random() * 40;
          e.vy = -(0.8 + Math.random() * 1.5);
          e.vx = (Math.random() - 0.5) * 0.8;
          e.life = 0;
          e.maxLife = 40 + Math.random() * 80;
          e.hue = 15 + Math.random() * 35;
        }
        const t = e.life / e.maxLife;
        const alpha = Math.sin(t * Math.PI) * 0.7;
        const r = e.r * (0.7 + 0.3 * Math.sin(Date.now() * 0.01 + e.flicker));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsla(${e.hue}, 100%, ${50 + t * 20}%, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${e.hue}, 100%, 60%, 0.8)`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [theme]);

  useEffect(() => {
    const canvas = waterOrbitRef.current;
    if (!canvas || theme !== "water") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 280;
    canvas.height = 280;
    const cx = 140;
    const cy = 140;
    const r1 = 55;
    const r2 = 95;

    const CYCLE = 3;
    type Orbiter = { angle: number; speed: number; radius: number; phaseOffset: number; size: number };
    const orbiters: Orbiter[] = [
      { angle: 0, speed: 1.2, radius: r1, phaseOffset: 0, size: 2 },
      { angle: 2.1, speed: 0.6, radius: r1, phaseOffset: 0.5, size: 2 },
      { angle: 4.2, speed: 0.9, radius: r1, phaseOffset: 1, size: 2 },
      { angle: 0.5, speed: 0.4, radius: r2, phaseOffset: 0.2, size: 3 },
      { angle: 2.6, speed: 0.7, radius: r2, phaseOffset: 0.7, size: 2 },
      { angle: 4.7, speed: 0.5, radius: r2, phaseOffset: 1.2, size: 2 },
    ];

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, 280, 280);

      ctx.save();
      ctx.strokeStyle = "rgba(0, 200, 255, 0.15)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, r2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const t = Date.now() / 1000;
      orbiters.forEach((o) => {
        o.angle += o.speed * 0.016;
        const x = cx + Math.cos(o.angle) * o.radius;
        const y = cy + Math.sin(o.angle) * o.radius;

        const cycle = ((t + o.phaseOffset) % CYCLE) / CYCLE;
        let fade = 0;
        if (cycle < 0.1) {
          fade = cycle / 0.1;
        } else if (cycle < 0.7) {
          fade = 1;
        } else if (cycle < 0.85) {
          fade = (0.85 - cycle) / 0.15;
        }

        if (fade > 0) {
          ctx.save();
          ctx.globalAlpha = fade;
          ctx.fillStyle = "#00CFFF";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(0, 200, 255, 0.8)";
          ctx.beginPath();
          ctx.arc(x, y, o.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [theme]);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const th = THEMES[theme];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; max: number; life: number; col: string };
    const particles: P[] = [];
    for (let i = 0; i < th.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: th.up ? canvas.height + 5 : -5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: th.up ? -(0.3 + Math.random() * 1) : 0.3 + Math.random() * 1,
        r: 1 + Math.random() * 1.5,
        max: 80 + Math.random() * 120,
        life: Math.random() * 100,
        col: th.mkColor(),
      });
    }

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.max) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = th.up ? canvas.height + 5 : -5;
          p.col = th.mkColor();
        }
        const a = Math.sin((p.life / p.max) * Math.PI) * 0.45;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = p.col;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <div
      className="min-h-screen bg-[#080808] text-white overflow-x-hidden"
      style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
          flash ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "rgba(0,0,0,0.3)" }}
        aria-hidden
      />
      <canvas ref={particleCanvasRef} className="fixed inset-0 pointer-events-none z-[1]" />
      <div
        className="fixed inset-0 pointer-events-none z-[2] transition-[background] duration-700"
        style={{ background: t.bg }}
        aria-hidden
      />

      <div className="fixed top-20 left-6 flex items-center gap-4 z-[60]">
        <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
          {UI[lang].subtitle}
        </span>
      </div>
      <div className="fixed top-20 right-6 text-[10px] tracking-[0.2em] text-white/25 uppercase z-[60]">
        v2026.1
      </div>

      <section className="relative z-[3] min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="flex flex-col items-center">
          <div
            className={`relative w-[280px] h-[280px] flex items-center justify-center origin-center ${
              t.triAnim !== "none" && (t.triAnim === "rotate" || t.triAnim === "rotate-slow") ? `tribe-tri-${t.triAnim}` : ""
            }`}
          >
            <canvas ref={triCanvasRef} className="absolute inset-0 w-full h-full" />
            {theme === "fire" && (
              <canvas
                ref={fireCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                aria-hidden
              />
            )}
            {theme === "water" && (
              <canvas
                ref={waterOrbitRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                aria-hidden
              />
            )}
            <svg
              className={`relative z-[2] w-[200px] h-[200px] transition-[filter] duration-500 origin-center ${
                t.triAnim === "pulse-ball" ? "tribe-tri-pulse-ball" : t.triAnim !== "none" && t.triAnim !== "rotate" && t.triAnim !== "rotate-slow" ? `tribe-tri-${t.triAnim}` : ""
              }`}
              viewBox="0 0 240 240"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="tg" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor={t.c1} />
                  <stop offset="100%" stopColor={t.c2} stopOpacity={0.4} />
                </linearGradient>
                <filter id="gf">
                  <feGaussianBlur stdDeviation={t.blur} result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="ig" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#fff" stopOpacity={0.06} />
                  <stop offset="100%" stopColor="#fff" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <polygon
                points="120,16 218,188 22,188"
                fill="url(#ig)"
                stroke="url(#tg)"
                strokeWidth={1.2}
                filter="url(#gf)"
              />
              <polygon
                points="120,62 172,158 68,158"
                fill="none"
                stroke="url(#tg)"
                strokeWidth={0.6}
                opacity={0.2}
              />
              <circle className="tribe-ball" cx="120" cy="126" r="2.5" fill="url(#tg)" opacity={0.5} />
              <circle cx="120" cy="16" r="2" fill="url(#tg)" opacity={0.5} />
              <circle cx="218" cy="188" r="2" fill="url(#tg)" opacity={0.5} />
              <circle cx="22" cy="188" r="2" fill="url(#tg)" opacity={0.5} />
            </svg>
          </div>

          <div
            className="mt-2 text-[72px] tracking-[20px] pl-6 select-none"
            style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
          >
            TRIBE
          </div>
          <div
            className="mt-4 text-[13px] tracking-[5px] text-white/40 uppercase italic text-center transition-all duration-500 min-h-[22px]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {tName}
          </div>
          <p className="mt-3 text-[11px] tracking-[1px] text-white/25 text-center max-w-[320px] leading-[2] transition-all duration-500">
            {tDesc}
          </p>
        </div>
      </section>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {THEME_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => applyTheme(key)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 outline-none border ${
              theme === key
                ? "bg-white/12 border-white/35 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                : "bg-white/[0.04] border-white/[0.07] hover:bg-white/10 hover:scale-105"
            }`}
            title={lang === "ru" ? THEMES[key].nameRu : THEMES[key].nameDe}
          >
            {THEME_ICONS[key]}
          </button>
        ))}
      </div>

      <div className="fixed top-1/2 right-8 -translate-y-1/2 flex flex-col gap-1.5 z-20">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <span
            key={i}
            className={`text-[9px] tracking-widest text-center w-5 transition-colors ${
              THEME_KEYS[i - 1] === theme ? "text-white/45" : "text-white/12"
            }`}
          >
            {i}
          </span>
        ))}
      </div>

      <div className="fixed bottom-24 left-8 text-[9px] tracking-[2px] text-white/15 uppercase z-20">
        {UI[lang].keys}
      </div>
    </div>
  );
}
