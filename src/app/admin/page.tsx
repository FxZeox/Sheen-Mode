"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, LogOut, PencilLine } from "lucide-react";

import { Section } from "@/components/section";
import { formatCurrency } from "@/lib/cart";
import { defaultProductContent } from "@/lib/product-content";

type ProductForm = {
  name: string;
  price: string;
  size: string;
  shortDescription: string;
  description: string;
  stock: string;
};

const initialProductForm: ProductForm = {
  name: defaultProductContent.name,
  price: String(defaultProductContent.price),
  size: defaultProductContent.size,
  shortDescription: defaultProductContent.shortDescription,
  description: defaultProductContent.longDescription,
  stock: defaultProductContent.stock,
};

type AdminOrder = {
  _id: string;
  trackingId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  quantity: number;
  total: number;
  status: string;
  paymentMethod: string;
  deliveryMethod: string;
  createdAt: string;
  updatedAt: string;
};

const statusOptions = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"] as const;

export default function AdminPage() {
  const [form, setForm] = useState<ProductForm>(initialProductForm);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [ordersState, setOrdersState] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", { method: "GET" });
        const data = (await response.json()) as { authenticated: boolean };

        if (response.ok && data.authenticated) {
          setAuthenticated(true);
          await loadDashboardData();
        }
      } finally {
        setCheckingSession(false);
      }
    }

    void checkSession();
  }, []);

  async function loadDashboardData() {
    setOrdersState("loading");

    try {
      const [productResponse, ordersResponse] = await Promise.all([
        fetch("/api/admin/product", { method: "GET" }),
        fetch("/api/admin/orders", { method: "GET" }),
      ]);

      if (!productResponse.ok || !ordersResponse.ok) {
        throw new Error("Unable to load dashboard data.");
      }

      const productResult = (await productResponse.json()) as {
        success: boolean;
        product: {
          name: string;
          price: number;
          size: string;
          shortDescription: string;
          longDescription: string;
          stock: string;
        };
      };
      const ordersResult = (await ordersResponse.json()) as { success: boolean; orders: AdminOrder[] };

      if (productResult.success) {
        setForm({
          name: productResult.product.name,
          price: String(productResult.product.price),
          size: productResult.product.size,
          shortDescription: productResult.product.shortDescription,
          description: productResult.product.longDescription,
          stock: productResult.product.stock,
        });
      }

      if (ordersResult.success) {
        setOrders(ordersResult.orders);
      }

      setOrdersState("done");
    } catch {
      setOrdersState("error");
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to login.");
      }

      setAuthenticated(true);
      await loadDashboardData();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to login.";
      setLoginError(message);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setOrders([]);
    setLoginForm({ username: "", password: "" });
  }

  async function handleProductSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    try {
      const response = await fetch("/api/admin/product", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          size: form.size,
          shortDescription: form.shortDescription,
          longDescription: form.description,
          stock: form.stock,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to save.");
      }

      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  async function updateOrderStatus(orderId: string, nextStatus: string) {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: nextStatus }),
      });

      if (!response.ok) {
        throw new Error("Status update failed");
      }

      setOrders((current) =>
        current.map((order) => (order._id === orderId ? { ...order, status: nextStatus, updatedAt: new Date().toISOString() } : order)),
      );
    } catch {
      setOrdersState("error");
    }
  }

  if (checkingSession) {
    return (
      <div className="pb-10 pt-10">
        <Section eyebrow="Admin dashboard" title="Loading admin panel" description="Checking secure session.">
          <div className="glass-panel rounded-[1.5rem] p-6 text-sm text-[var(--muted)]">Please wait...</div>
        </Section>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="pb-10 pt-10">
        <Section
          eyebrow="Admin login"
          title="Sign in to access the admin panel"
          description="Use your secure admin credentials to manage product and order records."
        >
          <form onSubmit={handleLogin} className="mx-auto w-full max-w-xl glass-panel soft-shadow rounded-[2rem] p-6 sm:p-8">
            <div className="space-y-4">
              <label className="block space-y-2 text-sm font-medium">
                Username
                <input
                  required
                  value={loginForm.username}
                  onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                  className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none"
                />
              </label>
              <label className="block space-y-2 text-sm font-medium">
                Password
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                    className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 pr-12 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button type="submit" className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white">
                Login
              </button>
              {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
            </div>
          </form>
        </Section>
      </div>
    );
  }

  return (
    <div className="pb-10 pt-10">
      <Section
        eyebrow="Admin dashboard"
        title="Keep the admin panel simple because there is only one product"
        description="This dashboard is connected for product edits, image uploads, and order management."
      >
        <div className="mb-6 flex flex-wrap justify-end gap-3">
          <a
            href="#order-details"
            className="inline-flex items-center rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
          >
            Orders
          </a>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="space-y-6">
            <form onSubmit={handleProductSubmit} className="glass-panel soft-shadow rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center gap-3 text-[var(--primary)]">
                <PencilLine className="h-5 w-5" />
                <h2 className="text-2xl font-semibold">Edit product</h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium">
                  Name
                  <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none" />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  Price
                  <input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none" />
                </label>
              </div>
              <label className="mt-4 block space-y-2 text-sm font-medium">
                Size
                <input value={form.size} onChange={(event) => setForm((current) => ({ ...current, size: event.target.value }))} className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none" />
              </label>
              <label className="mt-4 block space-y-2 text-sm font-medium">
                Short description
                <textarea value={form.shortDescription} onChange={(event) => setForm((current) => ({ ...current, shortDescription: event.target.value }))} rows={3} className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 outline-none" />
              </label>
              <label className="mt-4 block space-y-2 text-sm font-medium">
                Description
                <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} rows={5} className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 outline-none" />
              </label>
              <div className="mt-6 flex items-center gap-4">
                <button type="submit" className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white">
                  {status === "saving" ? "Saving..." : "Save changes"}
                </button>
                {status === "done" ? <p className="text-sm text-emerald-700">Saved. Customer pages now use these updated product values.</p> : null}
                {status === "error" ? <p className="text-sm text-red-600">Unable to save changes.</p> : null}
              </div>
            </form>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Price", formatCurrency.format(Number(form.price) || 0)],
                ["Stock", form.stock],
                ["Delivery", "Configured in checkout"],
              ].map(([label, value]) => (
                <div key={label} className="glass-panel rounded-[1.5rem] p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">{label}</p>
                  <p className="mt-3 text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <div id="order-details" className="glass-panel soft-shadow rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Order details</h2>
                <button
                  type="button"
                  onClick={() => void loadDashboardData()}
                  className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold"
                >
                  Refresh
                </button>
              </div>

              {ordersState === "loading" ? <p className="mt-4 text-sm text-[var(--muted)]">Loading orders...</p> : null}
              {ordersState === "error" ? <p className="mt-4 text-sm text-red-600">Could not load order records.</p> : null}

              <div className="mt-5 space-y-4">
                {orders.map((order) => (
                  <article key={order._id} className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">{order.trackingId}</p>
                        <p className="mt-1 font-semibold text-[var(--foreground)]">{order.customerName}</p>
                        <p className="text-sm text-[var(--muted)]">{order.phone} | {order.city}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatCurrency.format(order.total)}</p>
                    </div>

                    <p className="mt-3 text-sm text-[var(--muted)]">{order.address}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">Qty {order.quantity} | {order.deliveryMethod} | {order.paymentMethod}</p>
                    <p className="mt-2 text-xs text-[var(--muted)]">Placed {new Date(order.createdAt).toLocaleString()}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <label className="text-sm font-medium">Status</label>
                      <select
                        value={order.status}
                        onChange={(event) => {
                          void updateOrderStatus(order._id, event.target.value);
                        }}
                        className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm"
                      >
                        {statusOptions.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </article>
                ))}
              </div>
            </div>
        </div>
      </Section>
    </div>
  );
}