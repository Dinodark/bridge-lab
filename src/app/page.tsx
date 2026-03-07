import type { Metadata } from "next";
import Link from "next/link";
import HomeBanner from "@/components/HomeBanner";

export const metadata: Metadata = {
  openGraph: {
    images: ["/assets/home-feed-illustration.webp"],
  },
};

const TRIBE_INSIGHTS = `Просмотрев материалы Tribe, партнёр увидит целостную систему идентичности: как одно ядро бренда воплощается в разных контекстах — от DAO до мерча. Это вдохновляет на понимание масштабируемости подхода и потенциала community-driven продукта.`;

const TASTY_BLOCKS = [
  { href: "/tribe", tag: "Tribe", keyIdea: "Living Identity System", use: "Одно ядро — бесконечные темы. Fire, Water, Earth, Cosmos.", gradient: "linear-gradient(135deg, #48e5ff 0%, #f989b4 100%)" },
  { href: "/dao", tag: "DAO", keyIdea: "Сообщество решает", use: "Прозрачность, соучастие, децентрализация. Governance в действии.", gradient: "linear-gradient(135deg, #5a1fc9 0%, #b289f9 50%, #f989b4 100%)" },
  { href: "/media", tag: "Media", keyIdea: "Видео, изображения, AI", use: "FLUX LoRA, галерея контента. Медиа как актив бренда.", gradient: "linear-gradient(135deg, #b289f9 0%, #f989b4 100%)" },
  { href: "/strategy", tag: "Strategy", keyIdea: "Стратегия", use: "Видение, цели, направления. Как мы движемся.", gradient: "linear-gradient(135deg, #48e5ff 0%, #b289f9 100%)" },
  { href: "/brandguidelines", tag: "Brand", keyIdea: "Foundation & Motion", use: "Цвета, типографика, DAO Sphere, волны. Вдохновляющие стандарты.", gradient: "linear-gradient(135deg, #F8F5FF 0%, #FFF5FC 100%)" },
  { href: "/roadmap", tag: "Roadmap", keyIdea: "План развития", use: "Версионность, локализация, ИИ-агенты. Куда движемся.", gradient: "linear-gradient(135deg, #6E22F2 0%, #C752FF 100%)" },
];

const BRIDGE_LANDINGS = [
  { href: "/blockchain", title: "Bridge", subtitle: "The First Blockchain Charity Platform", desc: "Where Good Deeds Become Digital Legacy. NFT-driven charity." },
  { href: "/crypto", title: "Mobile First", subtitle: "Bridge Crypto — Криптоблаготворительность", desc: "Community driven. Transparent charity on web3." },
  { href: "/explore", title: "Starter", subtitle: "Explore Cases — Find Projects That Matter", desc: "190 проектов. Найдите то, что важно для вас." },
];

const FUTURE_BLOCK = {
  title: "Куда движемся",
  goals: [
    "Локализация RU/EN/ZH/DE — Tribe говорит на языке сообщества",
    "ИИ-агенты для поддержки и модерации — масштаб без потери качества",
    "Инструменты Tribe — Host-панели, аналитика, геймификация",
    "Интеграция с Bridge — благотворительность как часть идентичности",
  ],
  hook: "Мы изучаем, экспериментируем и строим. Хотите увидеть, что будет дальше?",
};

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)", fontFamily: "'Inter Tight', Inter, sans-serif" }}>
      <HomeBanner />

      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 space-y-20">
        {/* 1. TRIBE — инсайты для партнёра */}
        <section>
          <div className="inline-block text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "var(--color-cta1)" }}>
            TRIBE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6" style={{ color: "var(--color-text)" }}>
            Что увидит партнёр
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--color-muted)" }}>
            {TRIBE_INSIGHTS}
          </p>
        </section>

        {/* 2. Вкусняшки лендингов — ключевая идея + как использовать */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
            Вкусняшки разделов
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--color-muted)" }}>
            Ключевая идея и как использовать каждый материал
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TASTY_BLOCKS.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <article
                  className="rounded-xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg mb-4"
                    style={{ background: item.gradient }}
                  />
                  <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "var(--color-cta1)" }}>
                    {item.tag}
                  </span>
                  <h3 className="text-base font-bold mt-1 mb-2" style={{ color: "var(--color-text)" }}>
                    {item.keyIdea}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {item.use}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--color-cta1)" }}>
                    Открыть
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* 2.5. Мерч — широкий блок */}
        <section>
          <Link href="/merch" className="group block">
            <article
              className="relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                borderColor: "var(--color-border)",
                background: "linear-gradient(135deg, #1E1E1E 0%, #444 100%)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 md:p-10">
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                    Merch
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#fff" }}>
                    OneTribe Merch
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
                    Футболка с логотипом OneTribe. Белая и чёрная. Классика племени.
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-all group-hover:gap-2.5"
                    style={{ color: "var(--color-cta1)" }}
                  >
                    Смотреть
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center justify-center min-h-[140px] md:min-h-[180px]">
                  <div
                    className="w-24 h-24 rounded-xl flex items-center justify-center text-4xl font-black"
                    style={{ background: "rgba(255,255,255,0.9)", color: "#1E1E1E" }}
                  >
                    OT
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </section>

        {/* 3. Bridge — лендинги-презентации */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
            Bridge
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--color-muted)" }}>
            Лендинги-презентации платформы
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRIDGE_LANDINGS.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <article
                  className="relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
                >
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #1a0a2e 0%, #5a1fc9 50%, #b289f9 100%)",
                    }}
                  >
                    <span className="text-3xl font-black text-white/90">{item.title}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
                      {item.subtitle}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-muted)" }}>
                      {item.desc}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium transition-all group-hover:gap-2.5"
                      style={{ color: "var(--color-cta1)" }}
                    >
                      Смотреть
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Куда движемся */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2" style={{ color: "var(--color-text)" }}>
            {FUTURE_BLOCK.title}
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--color-muted)" }}>
            Цели, способы и гипотезы. Что мы изучаем и куда идём.
          </p>
          <ul className="space-y-4 mb-10">
            {FUTURE_BLOCK.goals.map((goal, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--color-cta1)", color: "#fff" }}>
                  {i + 1}
                </span>
                <span className="text-base leading-relaxed" style={{ color: "var(--color-text)" }}>
                  {goal}
                </span>
              </li>
            ))}
          </ul>
          <div
            className="rounded-2xl border p-6 sm:p-8 text-center"
            style={{ borderColor: "var(--color-border)", background: "linear-gradient(135deg, #F8F5FF 0%, #FFF5FC 50%, #F5F8FF 100%)" }}
          >
            <p className="text-lg font-medium mb-4" style={{ color: "var(--color-text)" }}>
              {FUTURE_BLOCK.hook}
            </p>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:gap-3"
              style={{ background: "var(--color-cta1)", color: "#fff" }}
            >
              Roadmap
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
