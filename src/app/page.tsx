import Link from "next/link";

const PRODUCTS = [
  { series: "VERA Eco", material: "PVC", img: "/images/products/white-shutter.jpg", href: "/products/pvc", note: "Practical for wet areas and high-volume projects." },
  { series: "VERA Classic", material: "PVC Premium", img: "/images/products/white-shutter.jpg", href: "/products/pvc-premium", note: "Longer warranty and refined finish." },
  { series: "VERA Natural", material: "Pinewood", img: "/images/products/white-shutter.jpg", href: "/products/pinewood", note: "Natural wood at an accessible price point." },
  { series: "VERA Prime", material: "Basswood", img: "/images/products/basswood-premium.jpg", href: "/products/basswood", note: "Trade-standard choice across mainstream jobs." },
  { series: "VERA Deluxe", material: "Ashwood", img: "/images/products/deluxe-ashwood.jpg", href: "/products/ashwood", note: "Premium grain and presentation-led finish." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-6 md:pt-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-8 items-stretch">
            <div className="brand-card rounded-[30px] p-8 md:p-12 overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.035]" style={{
                backgroundImage: "linear-gradient(90deg, rgba(20,20,20,0.35) 1px, transparent 1px), linear-gradient(rgba(20,20,20,0.35) 1px, transparent 1px)",
                backgroundSize: "28px 28px, 28px 28px",
              }} />
              <div className="relative">
                <div className="inline-flex items-center gap-3 rounded-full border border-border bg-[#fafafa] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#555]">
                  <span className="h-2 w-2 rounded-full bg-[#333]" />
                  Wholesale Supply — New Zealand
                </div>
                <h1 className="mt-7 text-4xl md:text-6xl font-bold text-gray-900 leading-[1.02] text-balance">
                  Premium plantation shutters
                  <span className="block mt-3 text-[#3f3f3f]">for New Zealand trade</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-stone">
                  VERA supplies builders, designers, retailers, and developers with plantation shutters
                  across five product series, backed by factory-direct pricing, local support, and nationwide delivery.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="rounded-full bg-[#181818] px-8 py-3.5 text-center text-sm font-semibold tracking-[0.06em] text-white hover:bg-[#2a2a2a] transition-all">
                    Open a Trade Account
                  </Link>
                  <Link href="/products" className="rounded-full border border-border bg-white px-8 py-3.5 text-center text-sm font-semibold tracking-[0.06em] text-gray-800 hover:border-[#cfcfcf] hover:text-gray-900 transition-all">
                    Explore Product Series
                  </Link>
                </div>

                <div className="mt-10 grid sm:grid-cols-3 gap-4">
                  {[
                    ["5", "core product series"],
                    ["NZ", "trade-focused positioning"],
                    ["B2B", "lead capture + client login"],
                  ].map(([num, label]) => (
                    <div key={label} className="rounded-2xl border border-border bg-white px-5 py-4">
                      <div className="text-2xl font-bold text-gray-900">{num}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-stone">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="brand-card rounded-[30px] overflow-hidden">
              <div className="p-5 md:p-6 border-b border-border flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-stone">Featured</p>
                  <h2 className="mt-2 text-gray-900 text-xl font-semibold">Plantation shutters for residential and trade projects</h2>
                </div>
                <span className="rounded-full border border-border bg-[#fafafa] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-stone">NZ Wide</span>
              </div>
              <div className="p-5 md:p-6">
                <img
                  src="/images/hero-home.jpg"
                  alt="VERA Plantation Shutters — product showcase"
                  className="w-full rounded-[22px] object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: "Factory-direct pricing", value: "Commercial pricing structured for builders, retailers, and project supply." },
                    { title: "Five product series", value: "PVC, premium PVC, Pinewood, Basswood, and Ashwood options." },
                    { title: "Local trade support", value: "Product advice, samples, quoting help, and client portal access." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border bg-[#fcfcfc] p-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-stone">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 md:mb-14">
            <span className="text-[var(--color-brand-gold)] text-xs font-semibold uppercase tracking-[0.22em]">Product Range</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">Five series for different project needs</h2>
            <p className="mt-4 text-stone text-lg leading-8">From entry-level PVC to premium Ashwood, VERA offers options for bathrooms, family homes, retail supply, and high-end residential projects.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-5">
            {PRODUCTS.map((p) => (
              <Link key={p.series} href={p.href} className="group brand-card rounded-[24px] overflow-hidden hover:-translate-y-1 transition-all duration-300">
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.series} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] font-semibold">{p.series}</div>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{p.material}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone">{p.note}</p>
                  <span className="inline-block mt-4 text-xs font-semibold tracking-[0.12em] text-gray-900 group-hover:text-[var(--color-brand-gold)] transition-colors">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="brand-card rounded-[30px] overflow-hidden">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border">
                <span className="text-stone text-xs font-semibold uppercase tracking-[0.22em]">Why VERA</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">A dependable wholesale partner</h2>
                <p className="mt-5 text-stone leading-8">
                  We focus on consistent product quality, reliable lead times, and support that helps trade customers quote, order, and deliver with confidence.
                </p>
              </div>
              <div className="p-8 md:p-12 grid md:grid-cols-3 gap-5">
                {[
                  { title: "Consistent Quality", desc: "Clearer product positioning builds trust before the first enquiry." },
                  { title: "Reliable Supply", desc: "Wholesale messaging stays focused on delivery confidence and predictability." },
                  { title: "Trade Pricing", desc: "The visual system supports a more premium B2B pricing conversation." },
                ].map((item, idx) => (
                  <div key={item.title} className="rounded-[24px] border border-border bg-white p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-[#f7f7f7] text-[#333] font-bold">
                      0{idx + 1}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] uppercase tracking-[0.24em] text-stone mb-8">Trusted by trade professionals across New Zealand</p>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
            {["Builders", "Interior Designers", "Retail Shops", "Property Developers", "Architects"].map((item) => (
              <span key={item} className="text-gray-700 text-sm tracking-[0.16em] uppercase font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-border bg-[#fafafa] px-8 py-12 md:px-12 md:py-16 text-center shadow-[0_16px_40px_rgba(20,20,20,0.04)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">
              Next step
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-bold text-gray-900">Ready to partner with VERA?</h2>
            <p className="mt-5 max-w-2xl mx-auto text-stone text-base md:text-lg leading-8">
              Open a trade account, request samples, or log in to the client portal to access pricing, specifications, and order support.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="rounded-full bg-[#181818] px-9 py-4 text-sm font-semibold tracking-[0.06em] text-white hover:bg-[#2a2a2a] transition-all">
                Become a Trade Partner
              </Link>
              <Link href="/login" className="rounded-full border border-border bg-white px-9 py-4 text-sm font-semibold tracking-[0.06em] text-gray-900 hover:bg-[#f3f3f3] transition-all">
                Client Portal Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
