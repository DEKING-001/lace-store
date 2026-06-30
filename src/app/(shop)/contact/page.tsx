"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "2349038171393";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello, my name is ${name}.\n\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <p className="text-accent font-medium tracking-widest uppercase text-xs mb-3">
            Get in Touch
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Contact Us
          </h1>
          <p className="mt-3 text-white/60 max-w-lg">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: "Call Us",
                detail: "09038171393",
                link: "tel:09038171393",
                desc: "Mon - Sat, 9am - 6pm",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                detail: "09038171393",
                link: `https://wa.me/${WHATSAPP_NUMBER}`,
                desc: "Chat with us directly",
              },
              {
                icon: Mail,
                title: "Email Us",
                detail: "adighibechukwuma2021@gmail.com",
                link: "mailto:adighibechukwuma2021@gmail.com",
                desc: "We reply within 24 hours",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                detail: "Aba, Nigeria",
                link: "https://maps.google.com/?q=Aba+Nigeria",
                desc: "Open for pickups",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-primary font-semibold text-sm">{item.detail}</p>
                <p className="text-xs text-foreground/40 mt-1">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Message Form */}
      <section className="py-16 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent font-medium tracking-widest uppercase text-xs mb-3">
              Send a Message
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              Let&apos;s Talk
            </h2>
            <p className="text-sm text-foreground/50 mt-2">
              Fill the form and it will be sent directly to our WhatsApp
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-border p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white dark:bg-gray-800 text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08012345678"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white dark:bg-gray-800 text-foreground"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="How can we help?"
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white dark:bg-gray-800 text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Message
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you need..."
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none bg-white dark:bg-gray-800 text-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#25D366] text-white font-semibold py-3 rounded-xl hover:bg-[#20BD5A] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Send via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
