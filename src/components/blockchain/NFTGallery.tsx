const colors = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-indigo-500 to-violet-600",
];

function NFTItem({ i }: { i: number }) {
  return (
    <div
      className={`flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} border-2 border-white/20`}
    />
  );
}

export default function NFTGallery() {
  const indices = Array.from({ length: 18 }, (_, i) => i);
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div className="flex gap-3 w-max animate-marquee">
            {indices.map((i) => (
              <NFTItem key={`a-${i}`} i={i} />
            ))}
            {indices.map((i) => (
              <NFTItem key={`b-${i}`} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
