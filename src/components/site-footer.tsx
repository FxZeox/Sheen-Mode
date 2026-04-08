import Link from "next/link";

import { brand, socialLinks } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/60 bg-[#f4efe5]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">{brand.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">{brand.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">Contact</p>
          <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <p>Email: {socialLinks.email}</p>
            <p>WhatsApp: {socialLinks.whatsapp ? "Available" : "Add number in .env.local"}</p>
            <p>Instagram: {socialLinks.instagram ? "Connected" : "Add link in .env.local"}</p>
          </div>
        </div>
        <div className="lg:text-right">
          <p className="text-sm font-semibold text-[var(--foreground)]">Quick Links</p>
          <div className="mt-4 flex flex-wrap gap-3 lg:justify-end">
            <Link className="rounded-full bg-white px-4 py-2 text-sm text-[var(--primary)]" href="/product">
              Product
            </Link>
            <Link className="rounded-full bg-white px-4 py-2 text-sm text-[var(--primary)]" href="/checkout">
              Checkout
            </Link>
            <Link className="rounded-full bg-white px-4 py-2 text-sm text-[var(--primary)]" href="/admin">
              Admin
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/70 py-4 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}