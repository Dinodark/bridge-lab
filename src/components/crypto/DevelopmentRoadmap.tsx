const milestones = [
  { id: "q1", label: "Q1 2026: Mobile App Launch", progress: 100 },
  { id: "q2", label: "Q2 2026: DAO governance", progress: 65 },
  { id: "q3", label: "Q3 2026: Multi-chain Support", progress: 40 },
];

export default function DevelopmentRoadmap() {
  return (
    <section id="roadmap" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-8">Development Roadmap</h2>
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="sm:w-64 font-medium text-zinc-900 shrink-0">{milestone.label}</span>
              <div className="flex-1 h-3 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-900 rounded-full transition-all duration-500"
                  style={{ width: `${milestone.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
