import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";

import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { brand } from "@/lib/site-data";

import "./globals.css";

function resolveSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  return raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
}

const bodyFont = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | ${brand.productName}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  metadataBase: new URL(resolveSiteUrl()),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <CartProvider>
          <div className="relative isolate min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(188,194,199,0.22),transparent_30%),radial-gradient(circle_at_top_left,rgba(156,122,55,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(35,69,47,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.55),transparent_38%)]" />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <WhatsAppFloat />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}