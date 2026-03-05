"use client";

import { useTheme } from "@/contexts/ThemeContext";

type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in_progress" | "done";
  version?: string;
};

const ROADMAP: RoadmapItem[] = [
  {
    id: "v1-versioning",
    title: "Версионность Roadmap",
    description:
      "Ввести систему версий Roadmap (v1.0, v1.1 и т.д.). Каждое обновление Roadmap — новая версия. История версий сохраняется.",
    status: "planned",
    version: "v1.0",
  },
  {
    id: "v1-onebridge-guidelines",
    title: "OneBridge Brand Guidelines",
    description:
      "Брендбук OneBridge: копия OneTribe Guidelines с палитрой OneBridge (teal, blue, amber, emerald). Либо единая система с переключением темы — цвета через переменные.",
    status: "planned",
    version: "v1.0",
  },
  {
    id: "v1-theme-switch",
    title: "Переключение OneTribe ↔ OneBridge",
    description:
      "Глобальное переключение цветовой палитры. Кнопки, градиенты, акценты — через CSS-переменные. Один сайт, два бренда-близнеца.",
    status: "in_progress",
    version: "v1.0",
  },
  {
    id: "v1-localization",
    title: "Локализация RU / EN / ZH / DE",
    description:
      "Четыре языка: русский, английский, китайский, немецкий. Контент для максимального охвата аудитории без лишних затрат.",
    status: "planned",
    version: "v1.0",
  },
  {
    id: "v1-ai-agents",
    title: "ИИ-агенты для PR и контента",
    description:
      "Агент анализирует материал и решает: рилсы, посты в телеграм, обучающие статьи. Сверяет с концепцией бренда. Субагенты — узкие задачи (посты, рилсы).",
    status: "planned",
    version: "v1.0",
  },
  {
    id: "v1-tribe-tools",
    title: "Инструменты для Tribe",
    description:
      "Обложки, баннеры, мемы для платформы. Публикация постов в общую группу. N постов в неделю по уровню. Кнопки Send To Tribe / Keep Secret.",
    status: "planned",
    version: "v1.0",
  },
  {
    id: "v1-secrecy-mechanic",
    title: "Игровая механика секретности",
    description:
      "Чем больше голосов Keep Secret — тем выше уровень для просмотра. 3% секретности = уровень 1, 67% = уровень 6+.",
    status: "planned",
    version: "v1.0",
  },
];

const STATUS_LABELS = {
  planned: "Запланировано",
  in_progress: "В работе",
  done: "Готово",
};

export default function RoadmapPage() {
  const { palette } = useTheme();

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Inter Tight', Inter, sans-serif",
        background: "var(--color-bg)",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1
            className="mb-2 text-4xl font-bold"
            style={{
              backgroundImage: palette.gradient1,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Roadmap
          </h1>
          <p className="text-[var(--color-muted)]">
            OneBridge · План развития. Версионность — в плане до первого обновления.
          </p>
        </div>

        <div className="space-y-6">
          {ROADMAP.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {item.version && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      background: palette.gradient2,
                      color: "#fff",
                    }}
                  >
                    {item.version}
                  </span>
                )}
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background:
                      item.status === "done"
                        ? "rgba(16, 185, 129, 0.2)"
                        : item.status === "in_progress"
                          ? "rgba(245, 158, 11, 0.2)"
                          : "rgba(128, 128, 128, 0.15)",
                    color:
                      item.status === "done"
                        ? "#059669"
                        : item.status === "in_progress"
                          ? "#b45309"
                          : "var(--color-muted)",
                  }}
                >
                  {STATUS_LABELS[item.status]}
                </span>
              </div>
              <h2 className="mb-2 text-xl font-bold text-[var(--color-text)]">
                {item.title}
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-dashed border-[var(--color-border)] bg-white/50 p-8 text-center">
          <p className="text-sm text-[var(--color-muted)]">
            Версионность Roadmap будет реализована до первого обновления плана.
          </p>
        </div>
      </div>
    </div>
  );
}
