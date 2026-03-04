const stats = [
  { value: "$592B", label: "Annual US charity market (2020)" },
  { value: "$2.5B", label: "Digital charity donations by 2028" },
  { value: "73%", label: "Of global adults distrust charities" },
  { value: "66%", label: "Individual donors care about social impact" },
];

export default function NumbersDontLie() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          The Numbers Don&apos;t Lie
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold text-violet-400 mb-2">{stat.value}</div>
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
