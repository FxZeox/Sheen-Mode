"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Clock3, Package2, ShoppingCart, Truck } from "lucide-react";

import { ProductBottle } from "@/components/product-bottle";
import { Section } from "@/components/section";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/cart";
import { gallery, ingredientBenefits, paymentMethods } from "@/lib/site-data";
import { useProductContent } from "@/lib/use-product-content";

const usageSteps = [
  "Apply oil to the scalp and along the roots.",
  "Massage gently for 5 minutes to support circulation.",
  "Leave overnight or at least 2 hours before washing.",
  "Wash with a mild shampoo and repeat 2 to 3 times weekly.",
];

export default function ProductPage() {
  const { state, setQuantity, addToCart } = useCart();
  const productContent = useProductContent();

  return (
    <div className="pb-10">
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">Product details</p>
            <h1 className="max-w-xl text-5xl font-semibold tracking-tight sm:text-6xl">{productContent.name}</h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">{productContent.longDescription}</p>
            <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <span className="rounded-full bg-white/80 px-4 py-2">{productContent.size}</span>
              <span className="rounded-full bg-white/80 px-4 py-2">{productContent.stock}</span>
              <span className="rounded-full bg-white/80 px-4 py-2">Homemade formula</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [Package2, "Ready to ship"],
                [Truck, "Fast delivery"],
                [BadgeCheck, "Natural positioning"],
              ].map(([Icon, label]) => (
                <div key={label as string} className="glass-panel rounded-[1.5rem] p-5">
                  <Icon className="h-5 w-5 text-[var(--accent)]" />
                  <p className="mt-4 text-sm font-semibold">{label as string}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_26px_80px_rgba(35,69,47,0.08)]"
          >
            <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(35,69,47,0.04),rgba(156,122,55,0.08))] p-4">
                <ProductBottle />
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Price</p>
                  <p className="mt-2 text-4xl font-semibold">{formatCurrency.format(productContent.price)}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Quantity</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(state.quantity - 1)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-lg"
                    >
                      -
                    </button>
                    <span className="min-w-12 text-center text-lg font-semibold">{state.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(state.quantity + 1)}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => addToCart(1)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <Link
                    href="/checkout"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--primary)]/15 bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)]"
                  >
                    Buy Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section eyebrow="Gallery" title="Use premium visuals for the bottle, ingredients, and packaging">
        <div className="grid gap-5 md:grid-cols-3">
          {gallery.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 shadow-[0_24px_70px_rgba(35,69,47,0.08)]">
              <div className={`h-56 bg-gradient-to-br ${item.accent}`} />
              <div className="p-5">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Usage" title="Simple instructions that customers can follow easily">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="glass-panel soft-shadow rounded-[1.75rem] p-6">
            <ol className="space-y-4">
              {usageSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">{index + 1}</span>
                  <p className="pt-1 text-sm leading-7 text-[var(--muted)]">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="glass-panel soft-shadow rounded-[1.75rem] p-6">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <Clock3 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.3em]">Shipping & payment</span>
            </div>
            <div className="mt-5 space-y-4 text-sm text-[var(--muted)]">
              <p>Delivery methods are shown during checkout and the shipping fee updates automatically.</p>
              <p>Recommended payment methods: {paymentMethods.join(", ")}.</p>
              <p>Order and delivery details are shown during checkout with a clear final total.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Trust" title="Explain the difference between this oil and market products">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Homemade formula", "Made in small batches with care and consistency."],
            ["Natural ingredients", "Clear ingredient storytelling helps shoppers feel confident."],
            ["Lightweight feel", "A better daily-use experience than many heavy oils."],
            ["Single product focus", "The site is built around one hero product, so the message stays sharp."],
          ].map(([title, text]) => (
            <div key={title} className="glass-panel rounded-[1.5rem] p-5">
              <p className="text-lg font-semibold">{title}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Ingredient benefits"
        title="Each ingredient and why it is included"
        description="This gives customers confidence by connecting every ingredient to a clear benefit."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {ingredientBenefits.map((item) => (
            <article key={item.ingredient} className="glass-panel rounded-[1.5rem] p-6">
              <p className="text-lg font-semibold">{item.ingredient}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.benefit}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}