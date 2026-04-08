import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    approved: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

export const Review = models.Review ?? model("Review", reviewSchema);