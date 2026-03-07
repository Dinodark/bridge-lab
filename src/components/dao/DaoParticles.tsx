"use client";

import { useEffect, useRef } from "react";

const SPHERE_COLORS = ["#48e5ff", "#b289f9", "#f989b4", "#b289f9"] as const;

function getSphereColor(): string {
  const cycleMs = 4000;
  const timelineMs = (typeof document !== "undefined" && document.timeline?.currentTime != null)
    ? document.timeline.currentTime * 1000
    : performance.now();
  const t = (timelineMs % cycleMs) / cycleMs;
  const idx = Math.floor(t * 4) % 4;
  return SPHERE_COLORS[idx];
}

export default function DaoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 360;
    const centerX = size / 2;
    const centerY = size / 2;
    canvas.width = size;
    canvas.height = size;

    const NUM_ANGLES = 12;
    const ANGLE_STEP = (2 * Math.PI) / NUM_ANGLES;
    const SPEED = 0.8;
    const RADIUS_MIN = 1.5;
    const RADIUS_MAX = 10;
    const RADIUS_GROW_START = 60; // расстояние от центра, с которого шарики начинают расти
    const RADIUS_GROW_END = 160;  // расстояние, на котором достигают макс. размера
    const MAX_LIFE = 200;

    type P = { x: number; y: number; vx: number; vy: number; life: number };
    const particles: P[] = [];

    const spawnWave = () => {
      for (let i = 0; i < NUM_ANGLES; i++) {
        const angle = i * ANGLE_STEP;
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * SPEED,
          vy: Math.sin(angle) * SPEED,
          life: 0,
        });
      }
    };

    spawnWave();

    let spawnTimer = 0;
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, size, size);

      const currentColor = getSphereColor();

      spawnTimer++;
      if (spawnTimer > 30) {
        spawnTimer = 0;
        spawnWave();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > MAX_LIFE || p.x < -20 || p.x > size + 20 || p.y < -20 || p.y > size + 20) {
          particles.splice(i, 1);
          continue;
        }
        const dist = Math.hypot(p.x - centerX, p.y - centerY);
        const t = Math.max(0, Math.min((dist - RADIUS_GROW_START) / (RADIUS_GROW_END - RADIUS_GROW_START), 1));
        const r = RADIUS_MAX - t * (RADIUS_MAX - RADIUS_MIN);
        const a = Math.sin((p.life / MAX_LIFE) * Math.PI) * 0.9;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex justify-center items-center w-full max-w-[360px] aspect-square shrink-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="size-full pointer-events-none block"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
