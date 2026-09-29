import { Link } from 'react-router-dom';
import { Leaf, FlaskConical, ShieldCheck, HeartPulse, ArrowRight, Star, Sprout, Zap, Award, TrendingUp, MessageCircle, Mail } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, testimonials } from '@/data/products';

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const allProducts = products.slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-700 via-forest-600 to-forest-800">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/4174743/pexels-photo-4174743.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Ayurvedic herbal wellness"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-400/20 rounded-full blur-3xl" />

        <div className="section-pad relative py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-cream-50/10 backdrop-blur-sm border border-cream-50/20 rounded-full px-4 py-1.5 mb-6">
              <Sprout className="w-4 h-4 text-gold-400" />
              <span className="text-xs text-cream-100 font-medium tracking-wide">100% NATURAL AYURVEDIC WELLNESS</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-50 leading-tight mb-6">
              Nature's Wisdom for a{' '}
              <span className="text-gold-400">Healthier You</span>
            </h1>
            <p className="text-lg text-cream-200 leading-relaxed mb-8 max-w-xl">
              Premium Ayurvedic and herbal men's wellness products. Crafted with traditional wisdom
              and modern science for strength, stamina, and vitality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-gold">
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center gap-2 border-2 border-cream-50/30 text-cream-50 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:bg-cream-50/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative">
          <svg className="w-full h-12 fill-cream-100" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path d="M0,48 L1440,48 L1440,0 C1080,24 720,24 360,12 C240,8 120,4 0,0 Z" />
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-pad -mt-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Leaf, title: '100% Natural Herbs', desc: 'Pure Ayurvedic ingredients' },
            { icon: FlaskConical, title: 'Ayurvedic Formulation', desc: 'Traditional & scientific' },
            { icon: ShieldCheck, title: 'Safe & Effective', desc: 'GMP-certified quality' },
            { icon: HeartPulse, title: 'Supports Wellness', desc: 'For overall well-being' },
          ].map((badge) => (
            <div
              key={badge.title}
              className="bg-cream-50 rounded-2xl p-5 shadow-soft border border-cream-200 flex items-center gap-3 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                <badge.icon className="w-6 h-6 text-forest-600" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-ink-700 leading-tight">{badge.title}</h3>
                <p className="text-xs text-ink-400 mt-0.5">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-pad py-16">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-gold-500 uppercase tracking-widest mb-2">
            Best Sellers
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-forest-700 mb-3">
            Featured Products
          </h2>
          <p className="text-sm text-ink-400 max-w-xl mx-auto">
            Discover our most loved Ayurvedic formulations, trusted by thousands of men across India
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/shop" className="btn-outline">
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Full Product Grid */}
      <section className="bg-cream-200/50 py-16">
        <div className="section-pad">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-gold-500 uppercase tracking-widest mb-2">
              Our Collection
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-forest-700 mb-3">
              Shop All Products
            </h2>
            <p className="text-sm text-ink-400 max-w-xl mx-auto">
              From capsules and powders to premium combo kits — find the right wellness solution for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad py-16">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-gold-500 uppercase tracking-widest mb-2">
            Why EarthVeda
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-forest-700 mb-3">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: HeartPulse, title: 'Better Health', desc: 'Support your body with natural Ayurvedic herbs that promote holistic well-being and long-term health.' },
            { icon: Zap, title: 'More Energy', desc: 'Experience sustained energy throughout the day with our scientifically formulated herbal blends.' },
            { icon: TrendingUp, title: 'Higher Stamina', desc: 'Build endurance and stamina naturally with time-tested Ayurvedic ingredients for peak performance.' },
            { icon: Award, title: 'Greater Confidence', desc: 'Feel your best with products designed to support men\'s vitality, strength, and overall confidence.' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-cream-50 rounded-2xl p-6 text-center shadow-soft border border-cream-200 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-forest-600" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink-700 mb-2">{item.title}</h3>
              <p className="text-sm text-ink-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-forest-700 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="section-pad relative">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-gold-400 uppercase tracking-widest mb-2">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-cream-50 mb-3">
              What Our Customers Say
            </h2>
            <p className="text-sm text-cream-300 max-w-xl mx-auto">
              Real stories from real customers who trust EarthVeda for their daily wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-cream-50 rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= t.rating ? 'fill-gold-400 text-gold-400' : 'text-cream-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-ink-500 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center">
                    <span className="text-cream-50 text-sm font-semibold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-700">{t.name}</p>
                    <p className="text-xs text-ink-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter + WhatsApp CTA */}
      <section className="section-pad py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Newsletter */}
          <div className="bg-cream-50 rounded-3xl p-8 shadow-soft border border-cream-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center">
                <Mail className="w-6 h-6 text-forest-600" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-forest-700">Stay Updated</h3>
                <p className="text-sm text-ink-400">Get wellness tips & exclusive offers</p>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary shrink-0">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-ink-300 mt-3">No spam, unsubscribe anytime.</p>
          </div>

          {/* WhatsApp */}
          <div className="bg-forest-600 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-cream-50/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-cream-50" />
            </div>
            <h3 className="font-serif text-xl font-bold text-cream-50 mb-2">Chat on WhatsApp</h3>
            <p className="text-sm text-cream-200 mb-4 max-w-sm">
              Have questions about our products? Talk to our wellness experts directly on WhatsApp.
            </p>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cream-50 text-forest-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-cream-200 transition-all duration-300 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
