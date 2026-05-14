import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Trade Enquiries",
  description: "Contact VERA for trade pricing, product samples, and partnership enquiries. Wholesale plantation shutters NZ.",
};

export default function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[var(--color-brand-gold)] text-xs font-semibold uppercase tracking-[0.22em]">Trade Enquiries</span>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mt-3">Get in touch with the VERA trade team</h1>
        <p className="mt-4 text-stone text-lg leading-8">Request pricing, product specifications, samples, or support for your next project.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-[24px] bg-[#181818] border border-[#2d2d2d] p-6 text-white">
            <h2 className="font-bold mb-4">Trade Partner Benefits</h2>
            <ul className="space-y-3">
              {["Wholesale pricing structure", "Volume discount tiers", "Product samples and specifications", "Dedicated support and local follow-through", "Nationwide delivery visibility"].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/72 leading-6">
                  <svg className="w-4 h-4 text-[var(--color-brand-gold-soft)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="brand-card rounded-[24px] p-6">
            <h2 className="font-bold text-ink mb-2">Product Samples</h2>
            <p className="text-stone text-sm leading-7">Request material samples for showroom use, quoting support, or client-facing presentations.</p>
          </div>
        </div>
        <div className="md:col-span-3 brand-card rounded-[28px] p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
