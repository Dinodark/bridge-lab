export default function CharityParadox() {
  const stats = [
    {
      value: "$592B",
      label: "Annual US charity market (2020)",
      desc: "Massive market with traditional infrastructure and opacity.",
    },
    {
      value: "$2.5B",
      label: "Digital charity donations by 2028",
      desc: "Rapid growth in digital giving, yet trust remains an issue.",
    },
    {
      value: "Trust crisis",
      label: "Declining confidence",
      desc: "73% of global adults distrust traditional charities.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          The Charity Paradox
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center p-6 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10">
              <div className="text-3xl font-bold text-violet-400 mb-2">{stat.value}</div>
              <div className="text-white font-medium mb-3">{stat.label}</div>
              <p className="text-white/60 text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
