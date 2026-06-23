import { product } from "@/lib/site-data";

export type ProductImageUrls = {
  frontBottle: string;
  ingredients: string;
  lifestyle: string;
  before: string;
  middle: string;
  after: string;
};

export type ProductContent = {
  name: string;
  price: number;
  size: string;
  shortDescription: string;
  longDescription: string;
  stock: string;
  imageUrls: ProductImageUrls;
};

export const emptyProductImageUrls: ProductImageUrls = {
  frontBottle: "",
  ingredients: "",
  lifestyle: "",
  before: "",
  middle: "",
  after: "",
};

export const defaultProductContent: ProductContent = {
  name: product.name,
  price: product.price,
  size: product.size,
  shortDescription: product.shortDescription,
  longDescription: product.longDescription,
  stock: product.stock,
  imageUrls: emptyProductImageUrls,
};

export function normalizeProductContent(content?: Partial<ProductContent> | null): ProductContent {
  return {
    ...defaultProductContent,
    ...content,
    imageUrls: {
      ...emptyProductImageUrls,
      ...(content?.imageUrls ?? {}),
    },
  };
}
