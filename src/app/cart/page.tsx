"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Truck } from "lucide-react";

import { Section } from "@/components/section";
import { useCart } from "@/components/cart-provider";
import { calculateTotals, formatCurrency } from "@/lib/cart";
import { deliveryOptions } from "@/lib/site-data";
import { useProductContent } from "@/lib/use-product-content";

export default function CartPage() {
  const { state, setQuantity, setDeliveryMethod, clearCart } = useCart();
  const productContent = useProductContent();
  const liveTotals = calculateTotals({
    quantity: state.quantity,
    deliveryMethod: state.deliveryMethod,
    unitPrice: productContent.price,
  });

  return (
    <div className="pb-10 pt-10">
      <Section
        eyebrow="Cart"
        title="Simple cart with delivery charges applied automatically"
        description="Because the store only has one product, the cart can stay focused and easy to use."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="glass-panel soft-shadow rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">{productContent.name}</p>
                <p className="mt-1 text-lg font-semibold">{productContent.size}</p>
              </div>
              <ShoppingBag className="h-5 w-5 text-[var(--primary)]" />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">Quantity</p>
                <p className="text-sm text-[var(--muted)]">Change the quantity before checkout.</p>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-white px-3 py-2">
                <button type="button" onClick={() => setQuantity(state.quantity - 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--background)]">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-10 text-center font-semibold">{state.quantity}</span>
                <button type="button" onClick={() => setQuantity(state.quantity + 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--background)]">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-semibold">Delivery method</p>
              <div className="mt-4 grid gap-3">
                {deliveryOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDeliveryMethod(option.id)}
                    className={`flex items-center justify-between rounded-[1.5rem] border px-4 py-4 text-left transition ${state.deliveryMethod === option.id ? "border-[var(--primary)] bg-white shadow-lg shadow-[#23452f]/10" : "border-[var(--border)] bg-white/70"}`}
                  >
                    <span>
                      <span className="block font-semibold text-[var(--foreground)]">{option.label}</span>
                      <span className="block text-sm text-[var(--muted)]">{option.eta}</span>
                    </span>
                    <span className="text-sm font-semibold">{formatCurrency.format(option.fee)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={clearCart} className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)]">
                Clear cart
              </button>
              <Link
                href="/checkout"
                aria-disabled={state.quantity === 0}
                className={`rounded-full px-5 py-3 text-sm font-semibold text-white ${state.quantity === 0 ? "pointer-events-none bg-[var(--secondary)]/60" : "bg-[var(--primary)]"}`}
              >
                Go to checkout
              </Link>
            </div>
          </div>

          <aside className="glass-panel soft-shadow rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Order summary</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency.format(liveTotals.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>{formatCurrency.format(liveTotals.deliveryCharge)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency.format(liveTotals.total)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-white/80 p-5">
              <div className="flex items-center gap-3 text-[var(--primary)]">
                <Truck className="h-5 w-5" />
                <span className="font-semibold">Delivery note</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">The delivery fee is applied automatically based on the selected method. Use this area for real city-based shipping rules later.</p>
            </div>
            {state.quantity === 0 ? <p className="mt-4 text-sm text-[var(--muted)]">Your cart is empty. Add quantity to continue checkout.</p> : null}
          </aside>
        </div>
      </Section>
    </div>
  );
}