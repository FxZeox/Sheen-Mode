import { Schema, model, models } from "mongoose";

const productSettingsSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    stock: { type: String, required: true },
    imageUrls: {
      frontBottle: { type: String, default: "" },
      ingredients: { type: String, default: "" },
      lifestyle: { type: String, default: "" },
      before: { type: String, default: "" },
      middle: { type: String, default: "" },
      after: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  },
);

export const ProductSettings = models.ProductSettings ?? model("ProductSettings", productSettingsSchema);
