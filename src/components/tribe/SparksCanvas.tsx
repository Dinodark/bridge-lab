"use client";

import { useRef, useEffect } from "react";

export default function SparksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const PAD = 24; // extra space so sparks + shadowBlur don't clip at edges
    let vw = 0;
    let vh = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      vw = rect.width;
      vh = rect.height;
      const w = vw + PAD * 2;
      const h = vh + PAD * 2;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.left = `${-PAD}px`;
      canvas.style.top = `${-PAD}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    type Ember = { x: number; y: number; vy: number; vx: number; r: number; life: number; maxLife: number; hue: number; flicker: number };
    const embers: Ember[] = [];
    for (let i = 0; i < 32; i++) {
      embers.push({
        x: PAD + vw * (0.4 + Math.random() * 0.2),
        y: PAD + vh * (0.78 + Math.random() * 0.2) - 20,
        vy: -(1.2 + Math.random() * 2),
        vx: 0.8 + Math.random() * 1.6,
        r: 1.5 + Math.random() * 2.5,
        life: Math.random() * 60,
        maxLife: 40 + Math.random() * 80,
        hue: 15 + Math.random() * 35,
        flicker: Math.random() * Math.PI * 2,
      });
    }

    let raf: number;
    const draw = () => {
      const cw = canvas.width / (window.devicePixelRatio || 1);
      const ch = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, cw, ch);
      embers.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        e.life++;
        if (e.life > e.maxLife || e.y < -10 || e.x > cw + 10) {
          e.x = PAD + vw * (0.4 + Math.random() * 0.2);
          e.y = PAD + vh * (0.78 + Math.random() * 0.2) - 20;
          e.vy = -(1.2 + Math.random() * 2);
          e.vx = 0.8 + Math.random() * 1.6;
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
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[200px] overflow-visible">
      <canvas ref={canvasRef} className="absolute" />
    </div>
  );
}
