import type { Metadata } from "next";
import Link from "next/link";
import ZoomableImage from "@/components/ZoomableImage";

export const metadata: Metadata = {
  title: "Basswood-Prime Plantation Shutters | VERA",
  description: "Premium basswood plantation shutters. Fine even grain, smooth paint-ready surface. 18 finishes including paint and stain. The most popular choice for NZ trade.",
};

export default function BasswoodPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <nav className="text-sm text-stone mb-8">
        <Link href="/products" className="hover:text-green">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-ink font-medium">Basswood-Prime Shutters</span>
      </nav>

      <div className="bg-white border border-border p-8 md:p-10">
        <span className="text-xs uppercase tracking-[0.15em] text-stone font-medium">VERA Prime</span>
        <h1 className="text-3xl md:text-4xl font-bold text-ink mt-1">Basswood-Prime Plantation Shutters</h1>
        <p className="mt-2 text-stone italic">The trade standard. Consistent and versatile.</p>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <ZoomableImage
              src="/images/products/basswood-premium.jpg"
              fullSrc="/images/products/basswood-premium.png"
              alt="VERA Prime Basswood Plantation Shutter"
              className="w-full rounded-sm mb-6 object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <p className="text-stone text-sm leading-relaxed">
              Basswood-Prime is our most popular series, and for good reason. Basswood offers a fine, even grain
              with a consistently smooth surface that takes paint and stain finishes beautifully. Available in
              18 finishes — including 8 paint colours and 10 stain finishes that showcase the wood's natural
              grain — plus four louver sizes, it is the most versatile option in the VERA range.
              Batch-to-batch consistency makes it a dependable choice for trade professionals.
            </p>

            <h2 className="text-lg font-bold text-ink mt-6 mb-3">Specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Series", "VERA Prime"],
                  ["Material", "Basswood (Tilia)"],
                  ["Warranty", "10 years"],
                  ["Louver sizes", "63mm, 76mm, 89mm, 114mm"],
                  ["Colours", "White 01, Dusk 02, Soft Glow 03, Old Moon 04, Oyster 05, Sea Pearl 06, Picaso 07, Chalk 08, Golden Oak 61, Fruitwood 62, Old Mahogany 63, Coffee Bean 64, BlackWalnut 65, Light Ash 66, Limed 67, Natural 68, Rustic Gray 69, Provence Blue 70"],
                  ["Finish", "Smooth, paint-ready surface"],
                  ["Maintenance", "Dust regularly; occasional wipe"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-border">
                    <td className="py-2.5 font-medium text-ink/80 w-1/3">{label}</td>
                    <td className="py-2.5 text-stone">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-warm border border-border p-6">
            <h2 className="text-lg font-bold text-ink mb-4">Suitable For</h2>
            <ul className="space-y-3">
              {["Standard residential projects", "Living rooms, bedrooms, and studies", "Commercial interiors", "Projects wanting stain or paint finishes"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-stone">
                  <svg className="w-4 h-4 text-green mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <h2 className="text-lg font-bold text-ink mb-2">Trade Pricing</h2>
              <p className="text-stone text-sm mb-4">Wholesale rates. Volume discounts available.</p>
              <Link href="/contact" className="inline-block px-6 py-2.5 bg-green text-white font-semibold text-sm rounded hover:bg-green-light transition-all">Request Pricing</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
