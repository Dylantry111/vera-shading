import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/terms", label: "Documents" },
  { href: "/login", label: "Client Portal" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/92 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[82px] gap-3">
          <Link href="/" className="shrink-0">
            <div className="relative h-[68px] w-[240px] sm:h-[70px] sm:w-[252px]">
              <Image src="/brand/vera-logo.png" alt="VERA logo" fill className="object-contain object-left" sizes="252px" priority />
            </div>
          </Link>

          <div className="flex-1" />

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-white px-2 py-1 shadow-[0_8px_24px_rgba(20,20,20,0.04)]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="ml-1 rounded-full bg-[#181818] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2a2a2a] transition-all tracking-[0.04em]">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
