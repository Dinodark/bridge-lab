import Image from "next/image";
import Link from "next/link";

export default function CryptoHero() {
  return (
    <section className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] pt-20">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=800&fit=crop"
          alt="Community"
          fill
          className="object-cover grayscale"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-zinc-900/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 lg:pt-28">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Eine junge Mutter ging viel zu früh...
          </h1>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-100 transition-colors"
          >
            Spenden
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
