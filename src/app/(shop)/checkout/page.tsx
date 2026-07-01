"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Building2, Check, Copy } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const subtotal = getTotal();
  const shipping = subtotal >= 50000 ? 0 : 2000;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    paymentMethod: "bank_transfer" as "bank_transfer" | "card",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    bank_name: "",
    bank_account: "",
    bank_account_name: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("store_settings");
    if (saved) {
      const s = JSON.parse(saved);
      setBankInfo({
        bank_name: s.bank_name || "",
        bank_account: s.bank_account || "",
        bank_account_name: s.bank_account_name || "",
      });
    }
  }, []);

  const createOrder = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        items: items.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          selected_color: item.selectedColor,
        })),
        total: subtotal,
        shipping,
      }),
    });
    return res.json();
  };

  const handlePaystackPayment = async () => {
    setLoading(true);
    try {
      sessionStorage.setItem("pending_checkout", JSON.stringify({
        ...form,
        items: items.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          selected_color: item.selectedColor,
        })),
        total: subtotal,
        shipping,
      }));

      const initRes = await fetch("/api/paystack/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          amount: total,
          metadata: {
            name: form.name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
          },
        }),
      });

      const initData = await initRes.json();

      if (initData.access_code) {
        window.location.href = `https://checkout.paystack.com/${initData.access_code}`;
      } else {
        alert("Failed to initialize payment. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (form.paymentMethod === "card") {
      handlePaystackPayment();
      return;
    }

    // Bank transfer: show bank details first
    setShowBankDetails(true);
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const data = await createOrder();
      if (data.success) {
        setOrderId(data.orderId);
        setSuccess(true);
        clearCart();
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankInfo.bank_account);
  };

  if (items.length === 0 && !success) {
    router.push("/cart");
    return null;
  }

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Order Placed!</h2>
        <p className="mt-2 text-foreground/60">
          Your order ID is <span className="font-mono font-semibold">{orderId}</span>
        </p>

        <div className="mt-6 p-6 bg-muted rounded-xl max-w-md mx-auto text-left">
          <h3 className="font-semibold text-foreground mb-2">Next Steps</h3>
          <p className="text-sm text-foreground/70 mb-3">
            Please transfer <strong>₦{total.toLocaleString()}</strong> to:
          </p>
          <div className="p-3 bg-white rounded-lg border border-border">
            <p className="text-sm"><strong>Bank:</strong> {bankInfo.bank_name || "Not set"}</p>
            <p className="text-sm"><strong>Account:</strong> {bankInfo.bank_account || "Not set"}</p>
            <p className="text-sm"><strong>Name:</strong> {bankInfo.bank_account_name || "Not set"}</p>
            <p className="text-sm mt-2 text-foreground/60">
              Use your order ID as reference
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl max-w-md mx-auto">
          <p className="text-sm text-blue-700">
            Your order is <strong>pending</strong> until we confirm your payment.
          </p>
        </div>

        <Button onClick={() => router.push("/")} className="mt-8">
          Back to Home
        </Button>
      </div>
    );
  }

  if (showBankDetails) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Bank Transfer</h1>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-xl border border-border p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Transfer to this account</h2>

            <div className="bg-muted rounded-xl p-5 text-center">
              <p className="text-sm text-foreground/60 mb-1">Amount</p>
              <p className="text-3xl font-bold text-primary">₦{total.toLocaleString()}</p>
            </div>

            <div className="mt-5 p-4 bg-white rounded-xl border border-border">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/60">Bank</span>
                  <span className="font-semibold text-foreground">{bankInfo.bank_name || "Not set"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/60">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground font-mono">{bankInfo.bank_account || "Not set"}</span>
                    {bankInfo.bank_account && (
                      <button onClick={copyAccountNumber} className="p-1 text-primary hover:bg-primary/10 rounded transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/60">Account Name</span>
                  <span className="font-semibold text-foreground">{bankInfo.bank_account_name || "Not set"}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-foreground/50 text-center mt-4">
              Use your order ID as the transfer reference
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 mb-6">
            <p className="text-sm text-amber-800 font-medium mb-1">Important</p>
            <p className="text-sm text-amber-700">
              After making the transfer, click the button below to confirm your payment. Your order will be processed immediately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleConfirmPayment}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "I Have Made Payment"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowBankDetails(false)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    form.paymentMethod === "bank_transfer"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={form.paymentMethod === "bank_transfer"}
                    onChange={() => setForm({ ...form, paymentMethod: "bank_transfer" })}
                    className="w-4 h-4 text-primary"
                  />
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-foreground/60">Transfer directly to our bank account</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    form.paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.paymentMethod === "card"}
                    onChange={() => setForm({ ...form, paymentMethod: "card" })}
                    className="w-4 h-4 text-primary"
                  />
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Pay with Card</p>
                    <p className="text-sm text-foreground/60">Secure online payment via Paystack</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-4">Your Order</h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-foreground/70 truncate mr-2">
                      {item.product.name} — {item.quantity} yd{item.quantity > 1 ? "s" : ""}
                    </span>
                    <span className="font-medium flex-shrink-0">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-6"
                disabled={loading}
              >
                {form.paymentMethod === "card" ? "Pay with Card" : "Pay"}
              </Button>

              <p className="text-xs text-foreground/50 text-center mt-3">
                By placing this order, you agree to our terms of service.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
