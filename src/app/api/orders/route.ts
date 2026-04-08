import { NextResponse } from "next/server";
import { z } from "zod";

import { calculateTotals } from "@/lib/cart";
import { dbConnect } from "@/lib/mongodb";
import { Order } from "@/lib/models/order";
import { ProductSettings } from "@/lib/models/product-settings";
import { defaultProductContent } from "@/lib/product-content";

const trackingQuerySchema = z.object({
  phone: z.string().min(6),
  trackingId: z.string().optional().default(""),
});

function createTrackingId() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `SM-${Date.now().toString().slice(-6)}-${random}`;
}

const orderSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(2),
  address: z.string().min(8),
  landmark: z.string().optional().or(z.literal("")),
  quantity: z.number().int().min(1),
  deliveryMethod: z.enum(["standard", "express", "pickup"]),
  paymentMethod: z.string().min(2),
  notes: z.string().optional().default(""),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const payload = trackingQuerySchema.parse({
      phone: searchParams.get("phone")?.trim(),
      trackingId: searchParams.get("trackingId")?.trim().toUpperCase(),
    });

    await dbConnect();
    const filter: Record<string, string> = { phone: payload.phone };

    if (payload.trackingId) {
      filter.trackingId = payload.trackingId;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(15)
      .select("trackingId customerName phone quantity total status paymentMethod deliveryMethod createdAt updatedAt statusHistory")
      .lean();

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message ?? "Invalid query." : "Unable to fetch orders.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = orderSchema.parse(await request.json());
    await dbConnect();
    const productSettings = await ProductSettings.findOne({}).sort({ updatedAt: -1 }).lean();
    const totals = calculateTotals({
      quantity: payload.quantity,
      deliveryMethod: payload.deliveryMethod,
      unitPrice: productSettings?.price ?? defaultProductContent.price,
    });

    const trackingId = createTrackingId();
    const createdOrder = await Order.create({
      ...payload,
      trackingId,
      subtotal: totals.subtotal,
      couponDiscount: totals.couponDiscount,
      couponCode: "",
      deliveryCharge: totals.deliveryCharge,
      total: totals.total,
      status: "Pending",
      statusHistory: [
        {
          status: "Pending",
          note: "Order received",
          changedAt: new Date(),
        },
      ],
    });

    return NextResponse.json({ success: true, id: createdOrder._id, trackingId: createdOrder.trackingId, totals }, { status: 201 });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message ?? "Invalid input." : "Unable to save order.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}