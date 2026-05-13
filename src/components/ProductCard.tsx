import Link from "next/link";

interface Props {
  series: string;
  material: string;
  desc: string;
  features: string[];
  href: string;
  tier: "entry" | "standard" | "premium";
}

const tierConfig = {
  entry: { label: "Entry", border: "border-gray-15 hover:border-gray-30" },
  standard: { label: "Standard", border: "border-gray-15 hover:border-gray-50" },
  premium: { label: "Premium", border: "border-black hover:border-black" },
};

export default function ProductCard({ series, material, desc, features, href, tier }: Props) {
  const cfg = tierConfig[tier];

  return (
    <Link
      href={href}
      className={`group block bg-white rounded border ${cfg.border} transition-colors`}
    >
      <div className={`h-1.5 ${tier === "premium" ? "bg-black" : tier === "standard" ? "bg-gray-70" : "bg-gray-30"}`} />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-gray-70 font-medium">{series}</span>
            <h3 className="text-xl font-bold text-black mt-0.5">{material}</h3>
          </div>
          <span className={`px-2.5 py-1 text-xs font-semibold border ${
            tier === "premium" ? "border-black text-black" : "border-gray-30 text-gray-70"
          }`}>
            {cfg.label}
          </span>
        </div>

        <p className="text-gray-70 text-sm leading-relaxed mb-5">{desc}</p>

        <ul className="space-y-2 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-gray-70">
              <svg className="w-4 h-4 text-black shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-black group-hover:gap-2 transition-all">
          View Details →
        </span>
      </div>
    </Link>
  );
}
