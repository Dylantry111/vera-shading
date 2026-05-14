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
  entry: { label: "Entry", accent: "bg-[#b9ab92]" },
  standard: { label: "Standard", accent: "bg-[var(--color-brand-gold)]" },
  premium: { label: "Premium", accent: "bg-[#141414]" },
};

export default function ProductCard({ series, material, desc, features, href, tier }: Props) {
  const cfg = tierConfig[tier];

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[28px] border border-border bg-white/80 shadow-[0_18px_45px_rgba(20,20,20,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,20,20,0.1)]"
    >
      <div className={`h-1.5 ${cfg.accent}`} />

      <div className="p-6 md:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-gold)]">{series}</span>
            <h3 className="mt-1 text-xl font-bold text-ink">{material}</h3>
          </div>
          <span className="rounded-full border border-border bg-[#f7f2ea] px-3 py-1 text-xs font-semibold text-stone">
            {cfg.label}
          </span>
        </div>

        <p className="mb-5 text-sm leading-7 text-stone">{desc}</p>

        <ul className="mb-6 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-stone">
              <svg className="h-4 w-4 shrink-0 text-[var(--color-brand-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-all group-hover:gap-2 group-hover:text-[var(--color-brand-gold)]">
          View Details →
        </span>
      </div>
    </Link>
  );
}
