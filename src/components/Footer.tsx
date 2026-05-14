import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-[#fcfcfc] text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="mb-5">
              <div className="relative h-14 w-[168px]">
                <Image src="/brand/vera-logo.png" alt="VERA logo" fill className="object-contain object-left" sizes="168px" />
              </div>
            </div>
            <p className="text-stone text-sm leading-relaxed max-w-md">
              Premium plantation shutters for New Zealand trade — built for builders,
              designers, retailers, and project-led wholesale supply.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone">Product Range</h3>
            <ul className="space-y-3">
              {[
                { href: "/products/pvc", label: "VERA Eco — PVC" },
                { href: "/products/pvc-premium", label: "VERA Classic — PVC Premium" },
                { href: "/products/pinewood", label: "VERA Natural — Pinewood" },
                { href: "/products/basswood", label: "VERA Prime — Basswood" },
                { href: "/products/ashwood", label: "VERA Deluxe — Ashwood" },
              ].map((l) => <li key={l.href}><Link href={l.href} className="text-stone hover:text-ink text-sm transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone">Trade Access</h3>
            <ul className="space-y-3 text-stone text-sm">
              <li>Wholesale pricing</li>
              <li>Product samples</li>
              <li>Client portal login</li>
              <li>Specification downloads</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-7 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} VERA Shading Solutions.</p>
          <p className="text-center sm:text-right">Wholesale plantation shutters · NZ trade supply</p>
        </div>
      </div>
    </footer>
  );
}
