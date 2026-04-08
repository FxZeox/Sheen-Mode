import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, description, children, className = "" }: SectionProps) {
  return (
    <section className={`py-12 sm:py-16 lg:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] sm:mb-3 sm:text-xs sm:tracking-[0.3em]">{eyebrow}</p> : null}
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">{title}</h2>
          {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:mt-4 sm:text-base">{description}</p> : null}
        </div>
        <div className="mt-7 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}