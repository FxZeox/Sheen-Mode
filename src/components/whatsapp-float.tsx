"use client";

import Link from "next/link";

import { WhatsAppLogo } from "@/components/social-icons";
import { socialLinks } from "@/lib/site-data";

export function WhatsAppFloat() {
  if (!socialLinks.whatsapp) {
    return null;
  }

  return (
    <Link
      href={socialLinks.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-[#1f9d57] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(31,157,87,0.35)] transition hover:-translate-y-0.5 hover:bg-[#18864a] sm:bottom-6 sm:right-6"
    >
      <WhatsAppLogo className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Link>
  );
}
