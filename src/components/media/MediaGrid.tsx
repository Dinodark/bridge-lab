"use client";

import Image from "next/image";

const SOULY_IMAGES = [
  "/souly/0aeptxz9jxrmw0cw7wrbf0std8.webp",
  "/souly/0befdwccrnrmw0cw7wfrks4jk0.webp",
  "/souly/0bk5mj9mjdrmy0cw6gavnb6qzw.webp",
  "/souly/0bncbb5g0drmr0cw6ewvp5f3j4.webp",
  "/souly/0bqhm1qdyhrmr0cw6g6bd02s90.webp",
  "/souly/0bwcqxygh5rmy0cw7vt963mqpm.webp",
  "/souly/0capwn04xdrmw0cw7y0bxbyteg.webp",
  "/souly/0czk6rqxp9rmt0cw725tprkfq0.webp",
  "/souly/0d0d9nvac9rmw0cw70eb44yxww.webp",
  "/souly/0d95t6pns9rmt0cw7y3sq4e25g.webp",
];

export default function MediaGrid() {
  const images = [...SOULY_IMAGES, ...SOULY_IMAGES];

  return (
    <section className="py-16 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <h2 className="text-xl font-semibold text-white/90">Галерея</h2>
      </div>
      <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden">
        <div className="flex gap-2 min-w-max animate-marquee">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-48 sm:w-56 md:w-64 aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={src}
                alt={`Souly ${(i % SOULY_IMAGES.length) + 1}`}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
