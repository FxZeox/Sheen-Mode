import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    description: { type: String, required: true },
    stockStatus: { type: String, required: true, default: "Limited stock" },
    imageUrls: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

export const Product = models.Product ?? model("Product", productSchema);