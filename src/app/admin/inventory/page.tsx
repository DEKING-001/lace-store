"use client";

import { useState, useEffect } from "react";
import { Package, AlertTriangle, Check, Edit3 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  in_stock: boolean;
  category: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState(0);
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  const updateStock = async (id: string, stock: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stock, in_stock: stock > 0 }),
    });

    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock, in_stock: stock > 0 } : p
      )
    );
    setEditingId(null);
  };

  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 10);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  const filtered = products.filter((p) => {
    if (filter === "low") return p.stock > 0 && p.stock <= 10;
    if (filter === "out") return p.stock === 0;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse" />
        <div className="h-64 bg-muted rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Inventory</h1>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-foreground/60">Low Stock</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{lowStockProducts.length}</p>
          <p className="text-xs text-foreground/50">Products with 10 or fewer items</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-foreground/60">Out of Stock</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{outOfStockProducts.length}</p>
          <p className="text-xs text-foreground/50">Products with zero stock</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { value: "all", label: "All Products" },
          { value: "low", label: "Low Stock" },
          { value: "out", label: "Out of Stock" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.value
                ? "bg-primary text-white"
                : "bg-white text-foreground/60 border border-border hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-foreground/60 px-5 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-semibold text-foreground/60 px-5 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-foreground/60 px-5 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-semibold text-foreground/60 px-5 py-3">
                  Stock
                </th>
                <th className="text-left text-xs font-semibold text-foreground/60 px-5 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-foreground/60 px-5 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-foreground">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-foreground/60">{product.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-foreground/60">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editStock}
                        onChange={(e) => setEditStock(Number(e.target.value))}
                        className="w-20 px-2 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`text-sm font-bold ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock <= 10
                            ? "text-orange-600"
                            : "text-foreground"
                        }`}
                      >
                        {product.stock}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {product.stock === 0 ? (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                        Out of Stock
                      </span>
                    ) : product.stock <= 10 ? (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {editingId === product.id ? (
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => updateStock(product.id, editStock)}
                          className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs text-foreground/60 hover:text-foreground"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(product.id);
                          setEditStock(product.stock);
                        }}
                        className="p-1.5 text-foreground/40 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
