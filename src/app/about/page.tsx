import { Section } from "@/components/section";
import { brand } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <div className="pb-10 pt-10">
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel soft-shadow rounded-[2rem] p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">About us</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">The story behind {brand.name}</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{brand.story}</p>
        </div>
      </section>

      <Section
        eyebrow="Why it exists"
        title="A brand built for trust, clarity, and natural care"
        description="The about page should explain the promise in a direct, human way."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Natural care", "The product positioning stays focused on herbal care and simplicity."],
            ["Affordable quality", "Premium presentation does not have to mean expensive or complicated."],
            ["One hero product", "Everything in the site is designed to make one oil feel like a complete brand."],
          ].map(([title, text]) => (
            <article key={title} className="glass-panel rounded-[1.5rem] p-6">
              <p className="text-lg font-semibold">{title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{text}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}