import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "VERA Shading Solutions terms and conditions. Downloadable PDF documents for trade partners.",
};

const documents = [
  {
    title: "Terms & Conditions of Trade",
    description: "Standard terms and conditions governing all trade transactions with VERA Shading Solutions.",
    filename: "VERA_Terms_and_Conditions_of_Trade.pdf",
  },
  {
    title: "Product Warranty Information",
    description: "Warranty coverage details for VERA Eco, Classic, Natural, Prime, and Deluxe series.",
    filename: "VERA_Warranty_Information.pdf",
  },
  {
    title: "Product Specification Guide",
    description: "Complete specifications, louver sizes, colour options, and material details for all five series.",
    filename: "VERA_Product_Specification_Guide.pdf",
  },
  {
    title: "Order Form",
    description: "Standard wholesale order form for trade partners.",
    filename: "VERA_Order_Form.pdf",
  },
];

export default function TermsPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-green text-xs font-semibold uppercase tracking-widest">Documents</span>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mt-2">Terms &amp; Documents</h1>
        <p className="mt-3 text-stone text-lg">Downloadable PDF documents for VERA trade partners.</p>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.filename} className="bg-white border border-border p-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-ink">{doc.title}</h2>
              <p className="text-stone text-sm mt-1">{doc.description}</p>
            </div>
            <a
              href={`/files/${doc.filename}`}
              download
              className="shrink-0 px-4 py-2 bg-green text-white text-sm font-semibold rounded hover:bg-green-light transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        ))}
      </div>

      <p className="text-stone text-xs text-center mt-8">
        These documents are for reference only. The latest version is always available upon request.
        Please contact our trade team for the most current terms and pricing.
      </p>
    </section>
  );
}
