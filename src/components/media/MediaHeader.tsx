export default function MediaHeader() {
  return (
    <header className="border-b border-white/10 bg-[#0f0a1e]/80 backdrop-blur-md sticky top-14 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Медиа
          </span>
        </h1>
        <p className="mt-2 text-white/70 text-lg max-w-2xl">
          Видео, изображения, истории и рилсы. Эксперименты с визуальным контентом и AI-моделями персонажей.
        </p>
      </div>
    </header>
  );
}
