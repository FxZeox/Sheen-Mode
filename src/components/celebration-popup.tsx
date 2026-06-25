"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Gift, Sparkles, X } from "lucide-react";

import { formatCurrency } from "@/lib/cart";
import { brand, product } from "@/lib/site-data";

const storageKey = "sheen-mode-celebration-seen";
const fireworkRays = Array.from({ length: 12 }, (_, index) => `${index * 30}deg`);
const burstRays = Array.from({ length: 14 }, (_, index) => {
  const angle = (index / 14) * Math.PI * 2;

  return {
    x1: 60 + Math.cos(angle) * 15,
    y1: 60 + Math.sin(angle) * 15,
    x2: 60 + Math.cos(angle) * 46,
    y2: 60 + Math.sin(angle) * 46,
  };
});
const confettiPieces = [
  { left: "10%", top: "16%", color: "#9b7834", delay: "0s" },
  { left: "20%", top: "8%", color: "#23452f", delay: "0.28s" },
  { left: "31%", top: "18%", color: "#bcc2c7", delay: "0.62s" },
  { left: "68%", top: "11%", color: "#f0c95b", delay: "0.12s" },
  { left: "77%", top: "20%", color: "#d66c55", delay: "0.5s" },
  { left: "88%", top: "10%", color: "#6d7f67", delay: "0.78s" },
  { left: "15%", top: "72%", color: "#d66c55", delay: "0.36s" },
  { left: "82%", top: "76%", color: "#9b7834", delay: "0.2s" },
];

function FireworkBurst({ className, delay = "0s" }: { className: string; delay?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={`celebration-svg-firework pointer-events-none absolute ${className}`}
      style={{ animationDelay: delay } as CSSProperties}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="7" fill="#f0c95b" />
      <circle cx="60" cy="60" r="22" stroke="#f0c95b" strokeDasharray="3 8" strokeWidth="4" />
      {burstRays.map((ray) => (
        <line
          key={`${ray.x1}-${ray.y1}`}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="5"
        />
      ))}
      <circle cx="30" cy="50" r="4" fill="#d66c55" />
      <circle cx="85" cy="34" r="4" fill="#23452f" />
      <circle cx="92" cy="78" r="3.5" fill="#9b7834" />
      <circle cx="43" cy="91" r="3.5" fill="#6d7f67" />
    </svg>
  );
}

export function CelebrationPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadySeen = window.sessionStorage.getItem(storageKey);

    if (!alreadySeen) {
      const timer = window.setTimeout(() => {
        setOpen(true);
        window.sessionStorage.setItem(storageKey, "true");
      }, 450);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[#172417]/45 px-4 py-6 backdrop-blur-sm">
      {confettiPieces.map((piece) => (
        <span
          key={`${piece.left}-${piece.top}`}
          className="celebration-confetti pointer-events-none absolute h-3 w-1.5 rounded-full"
          style={
            {
              left: piece.left,
              top: piece.top,
              backgroundColor: piece.color,
              animationDelay: piece.delay,
            } as CSSProperties
          }
        />
      ))}
      <div className="celebration-firework pointer-events-none absolute left-[13%] top-[18%] hidden h-28 w-28 sm:block">
        {fireworkRays.map((angle) => (
          <span key={angle} style={{ "--angle": angle } as CSSProperties} />
        ))}
      </div>
      <div className="celebration-firework pointer-events-none absolute right-[12%] top-[16%] hidden h-32 w-32 [animation-delay:0.45s] sm:block">
        {fireworkRays.map((angle) => (
          <span key={angle} style={{ "--angle": angle } as CSSProperties} />
        ))}
      </div>
      <div className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#faf6ef] p-6 shadow-[0_30px_90px_rgba(23,36,23,0.28)] sm:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(135deg,rgba(35,69,47,0.16),rgba(155,120,52,0.2),rgba(188,194,199,0.22))]" />
        <FireworkBurst className="-left-7 -top-8 h-32 w-32 text-[#d66c55] opacity-95" />
        <FireworkBurst className="-right-8 top-8 h-36 w-36 text-[#23452f] opacity-95" delay="0.35s" />
        <div className="pointer-events-none absolute left-7 top-5 h-2 w-2 animate-[celebration-float_1.8s_ease-in-out_infinite] rounded-full bg-[var(--accent)]" />
        <div className="pointer-events-none absolute right-16 top-8 h-2.5 w-2.5 animate-[celebration-float_2.2s_ease-in-out_infinite] rounded-full bg-[var(--primary)]" />
        <div className="pointer-events-none absolute right-8 top-24 h-1.5 w-1.5 animate-[celebration-float_1.6s_ease-in-out_infinite] rounded-full bg-[var(--logo-silver)]" />

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close launch offer"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[var(--foreground)] shadow-sm transition hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-lg shadow-[#23452f]/20">
            <Gift className="h-7 w-7" />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">Launch offer</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-[var(--foreground)]">
            {brand.productName} is now {formatCurrency.format(product.price)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            First 10 customer orders can also receive a gift with their purchase.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/product"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3826]"
            >
              <Sparkles className="h-4 w-4" />
              Order Now
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
