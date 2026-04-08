import { product } from "@/lib/site-data";

export type ProductContent = {
  name: string;
  price: number;
  size: string;
  shortDescription: string;
  longDescription: string;
  stock: string;
};

export const defaultProductContent: ProductContent = {
  name: product.name,
  price: product.price,
  size: product.size,
  shortDescription: product.shortDescription,
  longDescription: product.longDescription,
  stock: product.stock,
};
