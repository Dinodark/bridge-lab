import Link from "next/link";
import ConceptPromo from "@/components/concepts/ConceptPromo";

const CONCEPTS: Record<
  string,
  { ru: { name: string }; de: { name: string }; assets: { key: string; labelRu: string; labelDe: string; path: string }[] }
> = {
  petrogliph: {
    ru: { name: "Петроглифы" },
    de: { name: "Petroglyphen" },
    assets: [
      { key: "full", labelRu: "Полная композиция", labelDe: "Vollständige Komposition", path: "/concepts/petrogliph/petrogliph-full.svg" },
      { key: "fire", labelRu: "Огонь", labelDe: "Feuer", path: "/concepts/petrogliph/fire.svg" },
      { key: "logo", labelRu: "Логотип", labelDe: "Logo", path: "/concepts/petrogliph/logo.svg" },
      { key: "person", labelRu: "Человек", labelDe: "Mensch", path: "/concepts/petrogliph/img-1.svg" },
      { key: "animal", labelRu: "Животное", labelDe: "Tier", path: "/concepts/petrogliph/img-2.svg" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concept = CONCEPTS[id];
  const name = concept?.ru?.name ?? id;
  return {
    title: `${name} — Концепция Tribe`,
    description: "Промо-страница концепции. Скачайте элементы, скопируйте в буфер.",
  };
}

export default async function ConceptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concept = CONCEPTS[id];

  if (!concept) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Концепция не найдена
          </h1>
          <Link href="/" className="underline" style={{ color: "var(--color-cta1)" }}>
            На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 pb-12 overflow-x-hidden" style={{ background: "var(--color-bg)", fontFamily: "var(--font-body)" }}>
      <ConceptPromo conceptId={id} concept={concept} />
    </div>
  );
}
