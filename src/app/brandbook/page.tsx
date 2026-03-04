import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const GRADIENT_MAIN =
  "linear-gradient(135deg, #48E5FF 0%, #B289F9 33%, #F989B4 66%, #FFBC6F 100%)";
const GRADIENT_ELITE = "linear-gradient(135deg, #6E22F2 0%, #C752FF 100%)";

const basicColors = [
  { hex: "#48E5FF", name: "Aqua" },
  { hex: "#B289F9", name: "Grape" },
  { hex: "#F989B4", name: "Pink" },
  { hex: "#FFBC6F", name: "Orange" },
];

const eliteColors = [
  { hex: "#6E22F2", name: "Violet" },
  { hex: "#C752FF", name: "Magenta" },
  { hex: "#FD6F6E", name: "Coral" },
  { hex: "#0866FF", name: "Blue" },
];

const neutralColors = [
  { hex: "#1E1E1E", name: "Black", text: "white" },
  { hex: "#808080", name: "Gray", text: "white" },
  { hex: "#E6E6E6", name: "Light Gray", text: "#1E1E1E" },
  { hex: "#FCFCFC", name: "Off-white", text: "black" },
];

export const metadata = {
  title: "Brand Identity Standards — Bridge / OneTribe",
  description: "Brand guidelines, colors, typography, and patterns",
};

export default function BrandbookPage() {
  return (
    <div
      className={`${interTight.className} min-h-screen bg-white`}
    >
      {/* Header */}
      <header className="border-b border-black/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-medium text-black">Match, 2026</span>
          <span className="w-2 h-2 bg-black rounded-full" />
          <span className="text-xl font-medium text-black">tribe</span>
        </div>
        <div className="flex items-center gap-6 text-lg text-black/60">
          <span>Brand Guidelines</span>
          <span>v 1.0</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 30% 20%, #48E5FF 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 70% 80%, #B289F9 0%, transparent 50%)",
            }}
          />
          <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-extrabold italic text-center text-black tracking-tight">
            Brand Identity Standards
          </h1>
          <div className="relative mt-16 flex items-center gap-4 text-xl text-black/50">
            <span>Match, 2026</span>
            <span>·</span>
            <span>v 1.0</span>
          </div>
        </section>

        {/* Introduction */}
        <section className="px-6 sm:px-12 py-24 border-t border-black/5">
          <h2 className="text-5xl font-extrabold italic text-black mb-16">
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-5">
              <p className="text-4xl font-light text-black">OneTribe</p>
              <p className="text-xl leading-relaxed text-black">
                живая экосистема для тех, кто устал от шума. Децентрализованная
                социальная сеть, где настоящие люди встречаются, строят и растут
                — онлайн и офлайн.
              </p>
              <p className="text-xl leading-relaxed text-black">
                Никаких ботов. Никаких алгоритмов, торгующих твоим вниманием.
                Никакого фейкового вовлечения.
              </p>
              <p className="text-xl leading-relaxed text-black">
                Одно племя, движущееся вместе к чему-то настоящему. Построено на
                управлении сообществом, питается общими ценностями, финансируется
                изнутри.
              </p>
              <p className="text-xl leading-relaxed text-black">
                OneTribe — это не продукт. Это движение. И оно только
                начинается.
              </p>
            </div>
            <div className="flex justify-center">
              <div
                className="w-48 h-48 rounded-2xl flex items-center justify-center"
                style={{ background: GRADIENT_MAIN }}
              >
                <span className="text-3xl font-bold text-white">tribe</span>
              </div>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="px-6 sm:px-12 py-24 border-t border-black/5">
          <h2 className="text-5xl font-extrabold italic text-black mb-16">
            Colors
          </h2>

          {/* Gradient swatches */}
          <div className="flex flex-wrap gap-6 mb-16">
            <div className="w-52 h-28 rounded-2xl" style={{ background: GRADIENT_MAIN }} />
            <div className="w-52 h-28 rounded-2xl" style={{ background: GRADIENT_ELITE }} />
          </div>

          <p className="text-lg text-black/80 max-w-md mb-12">
            The color orange symbolises passion and active but organised movement
            as opposed to red that is chaotic.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-light text-black mb-6">
                Basic Gradient
              </h3>
              <div className="space-y-2">
                {basicColors.map((c) => (
                  <div
                    key={c.hex}
                    className="h-24 rounded-2xl flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: c.hex }}
                  >
                    {c.hex}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-light text-black mb-6">
                Elite Gradient
              </h3>
              <div className="space-y-2">
                {eliteColors.map((c) => (
                  <div
                    key={c.hex}
                    className="h-24 rounded-2xl flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: c.hex }}
                  >
                    {c.hex}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-light text-black mb-6">Black</h3>
              <div className="space-y-2">
                {neutralColors.map((c) => (
                  <div
                    key={c.hex}
                    className="h-24 rounded-2xl flex items-center justify-center text-sm font-medium border border-black/10"
                    style={{
                      backgroundColor: c.hex,
                      color: c.text || "white",
                    }}
                  >
                    {c.hex}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-light text-black mb-6">White</h3>
              <div className="h-24 rounded-2xl flex items-center justify-center text-black text-sm font-medium border border-black/20 bg-white">
                #FFFFFF
              </div>
            </div>
          </div>

          {/* Gradient examples */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div
              className="h-48 rounded-2xl flex flex-col items-center justify-center text-white"
              style={{ background: GRADIENT_MAIN }}
            >
              <span className="text-lg">Orange Gradient</span>
              <span className="text-4xl font-black">diagonal</span>
            </div>
            <div
              className="h-48 rounded-2xl flex flex-col items-center justify-center text-white"
              style={{
                background:
                  "linear-gradient(180deg, #6E22F2 0%, #C752FF 100%)",
              }}
            >
              <span className="text-lg">Elite Gradient</span>
              <span className="text-4xl font-black">vertical</span>
            </div>
            <div
              className="h-48 rounded-2xl flex flex-col items-center justify-center text-white"
              style={{
                background:
                  "radial-gradient(circle, #FD6F6E 0%, #FEBE99 100%)",
              }}
            >
              <span className="text-lg">Coral Gradient</span>
              <span className="text-4xl font-black">radial</span>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="px-6 sm:px-12 py-24 border-t border-black/5">
          <h2 className="text-5xl font-extrabold italic text-black mb-16">
            Typography
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-lg leading-relaxed text-black mb-8">
                Inter Tight is our primary typeface, used for headlines, titles,
                and key textual elements to convey a modern and strong voice.
                Poppins is used for body text and general content.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-black/60">Inter Tight ExtraLight</p>
                <p className="font-extralight text-lg tracking-widest">
                  abcdefghijklmnopqrstuvwxyz 1234567890
                </p>
                <p className="text-sm text-black/60 mt-6">Inter Tight Regular</p>
                <p className="text-lg tracking-widest">abcdefghijklmnopqrstuvwxyz 1234567890</p>
                <p className="text-sm text-black/60 mt-6">Inter Tight Bold</p>
                <p className="font-bold text-lg tracking-widest">
                  abcdefghijklmnopqrstuvwxyz 1234567890
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <p className="text-4xl font-bold text-black">
                Vertrag mit{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: GRADIENT_MAIN }}
                >
                  mir selbst
                </span>
              </p>
              <p className="text-4xl font-bold text-black text-center">
                Das Tribe Mindset
              </p>
              <p className="text-4xl font-bold text-center">
                In Tribe ist{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: GRADIENT_MAIN }}
                >
                  jeder willkommen.
                </span>
              </p>
              <p className="text-4xl font-bold text-center">
                Erfolg ist nicht kompliziert — er entsteht{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: GRADIENT_MAIN }}
                >
                  Schritt für Schritt.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Main Pattern */}
        <section className="px-6 sm:px-12 py-24 border-t border-black/5">
          <h2 className="text-5xl font-extrabold italic text-black mb-16">
            Main Pattern
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <p className="text-lg leading-relaxed text-black">
              Our main pattern is a subtle, dynamic gradient effect that
              reflects the brand&apos;s vibrant and inclusive nature. It can be
              used as a background element, an overlay, or as an accent to add
              visual depth and energy.
            </p>
            <div
              className="aspect-video rounded-2xl relative overflow-hidden"
              style={{ background: GRADIENT_MAIN }}
            >
              <div className="absolute inset-0 bg-white/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white/90">
                  Base Pattern
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Offline Usage */}
        <section className="px-6 sm:px-12 py-24 border-t border-black/5">
          <h2 className="text-5xl font-extrabold italic text-black mb-16">
            Offline Usage
          </h2>
          <p className="text-lg leading-relaxed text-black max-w-xl mb-12">
            The Tribe brand identity extends to offline materials, ensuring a
            consistent and recognizable presence across all physical touchpoints,
            from events to merchandise.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div
              className="aspect-[3/4] rounded-2xl flex flex-col items-center justify-center text-white p-8"
              style={{ background: GRADIENT_MAIN }}
            >
              <span className="text-3xl font-bold">90-Tage-Challenge</span>
              <span className="text-xl mt-2">Persönlichen Ziele</span>
            </div>
            <div
              className="aspect-[3/4] rounded-2xl flex flex-col items-center justify-center text-white p-8"
              style={{ background: GRADIENT_ELITE }}
            >
              <span className="text-3xl font-bold">Tribe Leader</span>
              <span className="text-xl mt-2">90-Tage Challenge</span>
            </div>
          </div>
        </section>

        {/* Imagery */}
        <section className="px-6 sm:px-12 py-24 border-t border-black/5">
          <h2 className="text-5xl font-extrabold italic text-black mb-16">
            Imagery
          </h2>
          <div
            className="rounded-3xl p-16 relative overflow-hidden"
            style={{ background: GRADIENT_MAIN }}
          >
            <div className="absolute inset-0 bg-white/10" />
            <p className="relative text-3xl sm:text-4xl font-bold text-white text-center max-w-3xl mx-auto leading-tight">
              Je motivierter und begeisterter du bist, desto schneller wirst du
              deine ersten Erfolge sehen.
            </p>
            <p className="relative text-xl text-white/80 text-center mt-8">
              Die Fleißigen werden belohnt. Disziplin schlägt Talent, jeden
              einzelnen Tag.
            </p>
            <p className="relative text-sm text-white/60 text-center mt-4">
              Timo Leader, CEO @OneTribe
            </p>
          </div>
        </section>

        {/* Iconography */}
        <section className="px-6 sm:px-12 py-24 border-t border-black/5">
          <h2 className="text-5xl font-extrabold italic text-black mb-16">
            Iconography
          </h2>
          <p className="text-lg leading-relaxed text-black max-w-xl mb-12">
            Icons should be minimal, clean, and consistent with the brand
            gradient when used as accents.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              "Discover",
              "Earn",
              "Engage",
              "Bridge",
              "Community",
              "Support",
              "Impact",
            ].map((label) => (
              <div
                key={label}
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-xs font-medium border-[#48E5FF] bg-white/80 backdrop-blur-sm"
              >
                {label.slice(0, 1)}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
