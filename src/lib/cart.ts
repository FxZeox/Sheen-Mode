import { deliveryOptions, product } from "@/lib/site-data";

export type DeliveryMethodId = (typeof deliveryOptions)[number]["id"];

export const formatCurrency = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: product.currency,
  maximumFractionDigits: 0,
});

export function getDeliveryOption(deliveryMethod: DeliveryMethodId) {
  return deliveryOptions.find((option) => option.id === deliveryMethod) ?? deliveryOptions[0];
}

export function calculateTotals(params: {
  quantity: number;
  deliveryMethod: DeliveryMethodId;
  unitPrice?: number;
}) {
  const quantity = Math.max(0, params.quantity);
  const subtotal = Math.max(0, params.unitPrice ?? product.price) * quantity;
  const deliveryOption = getDeliveryOption(params.deliveryMethod);
  const couponDiscount = 0;
  const deliveryCharge = quantity > 0 ? deliveryOption.fee : 0;
  const total = Math.max(0, subtotal - couponDiscount + deliveryCharge);

  return {
    quantity,
    subtotal,
    couponDiscount,
    deliveryCharge,
    total,
  };
}