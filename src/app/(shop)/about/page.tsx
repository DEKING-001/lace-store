import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            Your trusted source for premium fabrics in Nigeria
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
              <div className="mt-6 space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Aba Premium Net Fabrics was born from a passion for quality textiles and
                  a deep understanding of what Nigerian fashion truly needs. Based in Aba,
                  the commercial heartbeat of Nigeria, we have direct access to the finest
                  fabrics from local and international sources.
                </p>
                <p>
                  We specialize in premium lace, net, chiffon, silk, and cotton fabrics
                  that cater to every occasion — from traditional weddings and owambe
                  celebrations to everyday fashion and corporate wear.
                </p>
                <p>
                  Our mission is simple: provide high-quality fabrics at competitive prices,
                  with a shopping experience that is seamless and enjoyable.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 sm:p-12">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-foreground/60 mt-1">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-foreground/60 mt-1">Fabric Types</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-foreground/60 mt-1">Quality fabrics</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-foreground/60 mt-1">Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                desc: "Every fabric in our collection is carefully selected to meet the highest standards of quality, texture, and durability.",
              },
              {
                title: "Competitive Prices",
                desc: "Direct sourcing from manufacturers means we offer the best prices without compromising on quality.",
              },
              {
                title: "Nationwide Delivery",
                desc: "We deliver across Nigeria. Wherever you are, your fabrics will reach you safely and on time.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl border border-border"
              >
                <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                <p className="mt-3 text-foreground/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, label: "Phone", value: "09038171393", link: "tel:09038171393" },
              { icon: Mail, label: "Email", value: "adighibechukwuma2021@gmail.com", link: "mailto:adighibechukwuma2021@gmail.com" },
              { icon: MapPin, label: "Location", value: "Aba, Nigeria", link: "https://maps.google.com/?q=Aba+Nigeria" },
              { icon: Clock, label: "Hours", value: "Mon - Sat, 9am - 6pm", link: null },
            ].map((item) => {
              const Tag = item.link ? "a" : "div";
              return (
              <Tag
                key={item.label}
                href={item.link || undefined}
                target={item.link ? "_blank" : undefined}
                rel={item.link ? "noopener noreferrer" : undefined}
                className="text-center p-6 bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all cursor-pointer block"
              >
                <item.icon className="w-8 h-8 mx-auto text-primary" />
                <h3 className="font-semibold mt-3">{item.label}</h3>
                <p className="text-sm text-foreground/60 mt-1">{item.value}</p>
              </Tag>
            );})}
          </div>
        </div>
      </section>
    </div>
  );
}
