import Image from "next/image";
import Link from "next/link";

const mediaItems = [
  {
    id: "video",
    title: "Video of the Week",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop",
    href: "/media/video",
  },
  {
    id: "article",
    title: "Article of the Week",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    href: "/media/article",
  },
  {
    id: "post",
    title: "Post of the Week",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    href: "/media/post",
  },
  {
    id: "tweet",
    title: "Tweet of the Week",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop",
    href: "/media/tweet",
  },
];

export default function MediaOfTheWeek() {
  return (
    <section id="media" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {mediaItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {item.id === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-6 h-6 text-zinc-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-zinc-900 group-hover:text-zinc-700">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
