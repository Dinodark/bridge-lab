"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { THEME_KEYS, BRAND_COLORS_RGBA, type ThemeKey } from "@/lib/brand-library";
import ThemeIcon from "@/components/icons/ThemeIcons";

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
    bg: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)",
    c1: "#ffffff",
    c2: "#e0e0e0",
    glow: "rgba(255,255,255,0.5)",
    blur: 3,
    pulse: 0.4,
    mkColor: () => `hsl(0,0%,${75 + Math.random() * 25}%)`,
    up: true,
    count: 12,
  },
} as const;

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
  const cosmosFractalRef = useRef<HTMLCanvasElement>(null);
  const voidFractalRef = useRef<HTMLCanvasElement>(null);
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
      const triPts: [number, number][] = [[140, 28], [228, 192], [52, 192]];
      const hexPts: [number, number][] = [[140, 58], [211, 99], [211, 181], [140, 222], [69, 181], [69, 99]];
      const starPts: [number, number][] = [[140, 19], [255, 103], [211, 238], [69, 238], [25, 103]];
      const pentagonPts: [number, number][] = [[140, 40], [228, 108], [200, 212], [80, 212], [52, 108]];
      const squarePts: [number, number][] = [[28, 28], [252, 28], [252, 252], [28, 252]];
      const pts = theme === "fire" ? pentagonPts : theme === "water" ? hexPts : theme === "earth" ? squarePts : theme === "void" ? [] : triPts;

      if (pts.length > 0) {
        [2, 1].forEach((layer, i) => {
          ctx.save();
          ctx.globalAlpha = (0.04 - i * 0.015) * pulse;
          ctx.strokeStyle = t.glow;
          ctx.lineWidth = layer * 8;
          ctx.shadowBlur = 20;
          ctx.shadowColor = t.glow;
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          pts.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        });
      }

      if (theme === "storm" && pts.length > 0) {
        pts.forEach((p1, i) => {
          const p2 = pts[(i + 1) % pts.length];
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
    const canvas = cosmosFractalRef.current;
    if (!canvas || theme !== "cosmos") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 280;
    canvas.height = 280;

    const drawSierpinski = (
      ax: number, ay: number, bx: number, by: number, cx: number, cy: number,
      depth: number, pulse: number
    ) => {
      if (depth <= 0) return;
      const alpha = 0.03 + 0.02 * pulse * (1 - depth / 5);
      ctx.save();
      ctx.strokeStyle = t.glow;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 8;
      ctx.shadowColor = t.glow;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.lineTo(cx, cy);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      const mx1 = (ax + bx) / 2, my1 = (ay + by) / 2;
      const mx2 = (bx + cx) / 2, my2 = (by + cy) / 2;
      const mx3 = (cx + ax) / 2, my3 = (cy + ay) / 2;

      drawSierpinski(ax, ay, mx1, my1, mx3, my3, depth - 1, pulse);
      drawSierpinski(mx1, my1, bx, by, mx2, my2, depth - 1, pulse);
      drawSierpinski(mx3, my3, mx2, my2, cx, cy, depth - 1, pulse);
    };

    let raf: number;
    const draw = () => {
      timeRef.current += 0.016 * t.pulse;
      const pulse = 0.7 + 0.3 * Math.sin(timeRef.current * 2);
      ctx.clearRect(0, 0, 280, 280);
      drawSierpinski(140, 28, 228, 192, 52, 192, 5, pulse);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [theme, t.pulse, t.glow]);

  useEffect(() => {
    const canvas = voidFractalRef.current;
    if (!canvas || theme !== "void") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 280;
    canvas.height = 280;
    const cx = 140;
    const cy = 140;

    const drawAnimatedRing = (
      tt: number, r: number,
      lineWBase: number, lineWAmp: number, lineWPhase: number,
      alphaBase: number, alphaAmp: number, alphaPhase: number,
      scaleAmp: number
    ) => {
      const lw = lineWBase + lineWAmp * Math.sin(tt * 1.2 + lineWPhase);
      const scale = 1 + scaleAmp * Math.sin(tt * 0.7);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.globalAlpha = alphaBase + alphaAmp * Math.sin(tt * 0.6 + alphaPhase);
      ctx.lineWidth = Math.max(0.5, lw);
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(255,255,255,0.5)";
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const BRAND_COLORS = BRAND_COLORS_RGBA;
    const drawAnimatedRingGradient = (tt: number, rBase: number, baseAngle: number, phase: number) => {
      const ramp = 1 + 0.85 * (1 - Math.exp(-tt * 0.04));
      const squash = Math.sin(tt * 1.35 * ramp + phase);
      const s = 0.24 * squash;
      const rx = rBase * Math.exp(s);
      const ry = rBase * Math.exp(-s);
      const rotation = baseAngle + 0.6 * Math.sin(tt * 0.92 * ramp + phase * 0.7);
      const lw = 2 + 1.2 * Math.sin(tt * 2.2 * ramp + phase) + 0.6 * Math.sin(tt * 3.1 * ramp + phase * 1.2);
      const alpha = 0.4 + 0.2 * Math.sin(tt * 1.1 * ramp + phase * 0.5) + 0.08 * Math.sin(tt * 1.8 * ramp + phase);
      const shimmer = 0.12 * Math.sin(tt * 2.1 * ramp + phase);
      const gradient = ctx.createConicGradient(tt * 1.5 * ramp + phase * 2, cx, cy);
      gradient.addColorStop(0, BRAND_COLORS[0] + Math.min(1, 0.88 + shimmer) + ")");
      gradient.addColorStop(0.25, BRAND_COLORS[1] + Math.min(1, 0.55 + shimmer * 0.6) + ")");
      gradient.addColorStop(0.5, BRAND_COLORS[2] + Math.min(1, 0.82 + shimmer) + ")");
      gradient.addColorStop(0.75, BRAND_COLORS[3] + Math.min(1, 0.5 + shimmer * 0.6) + ")");
      gradient.addColorStop(1, BRAND_COLORS[0] + Math.min(1, 0.88 + shimmer) + ")");
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.strokeStyle = gradient;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = Math.max(0.5, lw);
      ctx.shadowBlur = 14 + 6 * Math.sin(tt * 1.2);
      ctx.shadowColor = "rgba(178,137,249,0.5)";
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const drawCenteredCircle = (
      tt: number, r: number,
      lineWBase: number, lineWAmp: number, lineWPhase: number,
      alphaBase: number, alphaAmp: number, alphaPhase: number
    ) => {
      const lw = lineWBase + lineWAmp * Math.sin(tt * 0.8 + lineWPhase);
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.globalAlpha = alphaBase + alphaAmp * Math.sin(tt * 0.6 + alphaPhase);
      ctx.lineWidth = Math.max(0.5, lw);
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(255,255,255,0.5)";
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const drawOrbitingBallOnEllipse = (
      tt: number, rx: number, ry: number, ellipseAngle: number, speed: number, phase: number
    ) => {
      const c = Math.cos(ellipseAngle);
      const s = Math.sin(ellipseAngle);
      const trailSteps = 24;
      const trailStep = 0.18;
      for (let k = trailSteps; k >= 0; k--) {
        const u = tt * speed + phase - k * trailStep;
        const px = rx * Math.cos(u);
        const py = ry * Math.sin(u);
        const bx = cx + px * c - py * s;
        const by = cy + px * s + py * c;
        const near = 0.5 + 0.5 * Math.sin(u);
        const alpha = k === 0 ? (0.2 + 0.75 * near) : 0.35 * (1 - k / trailSteps) * (0.4 + 0.5 * near);
        const glow = k === 0 ? (4 + 10 * near) : 2;
        const r = k === 0 ? 2.5 : 2.2 * (1 - k / (trailSteps * 1.5));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.shadowBlur = Math.max(0, glow);
        ctx.shadowColor = "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.arc(bx, by, Math.max(0.5, r), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    let raf: number;
    const draw = () => {
      timeRef.current += 0.016 * t.pulse;
      const tt = timeRef.current;
      ctx.clearRect(0, 0, 280, 280);
      drawAnimatedRing(tt, 55, 1.8, 0.8, 0, 0.4, 0.15, 0, 0.06);
      drawAnimatedRingGradient(tt, 42, 0, 0);
      drawAnimatedRingGradient(tt, 42, Math.PI * 2 / 3, Math.PI * 0.66);
      drawAnimatedRingGradient(tt, 42, Math.PI * 4 / 3, Math.PI * 1.33);
      drawAnimatedRing(tt, 32, 1.4, 0.7, 1.5, 0.45, 0.12, 1.2, 0.07);
      drawCenteredCircle(tt, 14, 1.2, 0.4, 2.8, 0.5, 0.1, 2.5);
      drawOrbitingBallOnEllipse(tt, 68, 24, 0, 4.2, Math.PI / 4);
      drawOrbitingBallOnEllipse(tt, 68, 24, Math.PI * 2 / 3, 4.2, Math.PI * 0.5 + Math.PI / 4);
      drawOrbitingBallOnEllipse(tt, 68, 24, Math.PI * 4 / 3, 4.2, Math.PI + Math.PI / 4);
      const dotAngle = tt * 19.5;
      const dotX = cx + 14 * Math.cos(dotAngle);
      const dotY = cy + 14 * Math.sin(dotAngle);
      ctx.save();
      ctx.globalAlpha = 0.6 + 0.2 * Math.sin(tt * 0.7);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255,255,255,0.5)";
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [theme, t.pulse]);

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
            {theme === "cosmos" && (
              <canvas
                ref={cosmosFractalRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                aria-hidden
              />
            )}
            {theme === "void" && (
              <canvas
                ref={voidFractalRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                aria-hidden
              />
            )}
            <svg
              className={`relative z-[2] w-[200px] h-[200px] transition-[filter] duration-500 origin-center ${
                t.triAnim === "pulse-ball" ? "tribe-tri-pulse-ball" : t.triAnim !== "none" && t.triAnim !== "rotate" && t.triAnim !== "rotate-slow" ? `tribe-tri-${t.triAnim}` : ""
              }`}
              viewBox={theme === "cosmos" ? "-20 -20 280 280" : "0 0 240 240"}
              overflow="visible"
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
              {theme === "fire" ? (
                <>
                  <polygon
                    points="120,16 144,88 219,88 158,132 181,204 120,160 59,204 82,132 21,88 96,88"
                    fill="url(#ig)"
                    stroke="url(#tg)"
                    strokeWidth={1.2}
                    filter="url(#gf)"
                  />
                  <polygon
                    points="120,68 132,104 169,104 139,126 151,162 120,140 89,162 101,126 71,104 108,104"
                    fill="none"
                    stroke="url(#tg)"
                    strokeWidth={0.6}
                    opacity={0.2}
                  />
                </>
              ) : theme === "water" ? (
                <>
                  <polygon
                    points="120,16 210,68 210,172 120,224 30,172 30,68"
                    fill="url(#ig)"
                    stroke="url(#tg)"
                    strokeWidth={1.2}
                    filter="url(#gf)"
                  />
                  <polygon
                    points="120,68 169,104 169,136 120,172 71,136 71,104"
                    fill="none"
                    stroke="url(#tg)"
                    strokeWidth={0.6}
                    opacity={0.2}
                  />
                </>
              ) : theme === "cosmos" ? (
                <>
                  <polygon
                    points="120,-8 235,177 5,177"
                    fill="url(#ig)"
                    stroke="url(#tg)"
                    strokeWidth={1.2}
                    filter="url(#gf)"
                  />
                  <polygon
                    points="120,248 5,56 235,56"
                    fill="none"
                    stroke="url(#tg)"
                    strokeWidth={1.2}
                    opacity={0.4}
                    filter="url(#gf)"
                  />
                  <g opacity={0.25} stroke="url(#tg)" strokeWidth={0.5} fill="none">
                    <polygon points="120,16 169,102 71,102" />
                    <polygon points="71,102 22,188 120,188" />
                    <polygon points="169,102 218,188 120,188" />
                    <polygon points="120,55 145,79 95,79" />
                    <polygon points="95,79 71,102 120,102" />
                    <polygon points="145,79 169,102 120,102" />
                    <polygon points="120,102 145,145 95,145" />
                    <polygon points="95,145 71,188 120,188" />
                    <polygon points="145,145 169,188 120,188" />
                  </g>
                </>
              ) : theme === "earth" ? (
                <>
                  <rect
                    x="24"
                    y="24"
                    width="192"
                    height="192"
                    fill="url(#ig)"
                    stroke="url(#tg)"
                    strokeWidth={1.2}
                    filter="url(#gf)"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="60"
                    fill="none"
                    stroke="url(#tg)"
                    strokeWidth={0.6}
                    opacity={0.2}
                  />
                </>
              ) : theme === "void" ? null : (
                <>
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
                </>
              )}
              {theme !== "void" && (
                <circle className="tribe-ball" cx="120" cy={theme === "cosmos" ? 119 : 126} r="2.5" fill="url(#tg)" opacity={0.5} />
              )}
              {theme === "fire" ? (
                <>
                  <circle cx="120" cy="16" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="219" cy="88" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="181" cy="204" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="59" cy="204" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="21" cy="88" r="2.5" fill="url(#tg)" opacity={0.5} />
                </>
              ) : theme === "water" ? (
                <>
                  <circle cx="120" cy="16" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="210" cy="68" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="210" cy="172" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="120" cy="224" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="30" cy="172" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="30" cy="68" r="2.5" fill="url(#tg)" opacity={0.5} />
                </>
              ) : theme === "cosmos" ? (
                <>
                  <circle cx="120" cy="-8" r="4" fill="url(#tg)" opacity={0.5} />
                  <circle cx="235" cy="177" r="4" fill="url(#tg)" opacity={0.5} />
                  <circle cx="5" cy="177" r="4" fill="url(#tg)" opacity={0.5} />
                  <circle cx="120" cy="248" r="4" fill="url(#tg)" opacity={0.5} />
                  <circle cx="5" cy="56" r="4" fill="url(#tg)" opacity={0.5} />
                  <circle cx="235" cy="56" r="4" fill="url(#tg)" opacity={0.5} />
                </>
              ) : theme === "earth" ? (
                <>
                  <circle cx="24" cy="24" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="216" cy="24" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="216" cy="216" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="24" cy="216" r="2.5" fill="url(#tg)" opacity={0.5} />
                </>
              ) : theme === "void" ? null : (
                <>
                  <circle cx="120" cy="16" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="218" cy="188" r="2.5" fill="url(#tg)" opacity={0.5} />
                  <circle cx="22" cy="188" r="2.5" fill="url(#tg)" opacity={0.5} />
                </>
              )}
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
            style={{ "--icon-color": THEMES[key].c1 } as React.CSSProperties}
            className={`group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 outline-none border ${
              theme === key
                ? "bg-white/12 border-white/35 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                : "bg-white/[0.04] border-white/[0.07] hover:bg-white/10 hover:scale-105"
            }`}
            title={lang === "ru" ? THEMES[key].nameRu : THEMES[key].nameDe}
          >
            <ThemeIcon
              theme={key}
              className={`w-5 h-5 transition-colors duration-300 ${
                theme === key ? "[color:var(--icon-color)]" : "text-white/60 group-hover:[color:var(--icon-color)]"
              }`}
              size={20}
            />
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
