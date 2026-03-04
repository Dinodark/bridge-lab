import Link from "next/link";

const feedItems = [
  {
    href: "/crypto",
    title: "Bridge Crypto — Криптоблаготворительность",
    excerpt: "Community driven crypto charity platform. Transparent charity based on web3 technologies.",
    date: "2025",
    tag: "Crypto",
  },
  {
    href: "/blockchain",
    title: "The First Blockchain Charity Platform",
    excerpt: "Where Good Deeds Become Digital Legacy. NFT-driven charity platform.",
    date: "2025",
    tag: "Blockchain",
  },
  {
    href: "/landing",
    title: "Bridge Crypto Charity — Landing",
    excerpt: "Where Good Deeds Become Digital Legacy. NFT-driven charity platform.",
    date: "2025",
    tag: "Landing",
  },
  {
    href: "/explore",
    title: "Explore Cases — Find Projects That Matter",
    excerpt: "190 проектов. Найдите то, что важно для вас.",
    date: "2025",
    tag: "Explore",
  },
  {
    href: "/merch",
    title: "OneTribe Merch · Classic Tee",
    excerpt: "Футболка с логотипом OneTribe. Белая и чёрная.",
    date: "2025",
    tag: "Merch",
  },
  {
    href: "/brandbook",
    title: "Brand Identity Standards",
    excerpt: "Брендбук: цвета, типографика, паттерны, офлайн-применение.",
    date: "2026",
    tag: "Brandbook",
  },
  {
    href: "/brandguidelines",
    title: "OneTribe Brand Guidelines",
    excerpt: "Foundation, Colors, Typography, Logo, Icons, Imagery, Motion, Patterns, Layout, Applications.",
    date: "2026",
    tag: "Brand Guidelines",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400 bg-clip-text text-transparent">
              Bridge
            </h1>
          </Link>
          <p className="text-zinc-500 text-sm mt-1">
            Благотворительная платформа
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-lg font-semibold text-zinc-400 uppercase tracking-wider mb-8">
          Лента
        </h2>

        <ul className="space-y-8">
          {[...feedItems]
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block group"
              >
                <article className="border-b border-zinc-200/60 pb-8 hover:border-zinc-300 transition-colors">
                  <span className="inline-block text-xs font-medium text-violet-500 mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-violet-600 transition-colors leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-base leading-relaxed mb-3">
                    {item.excerpt}
                  </p>
                  <span className="text-sm text-zinc-400">
                    {item.date} · Читать →
                  </span>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
