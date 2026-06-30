import Link from "next/link";
import { ArrowRight, Truck, Shield, Star } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark opacity-90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
          <div className="max-w-2xl">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">
              Aba Premium Net Fabrics
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Luxury Fabrics
              <span className="block text-accent mt-2">For Every Occasion</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-lg">
              Premium damask, beaded lace, senator materials, and traditional fabrics.
              Crafted for elegance, delivered nationwide.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary-dark font-semibold px-8">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white dark:bg-gray-900 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex items-center gap-4 py-5 md:justify-center">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Nationwide Delivery</h3>
                <p className="text-xs text-foreground/50">Across all 36 states</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-5 md:justify-center">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Quality Guaranteed</h3>
                <p className="text-xs text-foreground/50">Premium materials only</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-5 md:justify-center">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Trusted Since Day One</h3>
                <p className="text-xs text-foreground/50">1000+ satisfied customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-3">
              Collections
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { name: "Fabric", emoji: " ", slug: "fabric", desc: "Damask & more" },
              { name: "Beaded Lace", emoji: "✨", slug: "beaded lace", desc: "Luxury & velvet" },
              { name: "Senator", emoji: " ", slug: "senator material", desc: "Jonkoso & south" },
              { name: "Plain", emoji: " ", slug: "plain", desc: "Mikado & basics" },
              { name: "Cord Lace", emoji: " ", slug: "cord lace", desc: "Classic styles" },
              { name: "Patterned", emoji: " ", slug: "patterned fabric", desc: "Isiagu & traditional" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-border p-6 sm:p-8 hover:border-accent hover:shadow-lg transition-all duration-300 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-4xl sm:text-5xl block mb-4 relative">{cat.emoji}</span>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors relative">
                  {cat.name}
                </h3>
                <p className="text-xs text-foreground/50 mt-1 relative">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Premium Quality, Every Thread
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "01", title: "Direct from Aba", desc: "Sourced directly from the best manufacturers in Aba" },
              { number: "02", title: "Premium Materials", desc: "Only the finest fabrics make it to our collection" },
              { number: "03", title: "Competitive Prices", desc: "Best prices without compromising on quality" },
              { number: "04", title: "Fast Delivery", desc: "We deliver across Nigeria, quickly and safely" },
            ].map((item) => (
              <div key={item.number} className="text-center sm:text-left">
                <span className="text-3xl font-bold text-accent/30">{item.number}</span>
                <h3 className="font-bold text-lg mt-2">{item.title}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-3">
            Ready?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Start Shopping Today
          </h2>
          <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
            Browse our full collection and find the perfect fabric for your next outfit.
          </p>
          <div className="mt-10">
            <Link href="/shop">
              <Button size="lg" className="px-10">
                Browse All Fabrics
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
