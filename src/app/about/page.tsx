import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About VERA — Factory-Direct Plantation Shutters",
  description: "VERA Shading Solutions — NZ-based plantation shutter supplier. Factory-direct pricing, local support, and quality you can rely on.",
};

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[var(--color-brand-gold)] text-xs font-semibold uppercase tracking-[0.22em]">About</span>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mt-3">Factory-direct plantation shutters for New Zealand trade</h1>
        <p className="mt-4 text-stone text-lg leading-8">VERA supplies quality plantation shutters with local support, consistent standards, and pricing designed for trade customers.</p>
      </div>

      <div className="space-y-6">
        <div className="brand-card rounded-[28px] p-8 md:p-10">
          <h2 className="text-xl font-bold text-ink">Who VERA Is</h2>
          <p className="mt-4 text-stone leading-8">
            VERA Shading Solutions supplies New Zealand trade with quality plantation shutters at
            factory-direct pricing. We work with builders, designers, retailers, and developers who need
            dependable supply, clear product options, and responsive support.
          </p>
          <p className="mt-4 text-stone leading-8">
            Our goal is to make specification, quoting, and ordering more straightforward by offering a
            focused product range, consistent quality standards, and service that continues after delivery.
          </p>
          <p className="mt-4 text-stone leading-8">
            Whether the project is cost-driven, residential, or premium, VERA provides a shutter series
            suited to the application.
          </p>
        </div>

        <div className="rounded-[28px] bg-[#181818] p-8 md:p-10 text-white border border-[#2d2d2d]">
          <h2 className="text-xl font-bold">Why Trade Customers Choose VERA</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {[
              { title: "Factory-Direct Pricing", desc: "Direct sourcing helps keep pricing competitive and margins clearer for trade customers." },
              { title: "Local Support", desc: "Samples, product questions, and order updates are handled with local follow-through." },
              { title: "Consistent Quality", desc: "Every product range is positioned to give customers confidence in finish, performance, and fit for purpose." },
              { title: "Range for Different Projects", desc: "From PVC to premium Ashwood, the range covers volume work through to high-end residential applications." },
            ].map((item) => (
              <div key={item.title} className="rounded-[22px] border border-white/10 bg-white/5 p-6">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-white/68 text-sm leading-7 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="brand-card rounded-[24px] p-6 text-center">
            <p className="text-2xl font-bold text-[var(--color-brand-gold)] mb-1">True Quality</p>
            <p className="text-stone text-sm leading-7">Products are selected and supplied to give trade customers confidence in finish, consistency, and long-term performance.</p>
          </div>
          <div className="brand-card rounded-[24px] p-6 text-center">
            <p className="text-2xl font-bold text-[var(--color-brand-gold)] mb-1">True Value</p>
            <p className="text-stone text-sm leading-7">Factory-direct pricing gives trade partners a stronger pricing structure across a range of project types.</p>
          </div>
          <div className="brand-card rounded-[24px] p-6 text-center">
            <p className="text-2xl font-bold text-[var(--color-brand-gold)] mb-1">True Partnership</p>
            <p className="text-stone text-sm leading-7">Local communication, responsive support, and ongoing service help make VERA a practical long-term supply partner.</p>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-stone text-sm mb-6">Talk with our team about pricing, samples, and project requirements.</p>
          <Link href="/contact" className="inline-block rounded-full px-8 py-3.5 bg-[#181818] text-white font-semibold hover:bg-[#2a2a2a] transition-all">Contact Our Trade Team</Link>
        </div>
      </div>
    </section>
  );
}
