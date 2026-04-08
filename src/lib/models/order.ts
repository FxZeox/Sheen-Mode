import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    trackingId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    address: { type: String, required: true },
    city: { type: String, required: true },
    landmark: { type: String, required: false },
    quantity: { type: Number, required: true, default: 1 },
    deliveryMethod: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    couponCode: { type: String, required: false, default: "" },
    subtotal: { type: Number, required: true },
    couponDiscount: { type: Number, required: true, default: 0 },
    deliveryCharge: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true, default: "Pending" },
    notes: { type: String, required: false, default: "" },
    statusHistory: [
      {
        status: { type: String, required: true },
        note: { type: String, required: false, default: "" },
        changedAt: { type: Date, required: true, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Order = models.Order ?? model("Order", orderSchema);