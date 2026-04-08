"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart-provider";
import { brand, navigationItems } from "@/lib/site-data";

const logoSrc = process.env.NEXT_PUBLIC_BRAND_LOGO || "/brand/ss-logo.png";

export function SiteHeader() {
  const pathname = usePathname();
  const { totals } = useCart();
  const [currentLogoSrc, setCurrentLogoSrc] = useState(logoSrc);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[linear-gradient(180deg,rgba(250,246,239,0.92),rgba(246,241,232,0.88))] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-0.5 sm:gap-1">
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden bg-transparent sm:h-[4.5rem] sm:w-[4.5rem]">
            <img
              src={currentLogoSrc}
              alt="Sheen Mode logo"
              className="h-14 w-14 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
              loading="eager"
              onError={() => {
                if (currentLogoSrc !== "/brand/ss-logo.png") {
                  setCurrentLogoSrc("/brand/ss-logo.png");
                }
              }}
            />
          </span>
          <span className="leading-tight">
            <span className="block text-xs uppercase tracking-[0.28em] text-[var(--accent)] sm:text-sm sm:tracking-[0.3em]">Sheen Mode</span>
            <span className="block text-xs text-[var(--logo-charcoal)] sm:text-sm">{brand.productName}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/60 p-1 shadow-[0_10px_40px_rgba(35,69,47,0.06)] md:flex">
          {navigationItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${active ? "bg-[var(--primary)] text-white shadow-lg shadow-[#23452f]/20" : "text-[var(--muted)] hover:bg-white hover:text-[var(--foreground)]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            aria-label="Open cart"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-3 py-2 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#1d3826] sm:gap-2 sm:px-4 sm:text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">{totals.quantity}</span>
            <span className="hidden text-xs opacity-70 sm:inline">{totals.total.toLocaleString()}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/25 md:hidden"
          />
          <aside className="fixed right-0 top-0 z-50 h-dvh w-[82%] max-w-xs border-l border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-2xl md:hidden">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Menu</p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${active ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--foreground)]"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      ) : null}
    </header>
  );
}