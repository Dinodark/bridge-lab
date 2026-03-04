const colors = [
  "from-lime-400 to-emerald-600",
  "from-red-500 to-rose-600",
  "from-amber-400 to-orange-500",
  "from-blue-500 to-indigo-600",
  "from-fuchsia-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-cyan-400 to-teal-500",
  "from-yellow-400 to-amber-500",
];

function NFTItem({ i }: { i: number }) {
  return (
    <div
      className={`w-[240px] h-[240px] shrink-0 bg-gradient-to-br ${colors[i % colors.length]}`}
    />
  );
}

export default function LandingNFTGallery() {
  const row1 = Array.from({ length: 8 }, (_, i) => i);
  const row2 = Array.from({ length: 8 }, (_, i) => i + 8);

  return (
    <section className="py-0 overflow-hidden">
      <div className="flex flex-col">
        <div className="overflow-hidden">
          <div className="flex gap-0 w-max animate-marquee">
            {row1.map((i) => (
              <NFTItem key={`r1-a-${i}`} i={i} />
            ))}
            {row1.map((i) => (
              <NFTItem key={`r1-b-${i}`} i={i} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-0 w-max animate-marquee-reverse">
            {row2.map((i) => (
              <NFTItem key={`r2-a-${i}`} i={i} />
            ))}
            {row2.map((i) => (
              <NFTItem key={`r2-b-${i}`} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
