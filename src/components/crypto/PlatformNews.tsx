const news = [
  { title: "New partnership with major crypto exchange", time: "2 days ago" },
  { title: "100+ campaigns successfully funded", time: "1 day ago" },
  { title: "New NFT badges available for top contributors", time: "1 min ago" },
];

export default function PlatformNews() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-content mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-8">Platform News</h2>
        <ul className="space-y-4">
          {news.map((item) => (
            <li
              key={item.title}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-zinc-200 last:border-0"
            >
              <span className="font-medium text-zinc-900">{item.title}</span>
              <span className="text-sm text-zinc-500 shrink-0">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
