import type { Metadata } from "next";
import Link from "next/link";
import ZoomableImage from "@/components/ZoomableImage";

export const metadata: Metadata = {
  title: "Product Range — Five Series",
  description: "VERA offers five plantation shutter series: Eco PVC, Classic PVC, Natural Pinewood, Prime Basswood, Deluxe Ashwood. NZ wholesale.",
};

const series = [
  { slug: "pvc", name: "VERA Eco", material: "PVC", tagline: "Practical. Affordable. Reliable.", img: "/images/products/white-shutter.jpg",
    desc: "Entry-level PVC with 5-year warranty. Fully moisture-resistant. For high-volume, rental, and bathroom/kitchen projects.",
    specs: ["5-year warranty", "Full moisture resistance", "63, 76, 89, 114mm louvers", "Colour: White 01", "Rentals, bathrooms, kitchens"] },
  { slug: "pvc-premium", name: "VERA Classic", material: "PVC Premium", tagline: "Refined. Durable. Long-lasting.", img: "/images/products/white-shutter.jpg",
    desc: "Premium PVC with refined surface, 20-year warranty. 8 colour options. Suitable for bathrooms and kitchens.",
    specs: ["20-year warranty", "Refined smooth finish", "63, 76, 89, 114mm louvers", "8 colours", "Family homes, bathrooms, kitchens"] },
  { slug: "pinewood", name: "VERA Natural", material: "Pinewood", tagline: "Natural wood. Entry price.", img: "/images/products/white-shutter.jpg",
    desc: "Most affordable real wood shutter. 8 paint colours, 5-year warranty. For budget projects wanting natural material.",
    specs: ["Natural pinewood", "5-year warranty", "63, 76, 89, 114mm louvers", "8 colours", "Budget residential"] },
  { slug: "basswood", name: "VERA Prime", material: "Basswood", tagline: "The trade standard.", img: "/images/products/basswood-premium.jpg",
    desc: "The industry standard. Fine even grain, smooth paint-ready. 18 colour options including paint and stain finishes.",
    specs: ["Premium basswood", "10-year warranty", "63, 76, 89, 114mm louvers", "18 colours (paint + stain)", "Standard residential"] },
  { slug: "ashwood", name: "VERA Deluxe", material: "Ashwood", tagline: "Grain you can feel.", img: "/images/products/deluxe-ashwood.jpg",
    desc: "Our flagship. Deep pronounced grain that's tactile and visible. 10 stain finishes. For architects and high-end projects.",
    specs: ["Premium ashwood", "10-year warranty", "63, 76, 89, 114mm louvers", "10 stain finishes", "High-end residential, hospitality"] },
];

export default function ProductsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-stone text-xs font-semibold uppercase tracking-widest">Product Range</span>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mt-2">Five Series</h1>
        <p className="mt-3 text-stone text-lg">From entry-level PVC to premium Ashwood.</p>
      </div>

      {/* Card grid */}
      <div className="grid md:grid-cols-5 gap-4 mb-12">
        {series.map((s) => (
          <Link key={s.slug} href={`/products/${s.slug}`} className="group bg-white border border-border hover:border-green/30 transition-colors">
            <ZoomableImage
              src={s.img}
              fullSrc={s.img.replace('.jpg','.png')}
              alt={s.name}
              className="w-full h-28 object-cover"
            />
            <div className="p-4">
              <div className="flex items-start mb-1">
                <span className="text-xs uppercase tracking-[0.15em] text-stone font-medium">{s.name}</span>
              </div>
              <h3 className="text-sm font-bold text-ink">{s.material}</h3>
              <p className="text-stone text-xs mt-2 leading-relaxed">{s.desc}</p>
              <span className="inline-block mt-3 text-xs font-semibold text-green group-hover:underline underline-offset-2">View →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Comparison table */}
      <div className="bg-warm border border-border p-6 md:p-8">
        <h2 className="text-lg font-bold text-ink mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-semibold text-ink w-24"></th>
                {series.map((s) => <th key={s.slug} className="text-left py-3 font-semibold text-green pr-4">{s.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                ["Material", "PVC", "PVC Premium", "Pinewood", "Basswood", "Ashwood"],
                ["Warranty", "5 years", "20 years", "5 years", "10 years", "10 years"],
                ["Louvers", "63mm, 76mm, 89mm, 114mm", "63mm, 76mm, 89mm, 114mm", "63mm, 76mm, 89mm, 114mm", "63mm, 76mm, 89mm, 114mm", "63mm, 76mm, 89mm, 114mm"],
                ["Colours", "White 01", "White 01, Dusk 02,<br/>Soft Glow 03, Old Moon 04,<br/>Oyster 05, Sea Pearl 06,<br/>Picaso 07, Chalk 08", "White 01, Dusk 02,<br/>Soft Glow 03, Old Moon 04,<br/>Oyster 05, Sea Pearl 06,<br/>Picaso 07, Chalk 08", "White 01, Dusk 02,<br/>Soft Glow 03, Old Moon 04,<br/>Oyster 05, Sea Pearl 06,<br/>Picaso 07, Chalk 08,<br/>Golden Oak 61, Fruitwood 62,<br/>Old Mahogany 63,<br/>Coffee Bean 64,<br/>BlackWalnut 65, Light Ash 66,<br/>Limed 67, Natural 68,<br/>Rustic Gray 69,<br/>Provence Blue 70", "Golden Oak 61,<br/>Fruitwood 62,<br/>Old Mahogany 63,<br/>Coffee Bean 64,<br/>BlackWalnut 65,<br/>Light Ash 66, Limed 67,<br/>Natural 68, Rustic Gray 69,<br/>Provence Blue 70"],
                ["Moisture resistance", "Full", "Full", "Low", "Low", "Low"],
              ].map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  {row.map((cell, j) => (
                    <td key={j} className={`py-2.5 pr-4 ${j === 0 ? "font-medium text-ink" : "text-stone"}`} dangerouslySetInnerHTML={j > 0 && row[0] === "Colours" ? { __html: cell } : undefined}>{j > 0 && row[0] === "Colours" ? null : cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
