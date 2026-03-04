const items = [
  {
    title: "$592B charity market in US alone",
    desc: "Traditional platforms haven't evolved in 15 years. Same old formula: Story → Campaign → Button.",
  },
  {
    title: "4.3B people donate globally",
    desc: "But donors remain invisible. No proof. No status. No digital identity of their impact.",
  },
  {
    title: "Trust crisis",
    desc: "Donors don't know if money reaches recipients. Foundations lack transparency. Blockchain solves this.",
  },
];

export default function LandingCharityParadox() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-[48px] sm:text-[62px] font-bold text-[#FAFAFC] text-center mb-12">
          The Charity Paradox
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="p-8 text-center max-w-[416px] mx-auto"
            >
              <h3 className="text-[24px] font-medium text-[#FAFAFC] mb-4">{item.title}</h3>
              <p className="text-[16px] text-[#FAFAFC] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
