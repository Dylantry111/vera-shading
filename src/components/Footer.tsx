import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-green flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg">VERA</span>
                <span className="text-gray-500 text-[9px] uppercase tracking-[0.3em] block -mt-0.5">Shading Solutions</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">New Zealand&apos;s wholesale supplier of premium plantation shutters. Five series covering every project tier.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-[0.2em] text-gray-500">Products</h3>
            <ul className="space-y-3">
              {[
                { href: "/products/pvc", label: "VERA Eco — PVC" },
                { href: "/products/pvc-premium", label: "VERA Classic — PVC Premium" },
                { href: "/products/pinewood", label: "VERA Natural — Pinewood" },
                { href: "/products/basswood", label: "VERA Prime — Basswood" },
                { href: "/products/ashwood", label: "VERA Deluxe — Ashwood" },
              ].map((l) => <li key={l.href}><Link href={l.href} className="text-gray-400 hover:text-green-light text-sm transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4 text-xs uppercase tracking-[0.2em] text-gray-500">Trade</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Wholesale pricing</li>
              <li>Nationwide delivery</li>
              <li>Product samples</li>
              <li>Bulk orders welcome</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} VERA Shading Solutions.</p>
          <p className="text-gray-500 text-xs text-center sm:text-right">Premium plantation shutters — New Zealand wholesale supply.</p>
        </div>
      </div>
    </footer>
  );
}
