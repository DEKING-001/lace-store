"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import type { Coupon } from "@/types";
import Button from "@/components/ui/Button";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discount_percent: "",
    max_uses: "",
    expires_at: "",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: form.code.toUpperCase(),
      discount_percent: Number(form.discount_percent),
      max_uses: Number(form.max_uses),
      used_count: 0,
      expires_at: form.expires_at,
      active: true,
    };
    setCoupons((prev) => [...prev, newCoupon]);
    setShowModal(false);
    setForm({ code: "", discount_percent: "", max_uses: "", expires_at: "" });
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Coupons</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-foreground/70">Code</th>
                <th className="text-left p-3 font-medium text-foreground/70">Discount</th>
                <th className="text-left p-3 font-medium text-foreground/70">Uses</th>
                <th className="text-left p-3 font-medium text-foreground/70">Expires</th>
                <th className="text-left p-3 font-medium text-foreground/70">Status</th>
                <th className="text-right p-3 font-medium text-foreground/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
                    Loading...
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
                    No coupons yet. Create your first coupon!
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-border last:border-0">
                    <td className="p-3 font-mono font-semibold">{coupon.code}</td>
                    <td className="p-3">{coupon.discount_percent}%</td>
                    <td className="p-3">
                      {coupon.used_count} / {coupon.max_uses}
                    </td>
                    <td className="p-3">
                      {coupon.expires_at
                        ? new Date(coupon.expires_at).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          coupon.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {coupon.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleCoupon(coupon.id)}
                          className="text-xs text-primary hover:underline"
                        >
                          {coupon.active ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => deleteCoupon(coupon.id)}
                          className="p-1 text-foreground/50 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Create Coupon</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Coupon Code *</label>
                <input
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="e.g. SUMMER20"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Discount (%) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={form.discount_percent}
                    onChange={(e) =>
                      setForm({ ...form, discount_percent: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Uses *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={form.max_uses}
                    onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={form.expires_at}
                  onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">
                  Create Coupon
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
