type IconProps = { size?: number; className?: string };

/** Круг заполненный — в разработке (draft) */
export function DraftIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

/** Треугольник play (остриё вправо), скруглённые углы — опубликовано (published) */
export function PublishedIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9 6v12l9-6-9-6z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Шестиконечная звезда (два треугольника), скруглённые углы — приватно (private) */
export function PrivateIcon({ size = 18, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 4L20 20H4L12 4zm0 16L4 4h16L12 20z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </svg>
  );
}
