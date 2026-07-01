"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check, X, Truck, Package } from "lucide-react";
import { useCartStore } from "@/lib/cart";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [orderId, setOrderId] = useState("");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${reference}`);
        const data = await res.json();

        if (data.success && data.status === "success") {
          const checkoutData = JSON.parse(sessionStorage.getItem("pending_checkout") || "{}");

          if (checkoutData.name) {
            const orderRes = await fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...checkoutData,
                paymentMethod: "card",
                payment_ref: reference,
              }),
            });
            const orderData = await orderRes.json();
            if (orderData.success) {
              setOrderId(orderData.orderId);
              sessionStorage.removeItem("pending_checkout");
              clearCart();
            }
          }
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    };

    verify();
  }, [reference, clearCart]);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      {status === "loading" && (
        <div>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground">Verifying payment...</h2>
        </div>
      )}

      {status === "success" && (
        <div>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Order Placed Successfully!</h2>
          {orderId && (
            <p className="mt-2 text-foreground/60">
              Order ID: <span className="font-mono font-semibold">{orderId}</span>
            </p>
          )}

          <div className="mt-8 bg-muted rounded-xl p-6 text-left max-w-sm mx-auto">
            <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Payment Confirmed</p>
                  <p className="text-xs text-foreground/50">Your payment has been received</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Processing &amp; Shipping</p>
                  <p className="text-xs text-foreground/50">Your order will be shipped within 2 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Package className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Delivery</p>
                  <p className="text-xs text-foreground/50">Expected within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push(`/track`)}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              Track Your Order
            </button>
            <button
              onClick={() => router.push("/")}
              className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {status === "failed" && (
        <div>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Payment Failed</h2>
          <p className="mt-2 text-foreground/60">Something went wrong. Please try again.</p>
          <button
            onClick={() => router.push("/checkout")}
            className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default function PaystackCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground">Loading...</h2>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
