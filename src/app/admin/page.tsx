"use client";

import { useState, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import type { Order } from "@/types";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.order_status === "pending").length,
    totalRevenue: orders
      .filter((o) => o.payment_status === "paid")
      .reduce((sum, o) => sum + o.total, 0),
    deliveredOrders: orders.filter((o) => o.order_status === "delivered").length,
  };

  const getChartData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toLocaleDateString("en-US", { weekday: "short" });
      const dateStr = date.toISOString().split("T")[0];
      const dayOrders = orders.filter((o) => o.created_at?.startsWith(dateStr));
      const revenue = dayOrders
        .filter((o) => o.payment_status === "paid")
        .reduce((sum, o) => sum + o.total, 0);
      const count = dayOrders.length;
      days.push({ day: dayStr, revenue, count });
    }
    return days;
  };

  const chartData = getChartData();
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 1);

  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: Package,
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      label: "Revenue",
      value: `₦${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Delivered",
      value: stats.deliveredOrders,
      icon: TrendingUp,
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-foreground/50 mt-1">
            Welcome back. Here&apos;s your store overview.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/50 font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color.split(" ")[1]}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-foreground">Revenue Overview</h2>
            <p className="text-sm text-foreground/50 mt-0.5">
              Last 7 days performance
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span className="font-medium">This Week</span>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end gap-3 h-48">
          {chartData.map((d, i) => {
            const height =
              d.revenue > 0 ? Math.max((d.revenue / maxRevenue) * 100, 8) : 4;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs font-semibold text-foreground/70">
                  {d.revenue > 0 ? `₦${d.revenue.toLocaleString()}` : "-"}
                </div>
                <div className="w-full flex justify-center">
                  <div
                    className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${
                      d.revenue > 0
                        ? "bg-gradient-to-t from-primary to-primary-light"
                        : "bg-border"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-foreground/50">
                  {d.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-bold text-foreground">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-semibold text-foreground/60 text-xs uppercase tracking-wider">
                  Order ID
                </th>
                <th className="text-left px-5 py-3 font-semibold text-foreground/60 text-xs uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-5 py-3 font-semibold text-foreground/60 text-xs uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-5 py-3 font-semibold text-foreground/60 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-5 py-3 font-semibold text-foreground/60 text-xs uppercase tracking-wider">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-foreground/40">
                    Loading...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                        <ShoppingCart className="w-7 h-7 text-foreground/20" />
                      </div>
                      <p className="font-semibold text-foreground/60">No orders yet</p>
                      <p className="text-sm text-foreground/40 mt-1">
                        Orders will appear here once customers start purchasing.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.slice(0, 10).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-4 font-mono text-xs font-medium">{order.id}</td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-xs text-foreground/40">{order.customer_email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold">₦{order.total.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.order_status === "delivered"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : order.order_status === "confirmed"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : order.order_status === "pending"
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      }`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.payment_status === "paid"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                      }`}>
                        {order.payment_status}
                      </span>
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
