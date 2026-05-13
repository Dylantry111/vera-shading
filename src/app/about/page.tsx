import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About VERA — Factory-Direct Plantation Shutters",
  description: "VERA Shading Solutions — NZ-based plantation shutter supplier. Factory-direct pricing, local support, and quality you can rely on.",
};

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-green text-xs font-semibold uppercase tracking-widest">About</span>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mt-2">VERA Shading Solutions</h1>
        <p className="mt-2 text-stone font-medium">Supplying New Zealand Trade</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-border p-8">
          <h2 className="text-xl font-bold text-ink">Who We Are</h2>
          <p className="mt-4 text-stone leading-relaxed">
            VERA Shading Solutions supplies New Zealand trade with quality plantation shutters
            at factory-direct pricing. We maintain direct relationships with our production
            partners and have boots on the ground locally — which means we can offer a level
            of service and support that import-only suppliers simply can't match.
          </p>
          <p className="mt-4 text-stone leading-relaxed">
            Every batch is inspected before it leaves the factory. Material consistency, colour
            accuracy, finish quality — we check it against our standard, not someone else's.
            If it doesn't pass, it doesn't ship.
          </p>
          <p className="mt-4 text-stone leading-relaxed">
            Our name — VERA — reflects that approach. True quality. True value. True partnership.
          </p>
        </div>

        <div className="bg-green-dark p-8 text-white">
          <h2 className="text-xl font-bold">Why VERA Is Different</h2>
          <div className="mt-6 space-y-5">
            {[
              { title: "Factory-Direct Pricing", desc: "We source directly from production, which means competitive pricing without layers of markup. You get real wholesale rates because there's nothing in between." },
              { title: "Local Base, Better Service", desc: "We're based in New Zealand — not an overseas call centre. Samples, spec questions, order updates: you deal with someone local who knows your project and follows through." },
              { title: "After-Sales Support", desc: "Issues after delivery? We handle them directly — not forwarded to a supplier who may or may not respond. One point of contact, accountable from order to install." },
              { title: "Quality You Can Rely On", desc: "Every batch is inspected against our standard before shipping. Consistency between orders is non-negotiable — we don't let variation slip through." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-warm/60 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-warm/60 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border p-8">
          <h2 className="text-xl font-bold text-ink">Our Commitment</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-green mb-1">True Quality</p>
              <p className="text-stone text-sm leading-relaxed">Every shutter meets our inspection standard before it reaches your project. We stand behind what we ship.</p>
            </div>
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-green mb-1">True Value</p>
              <p className="text-stone text-sm leading-relaxed">Factory-direct pricing means better margins for trade partners. No layers of markup between production and your quote.</p>
            </div>
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-green mb-1">True Partnership</p>
              <p className="text-stone text-sm leading-relaxed">NZ-based support, responsive communication, and a supply chain you can rely on order after order.</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-stone text-sm mb-6">Want to see how factory-direct works for your business?</p>
          <Link href="/contact" className="inline-block px-8 py-3.5 bg-green text-white font-semibold hover:bg-green-light transition-all">Contact Our Trade Team</Link>
        </div>
      </div>
    </section>
  );
}
