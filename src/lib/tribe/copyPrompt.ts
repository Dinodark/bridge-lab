/**
 * Промпт для копирования в Cursor — воспроизведение игры Tribe Fire Canvas.
 * Синхронизировать с src/components/tribe/TribeFireCanvas.tsx при изменениях.
 */

export function getTribeFireCopyPrompt(): string {
  const code = getTribeFireCode();
  return [
    "# Задача для Cursor",
    "",
    "Воспроизведи эту игру Tribe Fire Canvas точно как в описании ниже.",
    "",
    "## Технологии",
    "- Next.js 14+ (App Router)",
    "- React 18",
    "- TypeScript",
    "",
    "## Ассеты",
    "- Создай public/tribe/FireHorse.svg — SVG лошади оранжевого цвета (#FF902F). Можно использовать любой подходящий SVG силуэта лошади.",
    "",
    "## Использование",
    "```tsx",
    "import TribeFireCanvas from \"@/components/tribe/TribeFireCanvas\";",
    "<TribeFireCanvas />",
    "```",
    "",
    "## Описание игры",
    "- 3 оранжевых шарика вращаются вокруг костра, 10 белых — снаружи",
    "- Клик по оранжевому — выбор, затем клик по белому — притягивание белого к костру (становится оранжевым)",
    "- Клик по костру в центре — разгон шариков + искры",
    "- Когда все белые стали оранжевыми и все оранжевые собраны у костра — круг расширяется, появляется лошадь с искрами",
    "- Клик по лошади — перезапуск",
    "- Круг при ударе шариков сдвигается в сторону удара (сильнее при быстром ударе)",
    "",
    "## Полный код компонента src/components/tribe/TribeFireCanvas.tsx",
    "",
    "```tsx",
    code,
    "```",
  ].join("\n");
}

function getTribeFireCode(): string {
  return TRIBE_FIRE_CODE;
}

const TRIBE_FIRE_CODE = `"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";

function FireHorseOverlay({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
      onClick={onReset}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onReset()}
      aria-label="Restart game"
    >
      <div className="relative w-full h-full flex items-end justify-center pointer-events-none">
        <Image
          src="/tribe/FireHorse.svg"
          alt="Fire Horse"
          fill
          className="object-contain object-bottom"
          unoptimized
        />
      </div>
    </div>
  );
}

function FireStreamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    type Ember = { x: number; y: number; vy: number; vx: number; r: number; life: number; maxLife: number; hue: number; flicker: number };
    const embers: Ember[] = [];
    const w = container.clientWidth;
    const h = container.clientHeight;
    for (let i = 0; i < 32; i++) {
      embers.push({
        x: w * 0.4 + Math.random() * w * 0.2,
        y: h * 0.78 + Math.random() * h * 0.2 - 60,
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
          e.x = cw * 0.4 + Math.random() * cw * 0.2;
          e.y = ch * 0.78 + Math.random() * ch * 0.2 - 60;
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
        ctx.fillStyle = \`hsla(\${e.hue}, 100%, \${50 + t * 20}%, 0.9)\`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = \`hsla(\${e.hue}, 100%, 60%, 0.8)\`;
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
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[5]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

type NodeColor = "orange" | "white";

type Node = {
  id: string;
  x: number;
  y: number;
  r: number;
  color: NodeColor;
  label?: string;
};

const LOGICAL_W = 800;
const LOGICAL_H = 640;
const CX = LOGICAL_W / 2;
const CY = LOGICAL_H / 2;
const ORANGE_R = 80;
const WHITE_MIN_R = 160;
const WHITE_MAX_R = 260;
const NODE_R = 12;
const CENTER_R = 24;
const CIRCLE_R = 200;
const SAFE_ZONE_R = 50;
const SHAKE_DECAY = 0.94;
const SHAKE_TREMOR = 0.45;
const REPEL_STRENGTH = 0.15;
const WHITE_OUTER_R = 280;
const CIRCLE_ROTATE_SPEED = 0.15;
const MAX_SPEED = 8;
const FIRE_HIT_R = 48;
const FIRE_BOOST = 0.7;
const WHITE_HOVER_DAMP = 0.92;
const ORANGE_HOVER_DAMP = 0.9;
const ORANGE_DRAG_R = 2 * NODE_R + 4;
const ORANGE_COLLISION_DAMP = 0.96;
const FIRE_ATTRACT_ALL = 0.038;
const FIRE_ATTRACT_INSIDE = 0.095;
const SPARK_COUNT = 12;
const SPARK_SPEED = 3.5;
const SPARK_LIFE = 0.4;
const GATHER_RANGE = 95;
const GATHER_EXPAND_DURATION = 3;
const GATHER_EXPAND_AMOUNT = 180;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function createInitialNodes(): Node[] {
  const orangeNodes: Node[] = [
    { id: "o1", x: CX + ORANGE_R * Math.cos(0), y: CY + ORANGE_R * Math.sin(0), r: NODE_R, color: "orange" },
    { id: "o2", x: CX + ORANGE_R * Math.cos((2 * Math.PI) / 3), y: CY + ORANGE_R * Math.sin((2 * Math.PI) / 3), r: NODE_R, color: "orange" },
    { id: "o3", x: CX + ORANGE_R * Math.cos((4 * Math.PI) / 3), y: CY + ORANGE_R * Math.sin((4 * Math.PI) / 3), r: NODE_R, color: "orange" },
  ];

  const whiteCount = 10;
  const whiteNodes: Node[] = [];
  for (let i = 0; i < whiteCount; i++) {
    const angle = (i / whiteCount) * Math.PI * 2 + seededRandom(i) * 0.5;
    const r = WHITE_MIN_R + seededRandom(i + 10) * (WHITE_MAX_R - WHITE_MIN_R);
    whiteNodes.push({
      id: \`w\${i}\`,
      x: CX + r * Math.cos(angle),
      y: CY + r * Math.sin(angle),
      r: NODE_R,
      color: "white",
    });
  }

  return [...orangeNodes, ...whiteNodes];
}

type PhysicsNode = { x: number; y: number; vx: number; vy: number; id: string; prevVx?: number; prevVy?: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };

export default function TribeFireCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>(() => createInitialNodes());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [fireHovered, setFireHovered] = useState(false);
  const [firePressed, setFirePressed] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [pullingNode, setPullingNode] = useState<{ id: string; fromX: number; fromY: number; toX: number; toY: number; progress: number } | null>(null);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [phase, setPhase] = useState<"normal" | "expanding" | "horse">("normal");
  const nodeIdCounter = useRef(100);
  const gatherStartRef = useRef<number | null>(null);
  const gatherExpandRef = useRef(0);

  const resetGame = useCallback(() => {
    setPhase("normal");
    setNodes(createInitialNodes());
    setSelectedId(null);
    setHoveredId(null);
    setPullingNode(null);
    setCursorPos(null);
    nodeIdCounter.current = 100;
    gatherStartRef.current = null;
    gatherExpandRef.current = 0;
    physicsRef.current.clear();
    whitePhysicsRef.current.clear();
    shakeRef.current = { x: 0, y: 0 };
    tremorRef.current = 0;
    lastInDragRef.current = new Set();
  }, []);

  const orangeNodes = useMemo(() => nodes.filter((n) => n.color === "orange"), [nodes]);
  const whiteNodes = useMemo(() => nodes.filter((n) => n.color === "white"), [nodes]);
  const physicsRef = useRef<Map<string, PhysicsNode>>(new Map());
  const whitePhysicsRef = useRef<Map<string, PhysicsNode>>(new Map());
  const shakeRef = useRef({ x: 0, y: 0 });
  const tremorRef = useRef(0);
  const lastInDragRef = useRef<Set<string>>(new Set());
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    orangeNodes.forEach((n) => {
      if (!physicsRef.current.has(n.id)) {
        const angle = Math.atan2(n.y - CY, n.x - CX);
        const speed = 0.8 + Math.random() * 0.6;
        physicsRef.current.set(n.id, {
          x: n.x,
          y: n.y,
          vx: -Math.sin(angle) * speed,
          vy: Math.cos(angle) * speed,
          id: n.id,
        });
      }
    });
    const ids = new Set(orangeNodes.map((n) => n.id));
    physicsRef.current.forEach((_, id) => {
      if (!ids.has(id)) physicsRef.current.delete(id);
    });
  }, [orangeNodes]);

  useEffect(() => {
    whiteNodes.forEach((n) => {
      if (!whitePhysicsRef.current.has(n.id)) {
        const angle = Math.atan2(n.y - CY, n.x - CX);
        const speed = 0.3 + Math.random() * 0.4;
        whitePhysicsRef.current.set(n.id, {
          x: n.x,
          y: n.y,
          vx: Math.cos(angle + 0.5) * speed,
          vy: Math.sin(angle + 0.5) * speed,
          id: n.id,
        });
      }
    });
    const ids = new Set(whiteNodes.map((n) => n.id));
    whitePhysicsRef.current.forEach((_, id) => {
      if (!ids.has(id)) whitePhysicsRef.current.delete(id);
    });
  }, [whiteNodes]);

  const getNodeAt = useCallback(
    (mx: number, my: number): Node | null => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const px = n.color === "orange" ? physicsRef.current.get(n.id)?.x : whitePhysicsRef.current.get(n.id)?.x ?? n.x;
        const py = n.color === "orange" ? physicsRef.current.get(n.id)?.y : whitePhysicsRef.current.get(n.id)?.y ?? n.y;
        if (px === undefined || py === undefined) continue;
        const d = Math.hypot(mx - px, my - py);
        if (d <= n.r * 1.5) return n;
      }
      return null;
    },
    [nodes]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = LOGICAL_W * dpr;
      canvas.height = LOGICAL_H * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const toLogical = (px: number, py: number) => {
      const rect = container.getBoundingClientRect();
      return {
        x: (px - rect.left) * (LOGICAL_W / rect.width),
        y: (py - rect.top) * (LOGICAL_H / rect.height),
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = toLogical(e.clientX, e.clientY);
      setCursorPos({ x, y });
      const distToFire = Math.hypot(x - CX, y - CY);
      setFireHovered(distToFire < FIRE_HIT_R);
      const node = getNodeAt(x, y);
      setHoveredId(node?.id ?? null);
    };

    const handleMouseLeave = () => {
      setCursorPos(null);
      setHoveredId(null);
      setFireHovered(false);
      setFirePressed(false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const { x: mx, y: my } = toLogical(e.clientX, e.clientY);
      const distToFire = Math.hypot(mx - CX, my - CY);
      if (distToFire < FIRE_HIT_R) {
        setFirePressed(true);
        physicsRef.current.forEach((p) => {
          const dx = p.x - CX;
          const dy = p.y - CY;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.01) return;
          const dir = { x: dy / dist, y: -dx / dist };
          p.vx += dir.x * FIRE_BOOST;
          p.vy += dir.y * FIRE_BOOST;
        });
        for (let i = 0; i < SPARK_COUNT; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = SPARK_SPEED * (0.5 + Math.random());
          sparksRef.current.push({
            x: CX,
            y: CY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: SPARK_LIFE,
            maxLife: SPARK_LIFE,
          });
        }
      }
    };

    const handleMouseUp = () => setFirePressed(false);

    const handleClick = (e: MouseEvent) => {
      const { x: mx, y: my } = toLogical(e.clientX, e.clientY);
      const distToFire = Math.hypot(mx - CX, my - CY);
      if (distToFire < FIRE_HIT_R) return;
      const node = getNodeAt(mx, my);
      if (!node) {
        setSelectedId(null);
        return;
      }
      if (node.color === "orange") {
        setSelectedId(selectedId === node.id ? null : node.id);
      } else if (node.color === "white" && selectedId) {
        const sel = nodes.find((n) => n.id === selectedId);
        if (sel) {
          let centroidX = CX;
          let centroidY = CY;
          if (orangeNodes.length > 0) {
            let sx = 0;
            let sy = 0;
            orangeNodes.forEach((on) => {
              const p = physicsRef.current.get(on.id);
              if (p) {
                sx += p.x;
                sy += p.y;
              }
            });
            centroidX = sx / orangeNodes.length;
            centroidY = sy / orangeNodes.length;
          }
          let toX = centroidX + (node.x - centroidX) * 0.25;
          let toY = centroidY + (node.y - centroidY) * 0.25;
          const toDist = Math.hypot(toX - CX, toY - CY);
          if (toDist + NODE_R > CIRCLE_R) {
            const scale = (CIRCLE_R - NODE_R) / toDist;
            toX = CX + (toX - CX) * scale;
            toY = CY + (toY - CY) * scale;
          }
          if (Math.hypot(toX - CX, toY - CY) < SAFE_ZONE_R + NODE_R) {
            const angle = Math.atan2(toY - CY, toX - CX);
            toX = CX + Math.cos(angle) * (SAFE_ZONE_R + NODE_R);
            toY = CY + Math.sin(angle) * (SAFE_ZONE_R + NODE_R);
          }
          const fromPhys = whitePhysicsRef.current.get(node.id);
          setPullingNode({
            id: node.id,
            fromX: fromPhys?.x ?? node.x,
            fromY: fromPhys?.y ?? node.y,
            toX,
            toY,
            progress: 0,
          });
          setSelectedId(null);
        }
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("click", handleClick);

    return () => {
      ro.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("click", handleClick);
    };
  }, [selectedId, nodes, getNodeAt, orangeNodes]);

  useEffect(() => {
    if (!pullingNode) return;
    const duration = 400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setPullingNode((prev) => (prev ? { ...prev, progress } : null));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setPullingNode(null);
        setShowPlusOne(true);
        setTimeout(() => setShowPlusOne(false), 600);
        setNodes((prev) => {
          const idx = prev.findIndex((n) => n.id === pullingNode.id);
          if (idx < 0) return prev;
          const node = prev[idx];
          const next: Node[] = [...prev];
          next[idx] = {
            ...node,
            x: pullingNode.toX,
            y: pullingNode.toY,
            color: "orange",
            id: \`o\${nodeIdCounter.current++}\`,
          };
          return next;
        });
      }
    };
    requestAnimationFrame(tick);
  }, [pullingNode?.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      const time = Date.now() * 0.001;

      const orangeSelected = selectedId && nodes.some((n) => n.id === selectedId && n.color === "orange");

      if (phase === "horse") {
        raf = requestAnimationFrame(draw);
        return;
      }

      const orangeArrForGather = Array.from(physicsRef.current.values());
      const allGathered = orangeArrForGather.length > 0 && orangeArrForGather.every((p) => Math.hypot(p.x - CX, p.y - CY) < GATHER_RANGE);
      const allWhitesConverted = nodes.filter((n) => n.color === "white").length === 0;

      if (allGathered && allWhitesConverted && phase === "normal") {
        setPhase("expanding");
        gatherStartRef.current = time;
      }

      if (phase === "expanding" && gatherStartRef.current !== null) {
        const elapsed = time - gatherStartRef.current;
        const t = Math.min(elapsed / GATHER_EXPAND_DURATION, 1);
        gatherExpandRef.current = t * GATHER_EXPAND_AMOUNT;
        if (t >= 1) {
          setPhase("horse");
          gatherStartRef.current = null;
        }
      }

      const effectiveCircleR = CIRCLE_R + gatherExpandRef.current;
      const allOrangeInside = orangeArrForGather.length > 0 && orangeArrForGather.every((p) => Math.hypot(p.x - CX, p.y - CY) < effectiveCircleR);

      let shakeAddX = 0;
      let shakeAddY = 0;
      physicsRef.current.forEach((p) => {
        if (hoveredId === p.id) {
          p.vx *= ORANGE_HOVER_DAMP;
          p.vy *= ORANGE_HOVER_DAMP;
        }
        p.x += p.vx;
        p.y += p.vy;
      });

      whitePhysicsRef.current.forEach((p) => {
        if (hoveredId === p.id) {
          p.vx *= WHITE_HOVER_DAMP;
          p.vy *= WHITE_HOVER_DAMP;
        }
        p.x += p.vx;
        p.y += p.vy;
      });

      const orangeArr = Array.from(physicsRef.current.values());
      orangeArr.forEach((p) => {
        const inDrag = orangeArr.some((o) => o !== p && Math.hypot(p.x - o.x, p.y - o.y) < ORANGE_DRAG_R);
        if (!inDrag) {
          p.prevVx = p.vx;
          p.prevVy = p.vy;
        } else {
          p.vx *= ORANGE_COLLISION_DAMP;
          p.vy *= ORANGE_COLLISION_DAMP;
        }
        if (allWhitesConverted && hoveredId !== p.id) {
          const dist = Math.hypot(p.x - CX, p.y - CY);
          if (dist > SAFE_ZONE_R + NODE_R && dist > 0.01) {
            const dir = { x: (CX - p.x) / dist, y: (CY - p.y) / dist };
            const strength = allOrangeInside ? FIRE_ATTRACT_INSIDE : FIRE_ATTRACT_ALL;
            p.vx += dir.x * strength;
            p.vy += dir.y * strength;
          }
        }
      });

      for (let i = 0; i < orangeArr.length; i++) {
        for (let j = i + 1; j < orangeArr.length; j++) {
          const a = orangeArr[i];
          const b = orangeArr[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 2 * NODE_R && dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = 2 * NODE_R - dist;
            a.x -= nx * (overlap / 2);
            a.y -= ny * (overlap / 2);
            b.x += nx * (overlap / 2);
            b.y += ny * (overlap / 2);
            const v1n = a.vx * nx + a.vy * ny;
            const v2n = b.vx * nx + b.vy * ny;
            a.vx += (v2n - v1n) * nx;
            a.vy += (v2n - v1n) * ny;
            b.vx += (v1n - v2n) * nx;
            b.vy += (v1n - v2n) * ny;
          }
        }
      }

      const inDragIds = new Set(orangeArr.filter((p) => orangeArr.some((o) => o !== p && Math.hypot(p.x - o.x, p.y - o.y) < ORANGE_DRAG_R)).map((p) => p.id));
      orangeArr.forEach((p) => {
        const inDrag = inDragIds.has(p.id);
        const wasInDrag = lastInDragRef.current.has(p.id);
        if (wasInDrag && !inDrag && p.prevVx !== undefined && p.prevVy !== undefined) {
          p.vx = p.prevVx;
          p.vy = p.prevVy;
        }
      });
      lastInDragRef.current = inDragIds;

      physicsRef.current.forEach((p) => {
        if (hoveredId === p.id) return;
        const dist = Math.hypot(p.x - CX, p.y - CY);
        const safeR = SAFE_ZONE_R + NODE_R;
        if (dist < safeR) {
          const dir = dist > 0.01 ? { x: (p.x - CX) / dist, y: (p.y - CY) / dist } : { x: 1, y: 0 };
          p.x = CX + dir.x * safeR;
          p.y = CY + dir.y * safeR;
          if (allWhitesConverted) {
            p.vx *= ORANGE_COLLISION_DAMP;
            p.vy *= ORANGE_COLLISION_DAMP;
          } else {
            const dot = p.vx * dir.x + p.vy * dir.y;
            if (dot < 0) {
              p.vx -= 2 * dot * dir.x;
              p.vy -= 2 * dot * dir.y;
            }
          }
        }
        const toCenter = Math.hypot(p.x - CX, p.y - CY);
        const bounceR = effectiveCircleR;
        if (toCenter + NODE_R > bounceR) {
          const dir = toCenter > 0.01 ? { x: (p.x - CX) / toCenter, y: (p.y - CY) / toCenter } : { x: 1, y: 0 };
          const dot = p.vx * dir.x + p.vy * dir.y;
          const impactStrength = Math.max(0, dot);
          p.x = CX + dir.x * (bounceR - NODE_R);
          p.y = CY + dir.y * (bounceR - NODE_R);
          p.vx -= 2 * dot * dir.x;
          p.vy -= 2 * dot * dir.y;
          const shakeAmount = Math.min(24, Math.max(2, impactStrength * 3));
          shakeAddX += dir.x * shakeAmount;
          shakeAddY += dir.y * shakeAmount;
        }
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx *= MAX_SPEED / speed;
          p.vy *= MAX_SPEED / speed;
        }
      });

      whitePhysicsRef.current.forEach((p) => {
        if (hoveredId === p.id) return;
        const dist = Math.hypot(p.x - CX, p.y - CY);
        const whiteInnerR = effectiveCircleR + NODE_R * 2;
        if (dist < whiteInnerR) {
          const dir = dist > 0.01 ? { x: (p.x - CX) / dist, y: (p.y - CY) / dist } : { x: 1, y: 0 };
          p.x = CX + dir.x * whiteInnerR;
          p.y = CY + dir.y * whiteInnerR;
          const dot = p.vx * dir.x + p.vy * dir.y;
          p.vx -= 2 * dot * dir.x;
          p.vy -= 2 * dot * dir.y;
        }
        if (dist > WHITE_OUTER_R - NODE_R) {
          const dir = dist > 0.01 ? { x: (p.x - CX) / dist, y: (p.y - CY) / dist } : { x: 1, y: 0 };
          p.x = CX + dir.x * (WHITE_OUTER_R - NODE_R);
          p.y = CY + dir.y * (WHITE_OUTER_R - NODE_R);
          const dot = p.vx * dir.x + p.vy * dir.y;
          p.vx -= 2 * dot * dir.x;
          p.vy -= 2 * dot * dir.y;
        }
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx *= MAX_SPEED / speed;
          p.vy *= MAX_SPEED / speed;
        }
      });

      orangeArr.forEach((a) => {
        whitePhysicsRef.current.forEach((b) => {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 2 * NODE_R && dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = 2 * NODE_R - dist;
            a.x -= nx * (overlap / 2);
            a.y -= ny * (overlap / 2);
            b.x += nx * (overlap / 2);
            b.y += ny * (overlap / 2);
            const v1n = a.vx * nx + a.vy * ny;
            const v2n = b.vx * nx + b.vy * ny;
            a.vx += (v2n - v1n) * nx;
            a.vy += (v2n - v1n) * ny;
            b.vx += (v1n - v2n) * nx;
            b.vy += (v1n - v2n) * ny;
          }
        });
      });
      if (hoveredId) {
        const hp = physicsRef.current.get(hoveredId);
        if (hp) {
          hp.vx *= ORANGE_HOVER_DAMP;
          hp.vy *= ORANGE_HOVER_DAMP;
        }
        const wp = whitePhysicsRef.current.get(hoveredId);
        if (wp) {
          wp.vx *= WHITE_HOVER_DAMP;
          wp.vy *= WHITE_HOVER_DAMP;
        }
      }

      const whiteArr = Array.from(whitePhysicsRef.current.values());
      for (let i = 0; i < whiteArr.length; i++) {
        for (let j = i + 1; j < whiteArr.length; j++) {
          const a = whiteArr[i];
          const b = whiteArr[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 2 * NODE_R && dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = 2 * NODE_R - dist;
            a.x -= nx * (overlap / 2);
            a.y -= ny * (overlap / 2);
            b.x += nx * (overlap / 2);
            b.y += ny * (overlap / 2);
            const v1n = a.vx * nx + a.vy * ny;
            const v2n = b.vx * nx + b.vy * ny;
            a.vx += (v2n - v1n) * nx;
            a.vy += (v2n - v1n) * ny;
            b.vx += (v1n - v2n) * nx;
            b.vy += (v1n - v2n) * ny;
          }
        }
      }

      tremorRef.current = tremorRef.current * SHAKE_DECAY + (shakeAddX !== 0 || shakeAddY !== 0 ? 1 : 0);
      shakeRef.current.x = shakeRef.current.x * SHAKE_DECAY + shakeAddX;
      shakeRef.current.y = shakeRef.current.y * SHAKE_DECAY + shakeAddY;
      const tremor = Math.sin(time * 8) * tremorRef.current * SHAKE_TREMOR;

      ctx.save();
      ctx.translate(
        CX + shakeRef.current.x + tremor * Math.sin(time * 8),
        CY + shakeRef.current.y + tremor * Math.sin(time * 8 + 1.5)
      );
      if (orangeSelected) {
        ctx.rotate(time * CIRCLE_ROTATE_SPEED);
        ctx.setLineDash([8, 8]);
        ctx.lineDashOffset = -time * 40;
      }
      ctx.strokeStyle = "rgba(255, 102, 0, 0.4)";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6 + 0.1 * Math.sin(time * 2);
      ctx.beginPath();
      ctx.arc(0, 0, effectiveCircleR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      const firePath =
        "M191.834 313.867C218.018 313.567 265.317 290.949 274.552 245.433C283.768 199.916 262.652 163.015 255.801 149.032C249.851 180.865 231.1 190.682 229.017 195.749C224.249 167.182 241.217 155.282 228.717 110.667C216.216 66.0512 180.535 47 180.535 47C180.535 47 187.667 86.2661 170.418 116.016C153.169 145.766 136.802 163.015 133.817 175.215C129.951 154.381 137.684 135.048 141.851 127.015C121.335 143.401 90.6846 186.534 107.352 242.767C99.6189 237.718 93.3686 226.1 91.5855 216.884C83.5521 259.135 105.269 308.818 174.585 313.585C160.001 296.336 158.818 254.968 177.851 228.803C179.934 252.002 192.435 263.32 195.701 266.286C199.567 263.02 202.552 259.735 203.434 256.77C208.201 267.769 213.551 292.77 191.834 313.886V313.867Z";
      ctx.save();
      ctx.translate(CX, CY);
      const fireBaseScale = (CENTER_R * 2.2) / 267;
      const fireHoverScale = fireHovered ? 1.35 : 1;
      const firePressScale = firePressed ? 1.12 : 1;
      const fireScale = fireBaseScale * fireHoverScale * firePressScale;
      ctx.scale(fireScale, fireScale);
      ctx.translate(-183.5, -180.5);
      const fireActive = fireHovered || firePressed;
      ctx.fillStyle = fireActive ? "#FF8800" : "#FF6200";
      ctx.shadowBlur = fireActive ? 24 + 8 * Math.sin(time * 12) : 8;
      ctx.shadowColor = fireActive ? "rgba(255, 120, 0, 0.95)" : "rgba(255, 98, 0, 0.8)";
      ctx.globalAlpha = fireActive ? 0.95 + 0.05 * Math.sin(time * 8) : 1;
      ctx.fill(new Path2D(firePath));
      ctx.restore();

      const dt = 1 / 60;
      sparksRef.current = sparksRef.current.filter((s) => {
        s.x += s.vx * dt * 60;
        s.y += s.vy * dt * 60;
        s.life -= dt;
        if (s.life <= 0) return false;
        const t = 1 - s.life / s.maxLife;
        ctx.save();
        ctx.globalAlpha = 1 - t;
        ctx.fillStyle = t > 0.5 ? "#FFAA00" : "#FF6600";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(255, 100, 0, 0.9)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2 + t * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      if (selectedId && cursorPos) {
        const sel = nodes.find((n) => n.id === selectedId);
        const selPhys = sel?.color === "orange" ? physicsRef.current.get(selectedId) : whitePhysicsRef.current.get(selectedId ?? "");
        const sx = selPhys ? selPhys.x : sel?.x ?? 0;
        const sy = selPhys ? selPhys.y : sel?.y ?? 0;
        if (sel && (sel.color !== "orange" || selPhys)) {
          let tx = cursorPos.x;
          let ty = cursorPos.y;
          if (sel.color === "orange" && hoveredId) {
            const hovered = nodes.find((n) => n.id === hoveredId);
            if (hovered?.color === "white") {
              const hoverPhys = whitePhysicsRef.current.get(hoveredId);
              if (hoverPhys) {
                tx = hoverPhys.x;
                ty = hoverPhys.y;
              }
            }
          }
          ctx.save();
          ctx.strokeStyle = "rgba(255, 102, 0, 0.8)";
          ctx.lineWidth = 2;
          const dashLen = 8;
          ctx.setLineDash([dashLen, dashLen]);
          ctx.lineDashOffset = -time * 80;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          ctx.restore();
        }
      }

      if (pullingNode) {
        const { fromX, fromY, toX, toY, progress } = pullingNode;
        const c = 1.2;
        const t = 1 + (c + 1) * Math.pow(progress - 1, 3) + c * Math.pow(progress - 1, 2);
        const x = fromX + (toX - fromX) * t;
        const y = fromY + (toY - fromY) * t;
        const r = NODE_R * (1 - t * 0.5);
        ctx.save();
        ctx.fillStyle = \`rgba(255, \${102 + t * 53}, 0, \${0.5 + t * 0.5})\`;
        ctx.strokeStyle = "#FF6600";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(255, 102, 0, 0.6)";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      nodes.forEach((n) => {
        if (pullingNode?.id === n.id) return;

        const phys = n.color === "orange" ? physicsRef.current.get(n.id) : whitePhysicsRef.current.get(n.id);
        const nx = phys ? phys.x : n.x;
        const ny = phys ? phys.y : n.y;

        const isHovered = hoveredId === n.id;
        const isSelected = selectedId === n.id;
        const whiteTargeted = n.color === "white" && isHovered && selectedId && nodes.some((o) => o.id === selectedId && o.color === "orange");
        const scale = whiteTargeted ? 1.35 : isHovered || isSelected ? 1.2 : 1;
        const r = n.r * scale;
        const pulseR = isSelected ? r * (0.95 + 0.1 * Math.sin(time * 6)) : r;

        ctx.save();

        if (n.color === "orange") {
          ctx.fillStyle = "#FF6600";
          ctx.strokeStyle = "#FF8800";
          ctx.shadowBlur = isSelected ? 16 : 8;
          ctx.shadowColor = "rgba(255, 102, 0, 0.6)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
        }

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, ny, pulseR, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [nodes, hoveredId, selectedId, cursorPos, pullingNode, fireHovered, firePressed, phase]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[5/4] max-w-4xl mx-auto rounded-2xl overflow-hidden cursor-default"
      style={{ background: phase === "horse" ? "transparent" : "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,102,0,0.12) 0%, rgba(20,10,0,0.04) 50%, transparent 70%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {phase === "horse" && (
        <>
          <FireHorseOverlay onReset={resetGame} />
          <FireStreamCanvas />
        </>
      )}
      {showPlusOne && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="text-3xl font-bold text-[#FF6600] opacity-0 animate-[tribePlusOne_0.6s_ease-out_forwards]"
            style={{ textShadow: "0 0 24px rgba(255,102,0,0.8)" }}
          >
            +1
          </span>
        </div>
      )}
    </div>
  );
}`;