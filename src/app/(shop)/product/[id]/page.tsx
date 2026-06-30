"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Minus, Plus, Check, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/cart";
import Button from "@/components/ui/Button";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const [reviews, setReviews] = useState<{ id: string; customer_name: string; rating: number; comment: string; created_at: string }[]>([]);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/api/products?id=${params.id}`);
        const data = await res.json();
        setProduct(data.product);
        if (data.product?.colors?.length) {
          setSelectedColor(data.product.colors[0]);
        }
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    fetch(`/api/reviews?product_id=${params.id}`)
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {});
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (quantity > product.stock) {
      alert(`Only ${product.stock} available in stock`);
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const nextImage = () => {
    if (!product) return;
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="h-20 bg-muted rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <span className="text-5xl block mb-4"> </span>
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/shop">
          <Button className="mt-4">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const hasImages = product.images.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden">
            {hasImages ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <span className="text-7xl opacity-20"> </span>
                <span className="text-sm text-foreground/30 font-medium uppercase tracking-wider">
                  {product.material_type}
                </span>
              </div>
            )}

            {/* Navigation arrows */}
            {hasImages && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image counter */}
            {hasImages && product.images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {selectedImage + 1} / {product.images.length}
              </div>
            )}

            {/* Badge */}
            {product.featured && (
              <div className="absolute top-3 left-3">
                <span className="bg-accent text-primary-dark text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {hasImages && product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-primary shadow-md"
                      : "border-border hover:border-primary/50 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">
            {product.material_type}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-primary mt-4">
            ₦{product.price.toLocaleString()}<span className="text-sm font-normal text-foreground/50">/yard</span>
          </p>

          <p className="mt-6 text-foreground/70 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Yards</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" onClick={handleAddToCart} className="flex-1">
              {added ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
            <Link href="/cart">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Cart
              </Button>
            </Link>
          </div>

          {/* Stock */}
          <p className="mt-4 text-sm text-foreground/50">
            {product.stock > 0 ? `${product.stock} yard${product.stock !== 1 ? "s" : ""} in stock` : "Out of stock"}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-8">Customer Reviews</h2>

        {/* Review Form */}
        <div className="bg-white p-6 rounded-2xl border border-border mb-8 max-w-lg">
          <h3 className="font-semibold text-foreground mb-4">Leave a Review</h3>
          {reviewSubmitted ? (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl border border-green-200">
              Thank you! Your review has been submitted.
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Your Name</label>
                <input
                  type="text"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewForm.rating
                            ? "fill-accent text-accent"
                            : "text-foreground/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Comment (optional)</label>
                <textarea
                  rows={3}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="How was the fabric quality?"
                />
              </div>
              <button
                onClick={async () => {
                  if (!reviewForm.name.trim()) return;
                  await fetch("/api/reviews", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      product_id: product?.id,
                      customer_name: reviewForm.name,
                      rating: reviewForm.rating,
                      comment: reviewForm.comment,
                    }),
                  });
                  setReviews((prev) => [
                    {
                      id: "temp",
                      product_id: product?.id || "",
                      customer_name: reviewForm.name,
                      rating: reviewForm.rating,
                      comment: reviewForm.comment,
                      created_at: new Date().toISOString(),
                    },
                    ...prev,
                  ]);
                  setReviewSubmitted(true);
                }}
                className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-foreground/50 text-sm">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-5 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {review.customer_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.customer_name}</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= review.rating
                                ? "fill-accent text-accent"
                                : "text-foreground/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-foreground/40">
                    {new Date(review.created_at).toLocaleDateString("en-NG")}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-sm text-foreground/70 mt-2">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
