"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = ["#48E5FF", "#B289F9", "#F989B4", "#FFBC6F"];

function sinePath(
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  phase: number = 0
): string {
  const centerY = height / 2;
  const points: string[] = [];
  const steps = 120;
  const round = (n: number) => Math.round(n * 100) / 100;
  for (let i = 0; i <= steps; i++) {
    const x = round((i / steps) * width);
    const y = round(centerY + amplitude * Math.sin((x / width) * frequency * Math.PI * 2 + phase));
    points.push(`${x},${y}`);
  }
  return `M ${points.join(" L ")}`;
}

type DaoWavesProps = { contained?: boolean; overlay?: boolean };

export default function DaoWaves({ contained, overlay }: DaoWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const w = 1920;
  const h = 80;

  useEffect(() => {
    let raf: number;
    let last = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 32) return; // ~30fps
      last = t;
      setPhase((p) => (p + 0.04) % (Math.PI * 2));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const CANVAS_W = 800;
  const CANVAS_H = 200;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    type P = { x: number; y: number; vx: number; vy: number; r: number; max: number; life: number; col: string };
    const particles: P[] = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * CANVAS_W,
        y: CANVAS_H / 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 1),
        r: 1.2 + Math.random() * 1.8,
        max: 60 + Math.random() * 100,
        life: Math.random() * 80,
        col: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.max || p.y < -20 || p.y > CANVAS_H + 20) {
          p.life = 0;
          p.x = Math.random() * CANVAS_W;
          p.y = CANVAS_H / 2;
          p.vy = (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 1);
          p.col = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        const a = Math.sin((p.life / p.max) * Math.PI) * 0.5;
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

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`${contained ? "w-full overflow-hidden py-4 sm:py-6 flex justify-center" : "w-screen overflow-visible"} ${overlay ? "py-0 mb-0" : contained ? "mb-12" : "mb-16 py-16 sm:py-24"}`}
    >
      <div className={`relative h-40 sm:h-52 min-h-[160px] ${contained ? "min-w-[960px] w-full shrink-0" : "w-full"}`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none dao-waves-canvas"
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            {/* Текстовые градиенты — cyan → violet → pink → gold */}
            <linearGradient id="dao-wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#48E5FF" />
              <stop offset="33%" stopColor="#B289F9" />
              <stop offset="66%" stopColor="#F989B4" />
              <stop offset="100%" stopColor="#FFBC6F" />
            </linearGradient>
            <linearGradient id="dao-wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B289F9" />
              <stop offset="33%" stopColor="#F989B4" />
              <stop offset="66%" stopColor="#FFBC6F" />
              <stop offset="100%" stopColor="#48E5FF" />
            </linearGradient>
            <linearGradient id="dao-wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F989B4" />
              <stop offset="33%" stopColor="#FFBC6F" />
              <stop offset="66%" stopColor="#48E5FF" />
              <stop offset="100%" stopColor="#B289F9" />
            </linearGradient>
            <linearGradient id="dao-wave-grad-4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFBC6F" />
              <stop offset="33%" stopColor="#48E5FF" />
              <stop offset="66%" stopColor="#B289F9" />
              <stop offset="100%" stopColor="#F989B4" />
            </linearGradient>
          </defs>

          {/* Волны точками — фаза меняется только после гидрации (избегаем mismatch) */}
          <path
            d={sinePath(w, h, 18, 2.5, mounted ? phase : 0)}
            fill="none"
            stroke="url(#dao-wave-grad-1)"
            strokeLinecap="round"
            className="dao-wave-main dao-wave-dots dao-wave-roll"
          />
          {/* Тонкие — без фазы (статичные пути), только dashoffset катится */}
          <path
            d={sinePath(w, h, 10, 4, 0.5)}
            fill="none"
            stroke="url(#dao-wave-grad-2)"
            strokeLinecap="round"
            className="dao-wave-thin dao-wave-thin-1 dao-wave-dots dao-wave-roll dao-wave-roll-1"
          />
          <path
            d={sinePath(w, h, 14, 3, 1.2)}
            fill="none"
            stroke="url(#dao-wave-grad-3)"
            strokeLinecap="round"
            className="dao-wave-thin dao-wave-thin-2 dao-wave-dots dao-wave-roll dao-wave-roll-2"
          />
          <path
            d={sinePath(w, h, 8, 5, 2)}
            fill="none"
            stroke="url(#dao-wave-grad-4)"
            strokeLinecap="round"
            className="dao-wave-thin dao-wave-thin-3 dao-wave-dots dao-wave-roll dao-wave-roll-3"
          />
        </svg>
      </div>
    </div>
  );
}
