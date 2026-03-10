import Link from "next/link";

export default function PlatformIntro() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-content mx-auto">
        <p className="text-sm text-zinc-500 uppercase tracking-wider mb-4">
          Achieving the world&apos;s charities offers together.
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
          Community driven crypto charity platform.
        </h2>
        <p className="text-lg text-zinc-600 mb-8 max-w-2xl">
          Transparent charity based on web3 technologies. Every donation is tracked on the blockchain.
        </p>
        <Link
          href="/crypto#get-started"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
        >
          Get Started
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
