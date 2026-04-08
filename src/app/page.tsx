"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Star, Truck, Wand2 } from "lucide-react";

import { ProductBottle } from "@/components/product-bottle";
import { Section } from "@/components/section";
import { useCart } from "@/components/cart-provider";
import { benefits, brand, ingredientBenefits, ingredients, product, testimonials } from "@/lib/site-data";
import { formatCurrency } from "@/lib/cart";
import { useProductContent } from "@/lib/use-product-content";

export default function HomePage() {
  const { addToCart } = useCart();
  const productContent = useProductContent();

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/75 px-4 py-2 text-sm text-[var(--muted)] shadow-[0_10px_30px_rgba(35,69,47,0.06)]">
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
              Homemade, natural, premium hair care
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">{brand.name}</p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                {brand.productName}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">{brand.tagline}. {productContent.shortDescription}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#23452f]/20 transition hover:-translate-y-0.5 hover:bg-[#1d3826]"
              >
                Buy Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#benefits"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/15 bg-white px-6 py-3 text-sm font-medium text-[var(--primary)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#23452f]/10"
              >
                Learn More
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["100% Natural", "No synthetic additives"],
                ["Homemade Formula", "Made with care"],
                ["For All Hair Types", "Men and women"],
              ].map(([title, description]) => (
                <div key={title} className="glass-panel soft-shadow rounded-3xl p-4">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative rounded-[2rem] border border-white/70 bg-[rgba(255,255,255,0.55)] p-5 shadow-[0_30px_90px_rgba(35,69,47,0.1)] backdrop-blur sm:p-6"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(156,122,55,0.14),transparent_50%)]" />
            <div className="relative flex flex-col items-center gap-6">
              <ProductBottle />
              <div className="grid w-full gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/80 p-4 text-center shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Bottle Size</p>
                  <p className="mt-1 text-xl font-semibold">{productContent.size}</p>
                </div>
                <div className="rounded-3xl bg-white/80 p-4 text-center shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">Price</p>
                  <p className="mt-1 text-xl font-semibold">{formatCurrency.format(productContent.price)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => addToCart(1)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d3826]"
              >
                <Sparkles className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Section
        eyebrow="Why customers buy"
        title="A single product, positioned with clarity"
        description="The entire experience is built to explain the oil, build trust, and make ordering easy."
        className="scroll-mt-28"
      >
        <div id="benefits" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.article
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="glass-panel soft-shadow rounded-[1.75rem] p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(35,69,47,0.12),rgba(156,122,55,0.15))] text-[var(--primary)]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{benefit.description}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Ingredients"
        title="Simple herbal ingredients, presented clearly"
        description="The natural positioning becomes stronger when every ingredient is listed with its purpose."
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_24px_80px_rgba(35,69,47,0.08)]">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <Wand2 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.3em]">Formula</span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-[var(--foreground)]">{productContent.shortDescription}</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--muted)]">{productContent.longDescription}</p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ingredients.map((ingredient) => (
                <span key={ingredient} className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--foreground)]">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {ingredientBenefits.map((item) => (
              <div key={item.ingredient} className="glass-panel rounded-[1.5rem] p-5">
                <p className="text-lg font-semibold">{item.ingredient}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Product showcase"
        title="Designed to order fast and feel premium"
        description="This block keeps the main purchase decision front and center with a clear CTA."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_70px_rgba(35,69,47,0.08)]">
            <ProductBottle />
          </div>
          <div className="glass-panel soft-shadow rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">{productContent.stock}</p>
            <h3 className="mt-3 text-3xl font-semibold">{productContent.name}</h3>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <span className="rounded-full bg-white px-4 py-2">Size {productContent.size}</span>
              <span className="rounded-full bg-white px-4 py-2">SKU {product.sku}</span>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">{productContent.longDescription}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Price</p>
                <p className="text-3xl font-semibold">{formatCurrency.format(productContent.price)}</p>
              </div>
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d3826]"
              >
                Order Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Before & after"
        title="Reserve space for transformation content"
        description="These cards are ready for customer results, progress photos, and visual proof later."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Before", "Dry scalp and weak-looking strands", "from-[#d4c1a1] to-[#ac8e63]"],
            ["During", "A healthier routine over a few weeks", "from-[#8a9c80] to-[#567054]"],
            ["After", "Softer shine and improved hair feel", "from-[#f0dfb6] to-[#c3a05a]"],
          ].map(([title, caption, accent]) => (
            <div key={title} className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 shadow-[0_20px_60px_rgba(35,69,47,0.08)]">
              <div className={`h-56 bg-gradient-to-br ${accent}`} />
              <div className="p-5">
                <p className="text-lg font-semibold">{title}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Testimonials"
        title="Social proof that sounds trustworthy"
        description="Add real customer feedback here as soon as you collect it."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="glass-panel soft-shadow rounded-[1.75rem] p-6">
              <Star className="h-5 w-5 text-[var(--accent)]" />
              <p className="mt-4 text-base leading-8 text-[var(--foreground)]">“{testimonial.quote}”</p>
              <footer className="mt-6 text-sm font-semibold text-[var(--muted)]">{testimonial.name}</footer>
            </blockquote>
          ))}
        </div>
      </Section>
    </div>
  );
}