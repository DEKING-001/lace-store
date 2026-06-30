"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { useTheme } from "@/lib/theme";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { theme, toggle } = useTheme();

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/track", label: "Track Order" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/logo.jpeg"
              alt="Aba Premium Net Fabrics"
              className="h-12 sm:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2 text-foreground/70 hover:text-primary transition-colors rounded-lg hover:bg-muted"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link
              href="/cart"
              className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground/70"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white dark:bg-gray-900">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
