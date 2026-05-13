import type { Metadata } from "next";
import Link from "next/link";
import ZoomableImage from "@/components/ZoomableImage";

export const metadata: Metadata = {
  title: "Ashwood-Deluxe Plantation Shutters | VERA",
  description: "Premium ashwood plantation shutters with deep, tactile grain. The finest option in the VERA range. For high-end NZ projects.",
};

export default function AshwoodPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <nav className="text-sm text-stone mb-8">
        <Link href="/products" className="hover:text-green">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-ink font-medium">Ashwood-Deluxe Shutters</span>
      </nav>

      <div className="bg-white border border-border p-8 md:p-10">
        <div className="flex items-start gap-3 mb-1">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-stone font-medium">VERA Deluxe</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-ink mt-1">Ashwood-Deluxe Plantation Shutters</h1>
        <p className="mt-2 text-stone italic">Distinctive grain. Premium grade.</p>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <ZoomableImage
              src="/images/products/deluxe-ashwood.jpg"
              fullSrc="/images/products/deluxe-ashwood.png"
              alt="VERA Deluxe Ashwood Plantation Shutter"
              className="w-full rounded-sm mb-6 object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <p className="text-stone text-sm leading-relaxed">
              Ashwood-Deluxe is the finest series in the VERA range. Ash is known for its pronounced,
              tactile grain — a visible and physical characteristic that sets it apart from other hardwoods.
              The wood has excellent dimensional stability and takes stain and oil finishes exceptionally well,
              making it the preferred choice for architectural and design-led projects.
            </p>

            <h2 className="text-lg font-bold text-ink mt-6 mb-3">Specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Series", "VERA Deluxe"],
                  ["Material", "Premium ashwood"],
                  ["Warranty", "10 years"],
                  ["Louver sizes", "63mm, 76mm, 89mm, 114mm"],
                  ["Colours", "Golden Oak 61, Fruitwood 62, Old Mahogany 63, Coffee Bean 64, BlackWalnut 65, Light Ash 66, Limed 67, Natural 68, Rustic Gray 69, Provence Blue 70"],
                  ["Finish", "Natural, stain, or oil"],
                  ["Grain", "Deep, pronounced, tactile"],
                  ["Maintenance", "Dust regularly; occasional re-oiling for natural finishes"],
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
              {["High-end residential projects", "Architectural and design-led builds", "Commercial and hospitality interiors", "Heritage and character homes", "Projects requiring premium natural finishes"].map((item) => (
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
