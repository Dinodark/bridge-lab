"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: "new", label: "Новое", icon: "⭐", active: true },
  { id: "business", label: "Бизнес" },
  { id: "spirituality", label: "Духовность" },
  { id: "health", label: "Здоровье и баланс" },
  { id: "community", label: "Сообщество и помощь" },
  { id: "tribe", label: "Наш Bridge" },
];

const projects = [
  {
    id: 1,
    title: "Центр осознанности и медитации в Берлине",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    supporters: null,
    raised: 700,
    goal: 10000,
  },
  {
    id: 2,
    title: "Ретрит «Сила женщины» в Альпах",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    supporters: 11,
    raised: 2200,
    goal: 5000,
  },
  {
    id: 3,
    title: "Школа осознанного родительства и альтернативного образования",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop",
    supporters: 19,
    raised: 7800,
    goal: 20000,
  },
  {
    id: 4,
    title: 'Программа «Здоровье изнутри»',
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    supporters: 33,
    raised: 930,
    goal: 3000,
  },
  {
    id: 5,
    title: "Новая глава для Анны",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=400&fit=crop",
    supporters: 400,
    raised: 3480,
    goal: 5000,
  },
  {
    id: 6,
    title: "Публикация историй участников Bridge",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    supporters: 18,
    raised: 1800,
    goal: 2400,
  },
];

export default function ProjectCards() {
  const [activeCategory, setActiveCategory] = useState("new");

  return (
    <section className="py-16 px-6 bg-zinc-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-rose-500 text-white"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {project.supporters && (
                  <span className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 rounded-full text-white text-xs font-medium">
                    {project.supporters} поддерж.
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-zinc-900 mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <div className="mb-4">
                  <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{
                        width: `${Math.min((project.raised / project.goal) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-zinc-700 font-medium">
                      Собрано €{project.raised.toLocaleString()}
                    </span>
                    <span className="text-zinc-500">
                      из €{project.goal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/project/${project.id}`}
                  className="block w-full py-3 text-center rounded-xl border-2 border-rose-400 text-rose-600 font-medium hover:bg-rose-50 transition-colors"
                >
                  Пожертвовать
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
