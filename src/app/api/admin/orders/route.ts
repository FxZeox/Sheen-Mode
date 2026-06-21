import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { dbConnect } from "@/lib/mongodb";
import { Order } from "@/lib/models/order";
import { dedupeStatusHistory } from "@/lib/order-status";

const updateStatusSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"]),
  note: z.string().optional().default(""),
});

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return Boolean(verifyAdminSessionToken(token));
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  await dbConnect();
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .select("trackingId customerName phone city address quantity total status paymentMethod deliveryMethod createdAt updatedAt statusHistory")
    .lean();

  const normalizedOrders = orders.map((order) => ({
    ...order,
    statusHistory: dedupeStatusHistory(order.statusHistory),
  }));

  return NextResponse.json({ success: true, orders: normalizedOrders }, { status: 200 });
}

export async function PATCH(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const payload = updateStatusSchema.parse(await request.json());

    await dbConnect();
    const existing = await Order.findById(payload.orderId);

    if (!existing) {
      return NextResponse.json({ success: false, message: "Order not found." }, { status: 404 });
    }

    const currentStatus = existing.status;
    const normalizedHistory = dedupeStatusHistory(existing.statusHistory ?? []);
    const hasStatusAlready = normalizedHistory.some((entry) => entry.status === payload.status);

    existing.statusHistory = normalizedHistory;
    existing.status = payload.status;

    if (currentStatus !== payload.status && !hasStatusAlready) {
      existing.statusHistory.push({
        status: payload.status,
        note: payload.note,
        changedAt: new Date(),
      });
    }

    await existing.save();

    const updatedOrder = existing.toObject();

    return NextResponse.json(
      {
        success: true,
        order: {
          ...updatedOrder,
          statusHistory: dedupeStatusHistory(updatedOrder.statusHistory),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message ?? "Invalid input." : "Unable to update order.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
