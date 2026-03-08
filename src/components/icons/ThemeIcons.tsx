"use client";

import type { ThemeKey } from "@/lib/brand-library";

type ThemeIconProps = {
  theme: ThemeKey;
  className?: string;
  size?: number;
};

const C = 12;
const R = 9;

/** Точки для правильного треугольника (вершина вверх) */
const trianglePoints = [
  [C, C - R],
  [C - R * 0.866, C + R * 0.5],
  [C + R * 0.866, C + R * 0.5],
]
  .map(([x, y]) => `${x},${y}`)
  .join(" ");

/** Точки для квадрата */
const squarePoints = [
  [C - R * 0.7, C - R * 0.7],
  [C + R * 0.7, C - R * 0.7],
  [C + R * 0.7, C + R * 0.7],
  [C - R * 0.7, C + R * 0.7],
]
  .map(([x, y]) => `${x},${y}`)
  .join(" ");

/** Точки для правильного пятиугольника */
const pentagonPoints = [0, 72, 144, 216, 288]
  .map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [C + R * Math.cos(rad), C + R * Math.sin(rad)];
  })
  .map(([x, y]) => `${x},${y}`)
  .join(" ");

/** Точки для правильного шестиугольника */
const hexagonPoints = [0, 60, 120, 180, 240, 300]
  .map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [C + R * Math.cos(rad), C + R * Math.sin(rad)];
  })
  .map(([x, y]) => `${x},${y}`)
  .join(" ");

/** Звезда Давида — два треугольника */
const starOfDavidPath = [
  `M ${C} ${C - R} L ${C - R * 0.866} ${C + R * 0.5} L ${C + R * 0.866} ${C + R * 0.5} Z`,
  `M ${C} ${C + R} L ${C + R * 0.866} ${C - R * 0.5} L ${C - R * 0.866} ${C - R * 0.5} Z`,
].join(" ");

/** Круг */
const circle = <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeWidth={1.2} />;

/** Звезда 5-конечная (чередование внешних и внутренних вершин) */
const starAngles = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
const starPath = starAngles.map((deg, i) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  const r = i % 2 === 0 ? R : R * 0.4;
  return [C + r * Math.cos(rad), C + r * Math.sin(rad)];
});
const starD = `M ${starPath[0][0]} ${starPath[0][1]} ${starPath.slice(1).map(([x, y]) => `L ${x} ${y}`).join(" ")} Z`;

/**
 * Иконки тем — геометрические фигуры.
 * При наведении на кнопку приобретают цвет темы (group-hover).
 */
export default function ThemeIcon({ theme, className = "", size = 24 }: ThemeIconProps) {
  const icons: Record<ThemeKey, React.ReactNode> = {
    fire: (
      <svg viewBox="0 0 24 24" className={className} width={size} height={size}>
        <path d={starD} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
      </svg>
    ),
    water: (
      <svg viewBox="0 0 24 24" className={className} width={size} height={size}>
        <polygon points={hexagonPoints} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
      </svg>
    ),
    earth: (
      <svg viewBox="0 0 24 24" className={className} width={size} height={size}>
        <polygon points={squarePoints} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
      </svg>
    ),
    cosmos: (
      <svg viewBox="0 0 24 24" className={className} width={size} height={size}>
        <path d={starOfDavidPath} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
      </svg>
    ),
    storm: (
      <svg viewBox="0 0 24 24" className={className} width={size} height={size}>
        <polygon points={trianglePoints} fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
      </svg>
    ),
    void: (
      <svg viewBox="0 0 24 24" className={className} width={size} height={size}>
        {circle}
      </svg>
    ),
  };

  return icons[theme];
}
