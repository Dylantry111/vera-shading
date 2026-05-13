import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 gap-2">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-green text-white font-bold text-base w-9 h-9 flex items-center justify-center">
              V
            </div>
            <div>
              <span className="font-bold text-gray-900 tracking-tight">VERA</span>
              <span className="text-gray-400 text-[9px] uppercase tracking-[0.25em] block -mt-0.5">Shading Solutions</span>
            </div>
          </Link>

          <div className="flex-1" />

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-green transition-colors">
              Home
            </Link>
            <Link href="/products" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green transition-colors">
              Products
            </Link>
            <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green transition-colors">
              About
            </Link>
            <Link href="/terms" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green transition-colors">
              Terms
            </Link>
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green transition-colors">
              Portal
            </Link>
            <Link href="/contact" className="ml-3 px-5 py-2 bg-green text-white text-sm font-semibold hover:bg-green-dark transition-colors tracking-wide">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
