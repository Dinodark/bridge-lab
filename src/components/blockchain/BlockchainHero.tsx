import Image from "next/image";
import Link from "next/link";

const campaigns = [
  {
    id: 1,
    title: "Food For The Homeless",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
    progress: 65,
  },
  {
    id: 2,
    title: "Clean Water For Rural",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop",
    progress: 40,
  },
  {
    id: 3,
    title: "Help Save Lives",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    progress: 80,
  },
];

export default function BlockchainHero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C27B0%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 mb-12 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            The First Blockchain Charity Platform
          </h1>
          <p className="text-xl text-cyan-300/90 mb-6">
            Where Good Deeds Become Digital Legacy
          </p>
          <p className="text-white/80 mb-8 max-w-xl">
            Bridge combines traditional charitable giving with blockchain technology, 
            NFTs, and community governance to create transparent, traceable impact.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:from-violet-500 hover:to-purple-500 transition-all">
              Join The Movement
            </button>
            <Link
              href="#how-it-works"
              className="px-6 py-3 border border-white/50 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex-1 flex gap-4 justify-center lg:justify-end">
          {campaigns.map((campaign, i) => (
            <div
              key={campaign.id}
              className="w-48 sm:w-56 flex-shrink-0 bg-white/5 backdrop-blur rounded-xl overflow-hidden border border-white/10"
              style={{ transform: `translateY(${i * 12}px)` }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  className="object-cover grayscale"
                  sizes="224px"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white text-sm mb-2">{campaign.title}</h3>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
                <button className="w-full py-2 text-sm font-medium text-violet-300 hover:text-violet-200 transition-colors">
                  Browse Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center animate-bounce">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
