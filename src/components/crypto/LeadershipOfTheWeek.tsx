const leaders = [
  { rank: 1, handle: "@cryptophil", amount: "$15,400" },
  { rank: 2, handle: "@charitycoin", amount: "$12,800" },
  { rank: 3, handle: "@giveback", amount: "$6,300" },
];

export default function LeadershipOfTheWeek() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="max-w-content mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">Leadership of the Week</h2>
        <p className="text-zinc-600 mb-8">Top Donators</p>
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          {leaders.map((leader, i) => (
            <div
              key={leader.handle}
              className={`flex items-center justify-between px-6 py-4 ${
                i < leaders.length - 1 ? "border-b border-zinc-200" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-bold">
                  {leader.rank}
                </span>
                <span className="font-medium text-zinc-900">{leader.handle}</span>
              </div>
              <span className="font-bold text-zinc-900">{leader.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
