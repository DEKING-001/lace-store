import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, color: string) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, color: string) => {
        const items = get().items;
        const existing = items.find(
          (item) => item.product.id === product.id && item.selectedColor === color
        );

        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id && item.selectedColor === color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1, selectedColor: color }] });
        }
      },

      removeItem: (productId: string, color: string) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.selectedColor === color)
          ),
        });
      },

      updateQuantity: (productId: string, color: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, color);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.selectedColor === color
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "abafabrics-cart",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
