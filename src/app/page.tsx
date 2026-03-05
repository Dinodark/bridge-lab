import Link from "next/link";

const feedItems = [
  {
    href: "/roadmap",
    title: "OneBridge Roadmap",
    excerpt: "План развития. Версионность, OneBridge Guidelines, локализация RU/EN/ZH/DE, ИИ-агенты, инструменты Tribe.",
    createdAt: "2026-03-04",
    tag: "Roadmap",
  },
  {
    href: "/crypto",
    title: "Bridge Crypto — Криптоблаготворительность",
    excerpt: "Community driven crypto charity platform. Transparent charity based on web3 technologies.",
    createdAt: "2025-01-15",
    tag: "Crypto",
  },
  {
    href: "/blockchain",
    title: "The First Blockchain Charity Platform",
    excerpt: "Where Good Deeds Become Digital Legacy. NFT-driven charity platform.",
    createdAt: "2025-01-20",
    tag: "Blockchain",
  },
  {
    href: "/landing",
    title: "Bridge Crypto Charity — Landing",
    excerpt: "Where Good Deeds Become Digital Legacy. NFT-driven charity platform.",
    createdAt: "2025-02-01",
    tag: "Landing",
  },
  {
    href: "/explore",
    title: "Explore Cases — Find Projects That Matter",
    excerpt: "190 проектов. Найдите то, что важно для вас.",
    createdAt: "2025-03-10",
    tag: "Explore",
  },
  {
    href: "/merch",
    title: "OneTribe Merch · Classic Tee",
    excerpt: "Футболка с логотипом OneTribe. Белая и чёрная.",
    createdAt: "2025-06-01",
    tag: "Merch",
  },
  {
    href: "/brandbook",
    title: "Brand Identity Standards",
    excerpt: "Брендбук: цвета, типографика, паттерны, офлайн-применение.",
    createdAt: "2026-01-10",
    tag: "Brandbook",
  },
  {
    href: "/brandguidelines",
    title: "OneTribe Brand Guidelines",
    excerpt: "Foundation, Colors, Typography, Logo, Icons, Imagery, Motion, Patterns, Layout, Applications.",
    createdAt: "2026-02-15",
    tag: "Brand Guidelines",
  },
  {
    href: "/dao",
    title: "Tribe DAO — Сообщество решает",
    excerpt: "DAO — децентрализованная автономная организация. RU/DE.",
    createdAt: "2026-03-04",
    tag: "DAO",
  },
];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)", fontFamily: "'Inter Tight', Inter, sans-serif" }}>
      <div className="max-w-2xl mx-auto px-6 py-12">

        <h2 className="text-lg font-semibold uppercase tracking-wider mb-8" style={{ color: "var(--color-muted)" }}>
          Лента
        </h2>

        <ul className="space-y-8">
          {[...feedItems]
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block group"
              >
                <article className="border-b pb-8 transition-colors hover:opacity-90" style={{ borderColor: "var(--color-border)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block text-xs font-medium" style={{ color: "var(--color-cta1)" }}>
                      {item.tag}
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-muted)" }}>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2 transition-colors group-hover:opacity-80" style={{ color: "var(--color-text)" }}>
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
                    {item.excerpt}
                  </p>
                  <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                    Читать →
                  </span>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
