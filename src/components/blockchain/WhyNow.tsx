const reasons = [
  {
    title: "Lost Faith in Institutions",
    desc: "Public trust in traditional charities has declined. People want proof their donations create real impact.",
  },
  {
    title: "Crypto Needs Reputation",
    desc: "Blockchain must demonstrate real-world utility. Charity is a powerful use case that benefits everyone.",
  },
  {
    title: "Attention Economy",
    desc: "Digital engagement and unique narratives drive modern giving. NFTs make impact visible and shareable.",
  },
];

export default function WhyNow() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Why Now
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-white/70">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
