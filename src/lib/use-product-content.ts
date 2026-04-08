"use client";

import { useEffect, useState } from "react";

import { defaultProductContent, type ProductContent } from "@/lib/product-content";

type ProductApiResponse = {
  success: boolean;
  product?: Partial<ProductContent>;
};

export function useProductContent() {
  const [productContent, setProductContent] = useState<ProductContent>(defaultProductContent);

  useEffect(() => {
    let mounted = true;

    async function loadProduct() {
      try {
        const response = await fetch("/api/product", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ProductApiResponse;

        if (!data.success || !data.product || !mounted) {
          return;
        }

        setProductContent({
          ...defaultProductContent,
          ...data.product,
          price: Number(data.product.price ?? defaultProductContent.price),
        });
      } catch {
        // Keep static fallback data when API is unavailable.
      }
    }

    void loadProduct();

    return () => {
      mounted = false;
    };
  }, []);

  return productContent;
}
