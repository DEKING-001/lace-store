"use client";

import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-foreground/20 mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
        <p className="mt-2 text-foreground/60">Start shopping to add items to your cart.</p>
        <Link href="/shop">
          <Button className="mt-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse Fabrics
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor}`}
              className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-border"
            >
              {/* Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                {item.product.images[0] ? (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-light text-2xl">
                     
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{item.product.name}</h3>
                <p className="text-sm text-foreground/60 capitalize">
                  {item.product.material_type} • {item.selectedColor}
                </p>
                <p className="text-lg font-bold text-primary mt-1">
                  ₦{item.product.price.toLocaleString()}/yard
                </p>

                <div className="flex items-center justify-between mt-2">
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity} yd{item.quantity > 1 ? "s" : ""}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedColor)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-border p-6 sticky top-24">
            <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">
                  Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} yard{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""})
                </span>
                <span className="font-medium">₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Shipping</span>
                <span className="font-medium text-primary">Calculated at checkout</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            <Link href="/checkout">
              <Button size="lg" className="w-full mt-6">
                Proceed to Checkout
              </Button>
            </Link>

            <Link
              href="/shop"
              className="block text-center text-sm text-primary hover:underline mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
