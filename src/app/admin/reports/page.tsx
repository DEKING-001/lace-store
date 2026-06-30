"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Package, DollarSign, ShoppingCart } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  items: { product_name: string; quantity: number; price: number }[];
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function ReportsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
    ]).then(([ordersData, productsData]) => {
      setOrders(ordersData.orders || []);
      setProducts(productsData.products || []);
      setLoading(false);
    });
  }, []);

  const totalRevenue = orders
    .filter((o) => o.payment_status === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.order_status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.order_status === "delivered").length;

  // Product sales count
  const productSales: Record<string, { name: string; count: number; revenue: number }> = {};
  orders.forEach((order) => {
    order.items?.forEach((item) => {
      if (!productSales[item.product_name]) {
        productSales[item.product_name] = { name: item.product_name, count: 0, revenue: 0 };
      }
      productSales[item.product_name].count += item.quantity;
      productSales[item.product_name].revenue += item.price * item.quantity;
    });
  });
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Monthly revenue
  const monthlyRevenue: Record<string, number> = {};
  orders.forEach((order) => {
    if (order.payment_status === "paid") {
      const month = new Date(order.created_at).toLocaleDateString("en-NG", { month: "short", year: "numeric" });
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.total;
    }
  });
  const monthlyData = Object.entries(monthlyRevenue).slice(-6);

  const maxRevenue = Math.max(...monthlyData.map(([, v]) => v), 1);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Sales Reports</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-foreground/60">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            ₦{totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-foreground/60">Total Orders</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
          <p className="text-xs text-foreground/50 mt-1">
            {pendingOrders} pending, {deliveredOrders} delivered
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm text-foreground/60">Products</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{products.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white p-6 rounded-2xl border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Monthly Revenue
          </h2>
          {monthlyData.length === 0 ? (
            <p className="text-sm text-foreground/50 text-center py-8">No revenue data yet</p>
          ) : (
            <div className="space-y-3">
              {monthlyData.map(([month, revenue]) => (
                <div key={month} className="flex items-center gap-3">
                  <span className="text-xs text-foreground/60 w-20">{month}</span>
                  <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-foreground w-24 text-right">
                    ₦{revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Top Selling Products</h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-foreground/50 text-center py-8">No sales data yet</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm font-bold text-primary w-6">
                    #{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-foreground/50">
                      {product.count} sold
                    </p>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    ₦{product.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
