"use client";

import { useState } from "react";
import { Search, Package, Check, Truck, Clock } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  items: { product_name: string; quantity: number; price: number }[];
  total: number;
  payment_status: string;
  order_status: string;
  created_at: string;
}

const STATUS_STEPS = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: Check },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Package },
];

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?id=${orderId.trim()}`);
      const data = await res.json();

      if (data.order) {
        setOrder(data.order);
      } else {
        setError("Order not found. Check your order ID and try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = STATUS_STEPS.findIndex((s) => s.key === order?.order_status) ?? 0;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-3">
            Order Status
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Track Your Order
          </h1>
          <p className="mt-3 text-white/60 max-w-lg">
            Enter your order ID to see the current status.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-10">
            <div className="flex gap-3">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g. ORD-MQU704JZ)"
                className="flex-1 px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-800 text-foreground"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                {loading ? "Searching..." : "Track"}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-xl border border-red-200 dark:border-red-800 mb-6">
              {error}
            </div>
          )}

          {order && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-foreground">{order.id}</h2>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    order.payment_status === "paid"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                  }`}>
                    {order.payment_status === "paid" ? "Paid" : "Payment Pending"}
                  </span>
                </div>
                <p className="text-sm text-foreground/60">
                  Placed on {new Date(order.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-border">
                <h3 className="font-bold text-foreground mb-6">Order Status</h3>
                <div className="space-y-4">
                  {STATUS_STEPS.map((step, index) => {
                    const isActive = index <= currentStep;
                    const isCurrent = index === currentStep;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isActive
                            ? "bg-primary text-white"
                            : "bg-muted text-foreground/30"
                        } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${isActive ? "text-foreground" : "text-foreground/40"}`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-primary font-medium mt-0.5">
                              {order.order_status === "pending" && "Waiting for confirmation"}
                              {order.order_status === "confirmed" && "Your order is being prepared"}
                              {order.order_status === "shipped" && "On the way to you"}
                              {order.order_status === "delivered" && "Successfully delivered"}
                            </p>
                          )}
                        </div>
                        {isActive && !isCurrent && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-border">
                <h3 className="font-bold text-foreground mb-4">Items Ordered</h3>
                <div className="space-y-3">
                  {order.items?.map((item: { product_name: string; quantity: number; price: number }, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-foreground/70">
                        {item.product_name} — {item.quantity} yd{item.quantity > 1 ? "s" : ""}
                      </span>
                      <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">₦{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
