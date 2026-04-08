"use client";

import { useState } from "react";
import { PackageCheck, Phone, RefreshCw, Truck } from "lucide-react";

import { Section } from "@/components/section";
import { formatCurrency } from "@/lib/cart";

type OrderItem = {
  _id: string;
  trackingId: string;
  quantity: number;
  total: number;
  status: string;
  paymentMethod: string;
  deliveryMethod: string;
  createdAt: string;
  statusHistory?: Array<{
    status: string;
    note?: string;
    changedAt: string;
  }>;
};

type OrdersResponse = {
  success: boolean;
  message?: string;
  orders?: OrderItem[];
};

export default function OrdersPage() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState<OrderItem[]>([]);

  async function loadOrders(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const params = new URLSearchParams({ phone: phone.trim() });
      const response = await fetch(`/api/orders?${params.toString()}`, { method: "GET" });
      const data = (await response.json()) as OrdersResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Unable to fetch orders.");
      }

      setOrders(data.orders ?? []);
      setStatus("success");
      setMessage(data.orders?.length ? "Latest order updates loaded." : "No orders found for this phone number.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to fetch orders.";
      setOrders([]);
      setStatus("error");
      setMessage(errorMessage);
    }
  }

  return (
    <div className="pb-10 pt-10">
      <Section
        eyebrow="Orders"
        title="Track your order status with your phone number"
        description="See live updates from the admin side without needing an order ID."
      >
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <form onSubmit={loadOrders} className="glass-panel soft-shadow rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-3 text-[var(--primary)]">
              <Phone className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Find my orders</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Enter the phone number used during checkout to see current order status like Pending, Confirmed, Packed, Shipped, or Delivered.
            </p>
            <label className="mt-5 block space-y-2 text-sm font-medium">
              Phone number
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="03xx..."
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              <RefreshCw className="h-4 w-4" />
              {status === "loading" ? "Loading..." : "Check Orders"}
            </button>
            {message ? <p className={`mt-4 text-sm ${status === "error" ? "text-red-600" : "text-emerald-700"}`}>{message}</p> : null}
          </form>

          <div className="space-y-4">
            {orders.length ? (
              orders.map((order) => (
                <article key={order._id} className="glass-panel rounded-[1.75rem] p-6 soft-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">{order.trackingId}</p>
                      <h3 className="mt-1 text-xl font-semibold text-[var(--foreground)]">Order Status: {order.status}</h3>
                    </div>
                    <PackageCheck className="h-6 w-6 text-[var(--primary)]" />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Payment</p>
                      <p className="mt-1 text-sm font-semibold">{order.paymentMethod}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Delivery</p>
                      <p className="mt-1 text-sm font-semibold capitalize">{order.deliveryMethod}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Quantity</p>
                      <p className="mt-1 text-sm font-semibold">{order.quantity}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Total</p>
                      <p className="mt-1 text-sm font-semibold">{formatCurrency.format(order.total)}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 border-t border-[var(--border)] pt-4">
                    <p className="text-sm font-semibold text-[var(--foreground)]">Status history</p>
                    {order.statusHistory?.length ? (
                      <div className="space-y-2">
                        {order.statusHistory.map((step) => (
                          <div key={`${step.status}-${step.changedAt}`} className="rounded-[1.1rem] bg-white/80 px-4 py-3 text-sm text-[var(--muted)]">
                            <span className="font-semibold text-[var(--foreground)]">{step.status}</span>
                            {step.note ? <span className="ml-2">{step.note}</span> : null}
                            <div className="mt-1 text-xs">{new Date(step.changedAt).toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--muted)]">No history yet.</p>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <div className="glass-panel rounded-[1.75rem] p-8 text-sm text-[var(--muted)]">
                <Truck className="h-6 w-6 text-[var(--primary)]" />
                <p className="mt-4">Your orders will appear here after you place one and check by phone number.</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
