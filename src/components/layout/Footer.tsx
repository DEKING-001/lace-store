import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3">Aba Premium Net Fabrics</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted source for premium lace, net, chiffon, silk, and cotton
              fabrics. Quality materials for every occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-white/70 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-white/70 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-accent">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:09038171393" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  09038171393
                </a>
              </li>
              <li>
                <a href="mailto:adighibechukwuma2021@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  adighibechukwuma2021@gmail.com
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Aba+Nigeria" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                  Aba, Nigeria
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Aba Premium Net Fabrics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
