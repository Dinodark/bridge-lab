import Link from "next/link";

const features = [
  {
    title: "Создай",
    description:
      "Построй свой проект и принеси реальную пользу своему сообществу и миру",
    button: "Создать проект",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: "Помоги",
    description:
      "Распознай потребности своего сообщества и поделись тем, что умеешь. Что служит твоему Bridge, укрепляет и тебя",
    button: "Начать проект",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Поддержи",
    description:
      "Запусти инициативу и объедини людей, которые разделяют твои ценности",
    button: "Запустить инициативу",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function FeatureCards() {
  return (
    <section className="py-16 px-6 -mt-20 relative z-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl shadow-lg shadow-zinc-200/50 p-8 flex flex-col"
          >
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
            <p className="text-zinc-600 mb-6 flex-grow">{feature.description}</p>
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              {feature.button}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
