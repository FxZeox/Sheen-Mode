"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

type ProductZoomImageProps = {
  src?: string;
  alt: string;
  placeholderTitle: string;
  placeholderDescription: string;
  fallback?: React.ReactNode;
  aspectClassName?: string;
  className?: string;
  imageClassName?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ProductZoomImage({
  src,
  alt,
  placeholderTitle,
  placeholderDescription,
  fallback,
  aspectClassName = "aspect-[4/5]",
  className,
  imageClassName,
}: ProductZoomImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (src) {
            setOpen(true);
          }
        }}
        className={joinClasses("group relative block w-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-[0_18px_50px_rgba(35,69,47,0.08)] transition-transform duration-300 hover:-translate-y-0.5 cursor-zoom-in", aspectClassName, className)}
        aria-label={src ? `Zoom ${alt}` : placeholderTitle}
      >
        {src ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(156,122,55,0.08),transparent_55%)]" />
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={joinClasses("object-contain transition duration-300 ease-out group-hover:scale-[1.14]", imageClassName)}
            />
          </>
        ) : fallback ? (
          fallback
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(180deg,rgba(35,69,47,0.04),rgba(156,122,55,0.08))] px-6 text-center">
            <div className="max-w-xs">
              <p className="text-lg font-semibold text-[var(--foreground)]">{placeholderTitle}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{placeholderDescription}</p>
            </div>
          </div>
        )}
      </button>

      {open && src ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} zoom view`}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
              aria-label="Close zoom view"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/5] max-h-[85vh] w-full bg-[#f6f1e8]">
              <Image src={src} alt={alt} fill sizes="100vw" className="object-contain p-4 sm:p-6" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
