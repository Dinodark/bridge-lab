export default function CharityMeetsCulture() {
  const flow = [
    { label: "NFTs", sub: "collectible proof" },
    { label: "Impact", sub: "real change" },
    { label: "Legacy", sub: "digital identity" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Bridge: Where Charity Meets Culture
        </h2>
        <p className="text-white/80 mb-6">
          We combine traditional giving with blockchain, NFTs, and community governance 
          to create a unique, collectible proof of impact.
        </p>
        <p className="text-white/80 mb-12">
          Every donation becomes a verifiable digital asset—your contribution is forever 
          recorded on the blockchain.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {flow.map((item, i) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="text-center p-4 rounded-xl bg-white/10 border border-white/20 min-w-[120px]">
                <div className="font-bold text-white">{item.label}</div>
                <div className="text-sm text-violet-300">{item.sub}</div>
              </div>
              {i < flow.length - 1 && (
                <svg className="w-6 h-6 text-violet-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
