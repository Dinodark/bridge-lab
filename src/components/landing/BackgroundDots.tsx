const dots = [
  { size: 4, left: "5%", top: "12%", delay: 0, duration: 3.5, color: "bg-[#7342E8]/50" },
  { size: 8, left: "15%", top: "25%", delay: 0.5, duration: 4.2, color: "bg-[#86e9be]/40" },
  { size: 5, left: "8%", top: "45%", delay: 1.2, duration: 5, color: "bg-[#7342E8]/50" },
  { size: 6, left: "22%", top: "8%", delay: 0.8, duration: 3.8, color: "bg-[#7342E8]/60" },
  { size: 4, left: "28%", top: "55%", delay: 1.5, duration: 4.5, color: "bg-[#86e9be]/35" },
  { size: 10, left: "35%", top: "18%", delay: 0.2, duration: 5.5, color: "bg-[#7342E8]/45" },
  { size: 5, left: "42%", top: "72%", delay: 2, duration: 3.2, color: "bg-[#7342E8]/50" },
  { size: 7, left: "48%", top: "35%", delay: 1, duration: 4.8, color: "bg-[#86e9be]/40" },
  { size: 4, left: "55%", top: "5%", delay: 1.8, duration: 5.2, color: "bg-[#7342E8]/55" },
  { size: 6, left: "62%", top: "48%", delay: 0.3, duration: 4, color: "bg-[#7342E8]/50" },
  { size: 8, left: "68%", top: "22%", delay: 2.2, duration: 3.6, color: "bg-[#86e9be]/45" },
  { size: 5, left: "75%", top: "65%", delay: 0.6, duration: 5.8, color: "bg-[#7342E8]/50" },
  { size: 4, left: "82%", top: "12%", delay: 1.4, duration: 4.3, color: "bg-[#7342E8]/55" },
  { size: 7, left: "88%", top: "42%", delay: 2.5, duration: 3.4, color: "bg-[#86e9be]/35" },
  { size: 6, left: "92%", top: "78%", delay: 0.9, duration: 5.1, color: "bg-[#7342E8]/50" },
  { size: 5, left: "12%", top: "68%", delay: 1.7, duration: 4.6, color: "bg-[#7342E8]/50" },
  { size: 4, left: "38%", top: "88%", delay: 2.3, duration: 3.9, color: "bg-[#86e9be]/40" },
  { size: 8, left: "58%", top: "85%", delay: 0.4, duration: 5.3, color: "bg-[#7342E8]/45" },
  { size: 5, left: "78%", top: "55%", delay: 1.1, duration: 4.1, color: "bg-[#7342E8]/50" },
  { size: 6, left: "3%", top: "32%", delay: 2.1, duration: 5.6, color: "bg-[#86e9be]/40" },
  { size: 4, left: "45%", top: "52%", delay: 0.7, duration: 3.7, color: "bg-[#7342E8]/50" },
  { size: 7, left: "18%", top: "82%", delay: 1.9, duration: 4.9, color: "bg-[#7342E8]/55" },
  { size: 5, left: "72%", top: "38%", delay: 2.4, duration: 4.4, color: "bg-[#86e9be]/35" },
  { size: 6, left: "25%", top: "38%", delay: 0.1, duration: 5.4, color: "bg-[#7342E8]/50" },
  { size: 4, left: "85%", top: "28%", delay: 1.3, duration: 3.3, color: "bg-[#7342E8]/50" },
  { size: 8, left: "52%", top: "62%", delay: 2.6, duration: 5.7, color: "bg-[#86e9be]/45" },
  { size: 5, left: "32%", top: "75%", delay: 0.5, duration: 4.7, color: "bg-[#7342E8]/50" },
  { size: 6, left: "65%", top: "8%", delay: 1.6, duration: 3.1, color: "bg-[#7342E8]/55" },
];

export default function BackgroundDots() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-dot-pulse ${dot.color}`}
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.left,
            top: dot.top,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
