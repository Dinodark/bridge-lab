export default function Hero() {
  return (
    <section className="relative min-h-[500px] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-500 to-amber-400 opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20400%22%3E%3Cpath%20fill%3D%22rgba(255%2C255%2C255%2C0.1)%22%20d%3D%22M0%20200%20Q300%20100%20600%20200%20T1200%20200%20L1200%20400%20L0%20400%20Z%22%2F%3E%3C%2Fsvg%3E')] bg-bottom bg-no-repeat bg-contain opacity-50" />
      
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Ты не один.
          <br />
          У тебя есть Bridge.
        </h1>
        <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto">
          Мы действуем вместе и меняем жизни с нашим сообществом
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
