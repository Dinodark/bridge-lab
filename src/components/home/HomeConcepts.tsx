"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import VisibilityBlock from "@/components/VisibilityBlock";
import { useLiked } from "@/hooks/useLiked";
import FlameIcon from "@/components/icons/FlameIcon";
import { AnalyticsCountBadge } from "@/components/AnalyticsCountBadge";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { incrementLocalCount, decrementLocalCount } from "@/hooks/useAnalyticsCount";

const CONCEPTS = [
  {
    id: "petrogliph",
    slug: "petrogliph",
    ru: { name: "Петроглифы", desc: "Огонь, логотип и символы в стиле наскальной живописи." },
    de: { name: "Petroglyphen", desc: "Feuer, Logo und Symbole im Stil der Felsmalerei." },
    assets: {
      fire: "/concepts/petrogliph/fire.svg",
      logo: "/concepts/petrogliph/logo.svg",
      person: "/concepts/petrogliph/img-1.svg",
      animal: "/concepts/petrogliph/img-2.svg",
      cover: "/concepts/petrogliph/cover.png",
      coverHover: "/concepts/petrogliph/cover-1.png",
    },
  },
] as const;

const CONTENT = {
  ru: {
    title: "Концепции",
    subtitle: "Обложки и ссылки на промо-страницы с проработкой концепций.",
    more: "Подробнее",
    fire: "Огонь",
  },
  de: {
    title: "Konzepte",
    subtitle: "Cover und Links zu Promo-Seiten mit Konzeptausarbeitung.",
    more: "Mehr",
    fire: "Feuer",
  },
} as const;

function ConceptCard({
  concept,
  fireLabel,
  moreLabel,
  lang,
}: {
  concept: (typeof CONCEPTS)[number];
  fireLabel: string;
  moreLabel: string;
  lang: "ru" | "de";
}) {
  const targetId = `concept-${concept.id}`;
  const [liked, setLikedState] = useLiked(targetId);
  const { trackLike } = useAnalytics();

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !liked;
    if (next) {
      trackLike(targetId, "concept");
      incrementLocalCount(targetId, "like");
    } else {
      decrementLocalCount(targetId, "like");
    }
    setLikedState(next);
  };

  return (
    <Link
      href={`/concepts/${concept.slug}`}
      className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Banner: cover image with hover transition */}
      <div
        className="relative aspect-[2/1] sm:aspect-[2.5/1] flex items-center justify-center overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* Cover layers — crossfade on hover */}
        <img
          src={concept.assets.cover}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={concept.assets.coverHover}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Bottom bar: title, like, more */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
      >
        <div>
          <h3 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>
            {concept[lang].name}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
            {concept[lang].desc}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLike}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors hover:opacity-90"
            style={{
              borderColor: "var(--color-border)",
              background: liked ? "var(--color-bg-active)" : "transparent",
              color: "var(--color-text)",
            }}
          >
            <FlameIcon filled={liked} size={18} className={liked ? "" : "opacity-60"} />
            <span className="text-xs font-medium">{fireLabel}</span>
            <AnalyticsCountBadge targetId={targetId} type="like" className="text-xs" />
          </button>
          <span
            className="text-sm font-medium px-3 py-1.5 rounded-lg"
            style={{ background: "var(--color-cta1)", color: "#fff" }}
          >
            {moreLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomeConcepts() {
  const { lang } = useLanguage();
  const t = CONTENT[lang === "de" ? "de" : "ru"];

  return (
    <section className="rounded-xl border p-6 sm:p-8" style={{ borderColor: "var(--color-border)" }}>
      <div>
        <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-cta1)" }}>
          Concepts
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "var(--color-text)" }}>
          {t.title}
        </h2>
        <p className="text-base mb-12 max-w-2xl" style={{ color: "var(--color-muted)" }}>
          {t.subtitle}
        </p>

        <div className="space-y-8">
          {CONCEPTS.map((concept) => (
            <VisibilityBlock key={concept.id} entityId={`concept-${concept.id}`}>
              <ConceptCard
                concept={concept}
                fireLabel={t.fire}
                moreLabel={t.more}
                lang={lang === "de" ? "de" : "ru"}
              />
            </VisibilityBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
