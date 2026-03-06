const stats = [
  { value: "$592B", label: "Annual US charity market (2020)", delay: "0s" },
  { value: "$2.5B", label: "Digital charity donations by 2028", delay: "0.8s" },
  { value: "73%", label: "Of global adults distrust charities", delay: "1.6s" },
  { value: "66%", label: "Individual donors care about social impact", delay: "2.4s" },
];

export default function NumbersDontLie() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(139, 92, 246, 0.12), rgba(34, 211, 238, 0.06) 40%, transparent 70%)",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          The Numbers Don&apos;t Lie
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="p-6 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold numbers-shimmer mb-2" style={{ animationDelay: stat.delay }}>{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-white/60 text-center mt-12 max-w-2xl mx-auto">
          Bridge addresses these challenges head-on with transparency, 
          blockchain verification, and community-driven governance.
        </p>
      </div>
    </section>
  );
}
