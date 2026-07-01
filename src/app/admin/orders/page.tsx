"use client";

import { useState, useEffect } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";
import type { Order } from "@/types";

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const updatePaymentStatus = async (id: string, paymentStatus: string) => {
    setUpdatingId(id);
    try {
      const updates: Record<string, string> = { id, payment_status: paymentStatus };
      if (paymentStatus === "paid") {
        updates.order_status = "confirmed";
      }
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? {
                ...o,
                payment_status: paymentStatus as Order["payment_status"],
                order_status: paymentStatus === "paid" ? "confirmed" : o.order_status,
              }
            : o
        )
      );
    } catch {
      alert("Error updating payment");
    } finally {
      setUpdatingId(null);
    }
  };

  const updateOrderStatus = async (id: string, status: string, order: Order) => {
    setUpdatingId(id);
    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, order_status: status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, order_status: status as Order["order_status"] } : o))
      );

      if (status === "shipped" && order.customer_phone) {
        const phone = order.customer_phone.replace(/^0/, "234");
        const items = order.items?.map((i) => `${i.product_name} (${i.quantity} yd${i.quantity > 1 ? "s" : ""})`).join(", ");
        const msg = encodeURIComponent(
          `Hi ${order.customer_name}!\n\nYour order ${order.id} has been shipped!\n\nItems: ${items}\nTotal: ₦${order.total.toLocaleString()}\n\nTrack your order: https://lace-store.vercel.app/track\n\nThank you for shopping with Aba Premium Net Fabrics!`
        );
        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
      }
    } catch {
      alert("Error updating order");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Orders</h1>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-foreground/70">Order ID</th>
                <th className="text-left p-3 font-medium text-foreground/70">Customer</th>
                <th className="text-left p-3 font-medium text-foreground/70">Items</th>
                <th className="text-left p-3 font-medium text-foreground/70">Total</th>
                <th className="text-left p-3 font-medium text-foreground/70">Payment</th>
                <th className="text-left p-3 font-medium text-foreground/70">Status</th>
                <th className="text-right p-3 font-medium text-foreground/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-foreground/50">
                    Loading...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-foreground/50">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="p-3 font-mono text-xs">{order.id}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-xs text-foreground/50">{order.customer_phone}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      {order.items?.map((item: { product_name: string; quantity: number; price: number }, i: number) => (
                        <p key={i} className="text-xs">
                          {item.product_name} — {item.quantity} yd{item.quantity > 1 ? "s" : ""}
                        </p>
                      ))}
                    </td>
                    <td className="p-3 font-medium">₦{order.total.toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.payment_status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {order.payment_status}
                        </span>
                        {order.payment_status === "pending" && order.payment_method === "bank_transfer" && (
                          <button
                            onClick={() => updatePaymentStatus(order.id, "paid")}
                            disabled={updatingId === order.id}
                            className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Mark as Paid"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.order_status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.order_status === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : order.order_status === "shipped"
                            ? "bg-purple-100 text-purple-700"
                            : order.order_status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.order_status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        {order.customer_phone && order.order_status !== "shipped" && order.order_status !== "delivered" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "shipped", order)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Ship & notify via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        )}
                        <select
                          value={order.order_status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value, order)}
                          disabled={updatingId === order.id}
                          className="text-xs border border-border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
