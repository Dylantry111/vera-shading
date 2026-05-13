import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Trade Enquiries",
  description: "Contact VERA for trade pricing, product samples, and partnership enquiries. Wholesale plantation shutters NZ.",
};

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-green text-xs font-semibold uppercase tracking-widest">Trade Enquiries</span>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mt-2">Get in Touch</h1>
        <p className="mt-3 text-stone text-lg">Fill in the form and our team will get back to you with pricing and product samples.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-border p-6">
            <h2 className="font-bold text-ink mb-4">Trade Partner Benefits</h2>
            <ul className="space-y-3">
              {["Wholesale pricing structure", "Volume discount tiers", "Product samples and specs", "Dedicated trade support", "Nationwide delivery"].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-stone">
                  <svg className="w-4 h-4 text-green mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-warm border border-border p-6">
            <h2 className="font-bold text-ink mb-2">Product Samples</h2>
            <p className="text-stone text-sm">Request material samples for your showroom or client presentations.</p>
          </div>
        </div>
        <div className="md:col-span-3 bg-white border border-border p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
