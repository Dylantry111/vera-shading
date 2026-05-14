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
  const comparisonRows = [
    ["Material", "PVC", "PVC Premium", "Pinewood", "Basswood", "Ashwood"],
    ["Warranty", "5 years", "20 years", "5 years", "10 years", "10 years"],
    ["Louvers", "63mm, 76mm, 89mm, 114mm", "63mm, 76mm, 89mm, 114mm", "63mm, 76mm, 89mm, 114mm", "63mm, 76mm, 89mm, 114mm", "63mm, 76mm, 89mm, 114mm"],
    ["Colours", "White 01", "White 01, Dusk 02, Soft Glow 03, Old Moon 04, Oyster 05, Sea Pearl 06, Picaso 07, Chalk 08", "White 01, Dusk 02, Soft Glow 03, Old Moon 04, Oyster 05, Sea Pearl 06, Picaso 07, Chalk 08", "White 01, Dusk 02, Soft Glow 03, Old Moon 04, Oyster 05, Sea Pearl 06, Picaso 07, Chalk 08, Golden Oak 61, Fruitwood 62, Old Mahogany 63, Coffee Bean 64, BlackWalnut 65, Light Ash 66, Limed 67, Natural 68, Rustic Gray 69, Provence Blue 70", "Golden Oak 61, Fruitwood 62, Old Mahogany 63, Coffee Bean 64, BlackWalnut 65, Light Ash 66, Limed 67, Natural 68, Rustic Gray 69, Provence Blue 70"],
    ["Moisture resistance", "Full", "Full", "Low", "Low", "Low"],
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mb-12 md:mb-14">
        <span className="text-[var(--color-brand-gold)] text-xs font-semibold uppercase tracking-[0.22em]">Product Range</span>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mt-3">Five shutter series for different project requirements</h1>
        <p className="mt-4 text-stone text-lg leading-8">Choose from moisture-resistant PVC, natural wood options, and premium finishes for residential, retail, and high-end projects.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-5 mb-14">
        {series.map((s) => (
          <Link key={s.slug} href={`/products/${s.slug}`} className="group brand-card rounded-[24px] overflow-hidden hover:-translate-y-1 transition-all duration-300">
            <ZoomableImage
              src={s.img}
              fullSrc={s.img.replace('.jpg','.png')}
              alt={s.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-5">
              <div className="flex items-start mb-1">
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-brand-gold)] font-semibold">{s.name}</span>
              </div>
              <h3 className="text-base font-bold text-ink">{s.material}</h3>
              <p className="text-stone text-sm mt-3 leading-7">{s.desc}</p>
              <span className="inline-block mt-4 text-xs font-semibold tracking-[0.12em] text-gray-900 group-hover:text-[var(--color-brand-gold)] transition-colors">View Details →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="brand-card rounded-[30px] p-6 md:p-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-ink">Quick Comparison</h2>
            <p className="mt-2 text-stone leading-7">Compare materials, warranty periods, colours, and moisture resistance across the full VERA range.</p>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] font-semibold">Series Overview</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-sm border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-28 rounded-l-2xl border border-border bg-[#f1ebe2] px-4 py-4 text-left font-semibold text-ink">Spec</th>
                {series.map((s, index) => (
                  <th key={s.slug} className={`border border-border bg-white/70 px-4 py-4 text-left font-semibold text-ink ${index === series.length - 1 ? "rounded-r-2xl" : ""}`}>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-brand-gold)] mb-1">{s.material}</div>
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={`align-top border border-border px-4 py-4 leading-6 ${j === 0 ? "bg-[#f8f3eb] font-semibold text-ink" : "bg-white/65 text-stone"}`}>
                      {cell}
                    </td>
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
