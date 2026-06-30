"use client";

import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.colors[0]);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span className="text-5xl opacity-30"> </span>
              <span className="text-xs text-foreground/30 font-medium uppercase tracking-wider">
                {product.material_type}
              </span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick actions */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-white dark:bg-gray-800 text-primary-dark dark:text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
            <div className="bg-white dark:bg-gray-800 text-primary-dark dark:text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
              <Eye className="w-4 h-4" />
            </div>
          </div>

          {/* Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-accent text-primary-dark text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-1">
            {product.material_type}
          </p>
          <h3 className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="mt-3">
            <p className="text-lg font-bold text-primary">
              ₦{product.price.toLocaleString()}<span className="text-xs font-normal text-foreground/50">/yard</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
