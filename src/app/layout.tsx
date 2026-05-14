import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "VERA Shading Solutions | Premium Plantation Shutters Wholesale",
    template: "%s | VERA Shading Solutions",
  },
  description: "VERA is a trusted wholesale supplier of plantation shutters in New Zealand. PVC, Basswood, and Pinewood shutters for trade customers. Reliable quality, consistent supply.",
  keywords: ["plantation shutters wholesale", "shutters supplier NZ", "PVC shutters wholesale", "basswood shutters", "pinewood shutters", "VERA shading", "trade shutters Auckland"],
  openGraph: { type: "website", locale: "en_NZ", siteName: "VERA Shading Solutions", title: "VERA Shading Solutions | Premium Plantation Shutters Wholesale", description: "Trusted wholesale supplier of plantation shutters in New Zealand. PVC, Basswood, and Pinewood." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NZ">
      <body className={`${inter.className} brand-shell`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
