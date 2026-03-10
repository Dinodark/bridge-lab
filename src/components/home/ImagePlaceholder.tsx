"use client";

export function ImagePlaceholder({
  aspect = "square",
  label = "[Изображение]",
  className = "",
}: {
  aspect?: "square" | "video" | "vertical" | "4/3";
  label?: string;
  className?: string;
}) {
  const aspectClass =
    aspect === "video"
      ? "aspect-video"
      : aspect === "vertical"
        ? "aspect-[9/16]"
        : aspect === "4/3"
          ? "aspect-[4/3]"
          : "aspect-square";
  return (
    <div
      className={`${aspectClass} rounded-xl bg-[var(--color-border)]/30 flex items-center justify-center ${className}`}
      style={{ color: "var(--color-muted)", fontSize: "0.75rem" }}
    >
      {label}
    </div>
  );
}
