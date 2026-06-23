import { deliveryOptions, product } from "@/lib/site-data";

export type DeliveryMethodId = (typeof deliveryOptions)[number]["id"];

export const formatCurrency = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: product.currency,
  maximumFractionDigits: 0,
});

export function getDeliveryCharge(paymentMethod?: string) {
  if (!paymentMethod || paymentMethod === "Cash on Delivery") {
    return 400;
  }

  return 350;
}

export function calculateTotals(params: {
  quantity: number;
  deliveryMethod: DeliveryMethodId;
  paymentMethod?: string;
  unitPrice?: number;
}) {
  const quantity = Math.max(0, params.quantity);
  const subtotal = Math.max(0, params.unitPrice ?? product.price) * quantity;
  const couponDiscount = 0;
  const deliveryCharge = quantity > 0 ? getDeliveryCharge(params.paymentMethod) : 0;
  const total = Math.max(0, subtotal - couponDiscount + deliveryCharge);

  return {
    quantity,
    subtotal,
    couponDiscount,
    deliveryCharge,
    total,
  };
}
