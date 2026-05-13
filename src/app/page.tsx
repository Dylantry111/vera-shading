import Link from "next/link";

const PRODUCTS = [
  { series: "VERA Eco", material: "PVC", img: "/images/products/white-shutter.jpg", href: "/products/pvc" },
  { series: "VERA Classic", material: "PVC Premium", img: "/images/products/white-shutter.jpg", href: "/products/pvc-premium" },
  { series: "VERA Natural", material: "Pinewood", img: "/images/products/white-shutter.jpg", href: "/products/pinewood" },
  { series: "VERA Prime", material: "Basswood", img: "/images/products/basswood-premium.jpg", href: "/products/basswood" },
  { series: "VERA Deluxe", material: "Ashwood", img: "/images/products/deluxe-ashwood.jpg", href: "/products/ashwood" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gray-50 relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-green" />
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-[0.2em]">Wholesale Supply — NZ Wide</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                Plantation Shutters
                <span className="block mt-2 text-green">for New Zealand Trade</span>
              </h1>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-lg">
                VERA supplies builders, designers, and retail shops with consistent-quality
                plantation shutters. Five product grades, competitive trade pricing,
                reliable stock, nationwide delivery.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="px-8 py-3.5 bg-green text-white font-semibold text-sm hover:bg-green-dark transition-all text-center tracking-wide">
                  Open a Trade Account
                </Link>
                <Link href="/products" className="px-8 py-3.5 border border-gray-300 text-gray-700 font-semibold text-sm hover:border-green hover:text-green transition-all text-center tracking-wide">
                  View Product Range
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gray-200/50 rounded-sm" />
                <img
                  src="/images/hero-home.jpg"
                  alt="VERA Plantation Shutters — product showcase"
                  className="w-full rounded-sm relative object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product series grid */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-green text-xs font-semibold uppercase tracking-[0.2em]">Product Range</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">Five Series</h2>
            <p className="mt-3 text-gray-600">From entry-level PVC to premium Ashwood — covering every project and budget.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-5">
            {PRODUCTS.map((p) => (
              <Link key={p.series} href={p.href} className="group bg-gray-50 border border-border hover:border-green/40 transition-all">
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.series} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <span className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">{p.series}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">{p.material}</h3>
                  <span className="inline-block mt-2 text-xs font-semibold text-green group-hover:opacity-80 transition-opacity">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Values */}
      <section className="bg-gray-900 border-y border-gray-800 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-green-light text-xs font-semibold uppercase tracking-[0.2em]">Why VERA</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Built for Trade</h2>
            <p className="mt-3 text-gray-400/80">Every detail designed to make working with us straightforward.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Consistent Quality", desc: "Every batch matches the same standard. No surprises between orders — your reputation depends on it.", icon: "✓" },
              { title: "Reliable Supply", desc: "Stock-ready products with short lead times. NZ-wide delivery so your projects stay on schedule.", icon: "↗" },
              { title: "Trade Pricing", desc: "Wholesale rates designed for healthy margins. The more you order, the better the value.", icon: "$" },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 backdrop-blur-sm p-8 border border-gray-700 hover:border-green/40 transition-colors">
                <div className="w-10 h-10 border border-green/40 flex items-center justify-center mb-5 text-green-light text-sm font-bold">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">Trusted by trade professionals across NZ</p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
            {["Builders", "Interior Designers", "Retail Shops", "Property Developers", "Architects"].map((item) => (
              <span key={item} className="text-gray-400 text-sm tracking-wide uppercase font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Partner?</h2>
          <p className="mt-4 text-gray-400/70 max-w-xl mx-auto">Open a trade account — wholesale pricing, product samples, dedicated support.</p>
          <div className="mt-10">
            <Link href="/contact" className="inline-block px-10 py-4 bg-green text-white font-semibold hover:bg-green-dark transition-all text-lg tracking-wide">
              Become a Trade Partner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
