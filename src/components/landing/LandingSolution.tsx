const flow = [
  { main: "NFTs", sub: "Collectible Proof" },
  { main: "Impact", sub: "Real Change" },
  { main: "Legacy", sub: "Digital Identity" },
];

export default function LandingSolution() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[962px] mx-auto text-center">
        <p className="text-[24px] text-[#FAFAFC] mb-4">The Solution</p>
        <h2 className="text-[48px] sm:text-[62px] font-bold text-[#FAFAFC] mb-16">
          Bridge: Where Charity Meets Culture
        </h2>
        <div className="text-[24px] text-[#FAFAFC] leading-relaxed mb-16 space-y-6 text-left">
          <p>
            We&apos;re building the first charity platform where donations create NFTs—unique, collectible proof of impact. Each NFT tells a story: who you helped, how, and what changed.
          </p>
          <p>
            For the crypto generation that built wealth outside traditional systems, Bridge offers something revolutionary: the ability to flex your good deeds. Your NFT collection becomes a digital legacy—visible proof that you&apos;re not just rich, you&apos;re righteous.
          </p>
          <p>
            We combine the viral mechanics of Web3 with real-world impact. Donors earn status, leaderboards, and governance rights. DAO members—crypto exchanges, funds, protocols—amplify campaigns and gain reputation. Everyone wins.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4">
          {flow.map((item, i) => (
            <div key={item.main} className="flex items-center gap-4">
              <div className="border-2 border-white rounded-2xl px-6 py-8 w-full sm:w-[352px] text-center">
                <div className="text-[48px] sm:text-[69px] font-medium text-[#FAFAFC]">{item.main}</div>
                <div className="text-[18px] sm:text-[22px] text-[#FAFAFC]">{item.sub}</div>
              </div>
              {i < flow.length - 1 && (
                <svg className="w-10 h-10 text-white shrink-0 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
