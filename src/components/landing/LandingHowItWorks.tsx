const steps = [
  {
    title: "Create or Support",
    desc: "Anyone can launch a verified campaign. Donors browse causes—children, refugees, climate, health.",
  },
  {
    title: "Donate & Receive NFT",
    desc: "Every donation mints a unique NFT with campaign story, impact metrics, and your contribution level.",
  },
  {
    title: "Build Your Legacy",
    desc: "Collect NFTs. Climb leaderboards. Join DAO governance. Show the world you're making a difference.",
  },
];

export default function LandingHowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-[48px] sm:text-[62px] font-bold text-[#FAFAFC] text-center mb-6">
          How It Works
        </h2>
        <p className="text-[18px] text-[#FAFAFC] text-center mb-16 max-w-[756px] mx-auto">
          Three simple steps to create lasting impact
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="p-8 text-center"
            >
              <h3 className="text-[24px] font-medium text-[#FAFAFC] mb-4">{step.title}</h3>
              <p className="text-[16px] text-[#FAFAFC] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
