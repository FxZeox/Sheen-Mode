"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, MapPin, Phone, Send } from "lucide-react";

import { Section } from "@/components/section";
import { useCart } from "@/components/cart-provider";
import { calculateTotals, formatCurrency } from "@/lib/cart";
import { deliveryOptions, paymentMethods } from "@/lib/site-data";
import { useProductContent } from "@/lib/use-product-content";

type TrackedOrder = {
  _id: string;
  trackingId: string;
  quantity: number;
  total: number;
  status: string;
  deliveryMethod: string;
  paymentMethod: string;
  createdAt: string;
  statusHistory?: Array<{
    status: string;
    note?: string;
    changedAt: string;
  }>;
};

type TrackingResponse = {
  success: boolean;
  message?: string;
  orders?: TrackedOrder[];
};

type CheckoutForm = {
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  landmark: string;
  paymentMethod: string;
  notes: string;
};

const initialForm: CheckoutForm = {
  customerName: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  landmark: "",
  paymentMethod: paymentMethods[0],
  notes: "",
};

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const productContent = useProductContent();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [trackPhone, setTrackPhone] = useState("");
  const [trackStatus, setTrackStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [trackMessage, setTrackMessage] = useState("");
  const [trackedOrders, setTrackedOrders] = useState<TrackedOrder[]>([]);
  const orderTotals = calculateTotals({
    quantity: state.quantity,
    deliveryMethod: state.deliveryMethod,
    unitPrice: productContent.price,
  });

  async function fetchTrackingOrders(phone: string, orderTrackingId = "") {
    setTrackStatus("loading");
    setTrackMessage("");

    try {
      const params = new URLSearchParams({ phone: phone.trim() });

      if (orderTrackingId.trim()) {
        params.set("trackingId", orderTrackingId.trim().toUpperCase());
      }

      const response = await fetch(`/api/orders?${params.toString()}`, { method: "GET" });
      const data = (await response.json()) as TrackingResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Unable to track orders.");
      }

      const orders = data.orders ?? [];
      setTrackedOrders(orders);
      setTrackStatus("success");
      setTrackMessage(orders.length ? "Order records loaded." : "No orders found with these details.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to track orders.";
      setTrackStatus("error");
      setTrackMessage(message);
      setTrackedOrders([]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: state.quantity,
          deliveryMethod: state.deliveryMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Order request failed");
      }

      const result = (await response.json()) as { trackingId?: string };

      setTrackPhone(form.phone);
      await fetchTrackingOrders(form.phone);
      setForm(initialForm);
      clearCart();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pb-10 pt-10">
      <Section
        eyebrow="Checkout"
        title="Keep checkout short and easy"
        description="The form collects only what is needed to complete an order."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <form onSubmit={handleSubmit} className="glass-panel soft-shadow rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                Full name
                <input
                  required
                  value={form.customerName}
                  onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))}
                  className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="space-y-2 text-sm font-medium">
                Phone
                <input
                  required
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="space-y-2 text-sm font-medium">
                City
                <input
                  required
                  value={form.city}
                  onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                  className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2 text-sm font-medium">
              Address
              <textarea
                required
                rows={4}
                value={form.address}
                onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />
            </label>

            <label className="mt-4 block space-y-2 text-sm font-medium">
              Landmark
              <input
                value={form.landmark}
                onChange={(event) => setForm((current) => ({ ...current, landmark: event.target.value }))}
                className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />
            </label>

            <div className="mt-4">
              <p className="text-sm font-medium">Payment method</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => (
                  <label key={method} className={`cursor-pointer rounded-[1.4rem] border px-4 py-4 ${form.paymentMethod === method ? "border-[var(--primary)] bg-white shadow-lg shadow-[#23452f]/10" : "border-[var(--border)] bg-white/70"}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={form.paymentMethod === method}
                      onChange={(event) => setForm((current) => ({ ...current, paymentMethod: event.target.value }))}
                      className="sr-only"
                    />
                    <span className="font-semibold">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="mt-4 block space-y-2 text-sm font-medium">
              Order notes
              <textarea
                rows={3}
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)]"
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading" || state.quantity === 0}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {status === "loading" ? "Placing order..." : "Place Order"}
              </button>
              {state.quantity === 0 ? <p className="text-sm font-medium text-[var(--muted)]">Cart quantity is 0. Add item quantity before placing order.</p> : null}
              {status === "success" ? <p className="text-sm font-medium text-emerald-700">Order submitted successfully.</p> : null}
              {status === "error" ? <p className="text-sm font-medium text-red-600">Could not submit the order.</p> : null}
            </div>
          </form>

          <aside className="glass-panel soft-shadow rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">Order summary</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>{productContent.name} x {orderTotals.quantity}</span>
                <span>{formatCurrency.format(orderTotals.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>{formatCurrency.format(orderTotals.deliveryCharge)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency.format(orderTotals.total)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-[1.5rem] bg-white/80 p-5 text-sm text-[var(--muted)]">
              <p className="flex items-center gap-3 text-[var(--foreground)]"><MapPin className="h-4 w-4 text-[var(--primary)]" /> Delivery method is applied automatically.</p>
              <p className="flex items-center gap-3 text-[var(--foreground)]"><Phone className="h-4 w-4 text-[var(--primary)]" /> If you pay online, place your order and send the payment on my WhatsApp number.</p>
              <p className="flex items-center gap-3 text-[var(--foreground)]"><CreditCard className="h-4 w-4 text-[var(--primary)]" /> Supported payment methods are listed in this checkout.</p>
              <p className="flex items-center gap-3 text-[var(--foreground)]"><CheckCircle2 className="h-4 w-4 text-[var(--primary)]" /> Admin can review and update orders from the dashboard.</p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Track your order</p>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Use the Orders page in the navbar to track by phone number and view confirmed, packed, shipped, and delivered updates.
              </p>
              <button
                type="button"
                onClick={() => window.location.assign("/orders")}
                className="mt-4 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Open Orders Page
              </button>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}