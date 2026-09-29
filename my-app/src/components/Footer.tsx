import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Shield, Truck, RefreshCw, CreditCard } from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-cream-200 mt-20">
      {/* Trust badges row */}
      <div className="border-b border-forest-700">
        <div className="section-pad py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected checkout' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '7-day return policy' },
              { icon: Leaf, title: '100% Natural', desc: 'Ayurvedic & herbal' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream-100">{item.title}</p>
                  <p className="text-xs text-cream-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-pad py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center">
                <span className="font-serif text-cream-50 text-lg font-bold">E</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-cream-100 leading-none">EarthVeda</h3>
                <p className="text-[10px] text-gold-400 font-medium tracking-wide uppercase">Herbal</p>
              </div>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed mb-4">
              Nature's Wisdom for a Healthier You. Premium Ayurvedic and herbal men's wellness products crafted with traditional wisdom.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-forest-700 hover:bg-gold-400 hover:text-ink-800 flex items-center justify-center transition-all duration-300"
                  aria-label="Social media link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Shop All Products', path: '/shop' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-cream-300 hover:text-gold-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream-100 mb-4">Policies</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Shipping Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-cream-300 hover:text-gold-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream-100 mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-cream-300">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" />
                <span>123 Herbal Street, Wellness District, Mumbai 400001, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream-300">
                <Phone className="w-4 h-4 shrink-0 text-gold-400" />
                <a href="tel:+911234567890" className="hover:text-gold-400 transition-colors">+91 12345 67890</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream-300">
                <Mail className="w-4 h-4 shrink-0 text-gold-400" />
                <a href="mailto:care@earthveda.com" className="hover:text-gold-400 transition-colors">care@earthveda.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment icons */}
      <div className="border-t border-forest-700">
        <div className="section-pad py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-cream-300 mr-2">We Accept:</span>
              {[CreditCard, CreditCard, CreditCard, CreditCard].map((Icon, i) => (
                <div key={i} className="w-10 h-7 rounded bg-forest-700 flex items-center justify-center border border-forest-600">
                  <Icon className="w-4 h-4 text-cream-400" />
                </div>
              ))}
            </div>
            <p className="text-xs text-cream-400">
              © 2026 EarthVeda Herbal. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-forest-900 py-4 px-4">
        <div className="section-pad">
          <p className="text-[11px] text-cream-400 leading-relaxed text-center max-w-4xl mx-auto">
            <strong className="text-cream-300">Disclaimer:</strong> These statements have not been evaluated by any medical authority.
            This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a physician before use.
            Products are intended for adult use only (18+). Keep out of reach of children.
          </p>
        </div>
      </div>
    </footer>
  );
}
