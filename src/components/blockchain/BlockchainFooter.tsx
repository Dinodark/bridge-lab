import Link from "next/link";

export default function BlockchainFooter() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
          <div>
            <div className="text-xl font-bold text-white tracking-widest mb-2">BRIDGE</div>
            <p className="text-white/60 text-sm mb-4">Where Good Deeds Become Digital Legacy</p>
            <p className="text-white/40 text-sm">© 2023 Bridge. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/contact" className="hover:text-white">Email</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Follow Us</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Medium</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
