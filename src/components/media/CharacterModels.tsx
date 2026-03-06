import Image from "next/image";
import Link from "next/link";

interface LoRAModel {
  id: string;
  name: string;
  description: string;
  triggers: string[];
  image: string;
  link?: string;
}

const MODELS: LoRAModel[] = [
  {
    id: "1",
    name: "Bridge Guardian",
    description:
      "Персонаж-хранитель платформы Bridge. Стиль: цифровое искусство, мягкое освещение, фиолетово-бирюзовые акценты. Идеален для визуализации миссии и ценностей проекта.",
    triggers: ["bridge guardian", "digital art", "violet cyan"],
    image: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=600&h=800&fit=crop",
    link: "#",
  },
  {
    id: "2",
    name: "Tribe Spirit",
    description:
      "Дух сообщества Tribe. Мистический, тёплый, с элементами природы и технологий. Подходит для креативов о единстве и благотворительности.",
    triggers: ["tribe spirit", "mystical", "community"],
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=800&fit=crop",
    link: "#",
  },
];

export default function CharacterModels() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            FLUX LoRA модели
          </h2>
          <p className="text-white/70 max-w-2xl">
            Персонажи для генерации изображений. Используйте триггеры в промптах для стабильного результата.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {MODELS.map((model) => (
            <div
              key={model.id}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-300 hover:border-violet-400/30 hover:shadow-[0_0_32px_rgba(139,92,246,0.2)]"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-56 flex-shrink-0 aspect-[3/4] sm:aspect-square">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-violet-600/80 text-white text-xs font-medium">
                    FLUX LoRA
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                  <p className="text-white/80 text-sm mb-4 flex-1">{model.description}</p>
                  <div className="mb-4">
                    <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">
                      Триггеры
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {model.triggers.map((t) => (
                        <code
                          key={t}
                          className="px-2 py-1 rounded bg-white/10 text-violet-300 text-xs font-mono"
                        >
                          {t}
                        </code>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={model.link ?? "#"}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium hover:from-violet-500 hover:to-purple-500 transition-all btn-gradient-glow"
                  >
                    <span>Попробовать</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-white/50 text-sm text-center">
          Функционал генерации изображений с моделями — в разработке. Скоро вы сможете создавать свои креативы прямо здесь.
        </p>
      </div>
    </section>
  );
}
