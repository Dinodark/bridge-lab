import Link from "next/link";

export default function ExploreFooter() {
  return (
    <footer className="py-12 grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <a href="#" className="w-10 h-10 rounded bg-[#0077b7] flex items-center justify-center text-white">in</a>
          <a href="#" className="w-10 h-10 rounded bg-[#5865f2] flex items-center justify-center text-white">D</a>
          <a href="#" className="w-10 h-10 rounded bg-[#1db3f3] flex items-center justify-center text-white">𝕏</a>
          <a href="#" className="w-10 h-10 rounded bg-black flex items-center justify-center text-white">T</a>
        </div>
        <p className="text-[#282b33] font-semibold">© 2025 Bridge</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-[#282b33]">BRIDGE</span>
        <span className="text-[10px] font-bold text-[#959aa8] tracking-widest">CRYPTO CHARITY</span>
      </div>
      <div className="flex flex-col items-end gap-2 text-[#282b33] font-semibold">
        <div className="flex gap-4">
          <Link href="/explore/about" className="hover:text-[#9550ff]">About</Link>
          <span>|</span>
          <Link href="/explore/how-it-works" className="hover:text-[#9550ff]">How it Works</Link>
          <span>|</span>
          <Link href="/explore/faq" className="hover:text-[#9550ff]">FAQ</Link>
        </div>
        <div>
          <Link href="/explore/terms" className="hover:text-[#9550ff]">Terms</Link>
          <span> | </span>
          <Link href="/explore/privacy" className="hover:text-[#9550ff]">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
