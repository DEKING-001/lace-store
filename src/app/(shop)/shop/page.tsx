"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import type { Product, MaterialType } from "@/types";
import ProductCard from "@/components/product/ProductCard";

const CATEGORIES: { value: MaterialType | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "All Fabrics", emoji: " " },
  { value: "fabric", label: "Fabric", emoji: " " },
  { value: "beaded lace", label: "Beaded Lace", emoji: "✨" },
  { value: "cord lace", label: "Cord Lace", emoji: " " },
  { value: "senator material", label: "Senator", emoji: " " },
  { value: "plain", label: "Plain", emoji: " " },
  { value: "patterned fabric", label: "Patterned", emoji: " " },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<MaterialType | "all">(
    initialCategory as MaterialType | "all"
  );
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = products
    .filter((p) => category === "all" || p.material_type === category)
    .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  const activeCat = CATEGORIES.find((c) => c.value === category);

  return (
    <div>
      {/* Banner */}
      <section className="relative bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-3">
            Our Collection
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {activeCat?.emoji}{" "}
            {category === "all" ? "All Fabrics" : activeCat?.label}
          </h1>
          <p className="mt-3 text-white/60 max-w-lg">
            Browse our premium collection of fabrics sourced directly from Aba.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fabrics..."
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (scrollable on mobile) */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                category === cat.value
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-white text-foreground/70 border-border hover:border-primary/30 hover:text-primary"
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort & Count Bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-foreground/50">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            product{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2.5 border border-border rounded-xl hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/5] bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-5 bg-muted rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4"> </span>
            <p className="text-foreground/60 text-lg font-medium">
              No products found in this category.
            </p>
            <button
              onClick={() => setCategory("all")}
              className="mt-4 text-primary font-semibold text-sm hover:underline"
            >
              View All Fabrics
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-primary-dark h-48 sm:h-64 flex items-center justify-center">
          <div className="text-white/50">Loading...</div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
