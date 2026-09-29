import { Link } from 'react-router-dom';
import { Leaf, Heart, Award, Sprout, Globe, Shield, FlaskConical, Users, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-700 to-forest-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="section-pad relative py-16 lg:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-cream-50/10 backdrop-blur-sm border border-cream-50/20 rounded-full px-4 py-1.5 mb-6">
            <Leaf className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-cream-100 font-medium tracking-wide">OUR STORY</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-cream-50 mb-4">
            Rooted in Tradition,<br />Crafted for Modern Men
          </h1>
          <p className="text-lg text-cream-200 max-w-2xl mx-auto leading-relaxed">
            EarthVeda Herbal brings the ancient wisdom of Ayurveda to men's modern wellness needs —
            with 100% natural ingredients, rigorous quality standards, and a commitment to your well-being.
          </p>
        </div>
      </section>

      <div className="section-pad py-12">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About' }]} />

        {/* Brand Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest mb-2 block">Our Journey</span>
            <h2 className="font-serif text-3xl font-bold text-forest-700 mb-4">The EarthVeda Story</h2>
            <div className="space-y-4 text-sm text-ink-500 leading-relaxed">
              <p>
                EarthVeda Herbal was born from a simple belief: that nature holds the answers to men's
                wellness challenges. In a world filled with synthetic supplements and quick fixes, we
                chose to return to the roots — to the 5,000-year-old science of Ayurveda.
              </p>
              <p>
                Our founders, inspired by the healing traditions of India, set out to create products that
                honor ancient wisdom while meeting the demands of modern life. Every formulation is crafted
                with carefully sourced herbs, processed using traditional methods, and tested for safety
                and efficacy.
              </p>
              <p>
                Today, EarthVeda serves thousands of men across India who trust us for their daily wellness
                needs — from strength and stamina to energy and vitality. We are proud to be part of their
                journey toward a healthier, more confident life.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lift">
              <img
                src="https://images.pexels.com/photos/7615470/pexels-photo-7615470.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Ayurvedic herbs and natural wellness ingredients"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-forest-600 text-cream-50 rounded-2xl p-6 shadow-lift hidden sm:block">
              <p className="font-serif text-3xl font-bold text-gold-400">5,000+</p>
              <p className="text-xs text-cream-200">Years of Ayurvedic Wisdom</p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-forest-50 rounded-3xl p-8 lg:p-12 mb-16 border border-forest-100">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-forest-600 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gold-400" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-forest-700 mb-4">Our Mission</h2>
            <p className="text-base text-ink-500 leading-relaxed">
              To empower men to take charge of their wellness through premium, natural Ayurvedic products
              that are safe, effective, and rooted in tradition. We believe that every man deserves access
              to the healing power of nature — without compromise on quality, safety, or authenticity.
            </p>
          </div>
        </div>

        {/* Why Ayurveda */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest mb-2 block">The Science</span>
            <h2 className="font-serif text-3xl font-bold text-forest-700">Why Ayurveda?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sprout, title: 'Natural & Holistic', desc: 'Ayurveda treats the whole person — body, mind, and spirit — using natural herbs that work in harmony with your body.' },
              { icon: Shield, title: 'Time-Tested Safety', desc: 'With 5,000 years of use, Ayurvedic herbs have a proven safety record. Our products are GMP-certified and rigorously tested.' },
              { icon: FlaskConical, title: 'Modern Science', desc: 'We combine traditional knowledge with modern research to create formulations that are both authentic and effective.' },
              { icon: Leaf, title: 'No Side Effects', desc: 'Unlike synthetic supplements, natural Ayurvedic herbs work gently with your body, minimizing the risk of side effects.' },
              { icon: Globe, title: 'Sustainably Sourced', desc: 'Our herbs are ethically sourced from trusted farms across India, supporting local communities and sustainable practices.' },
              { icon: Award, title: 'Quality Promise', desc: 'Every batch is tested for purity and potency. We never use artificial additives, preservatives, or harmful chemicals.' },
            ].map((item) => (
              <div key={item.title} className="bg-cream-50 rounded-2xl p-6 shadow-soft border border-cream-200 hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-forest-600" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-ink-700 mb-2">{item.title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sourcing & Quality */}
        <div className="bg-cream-200/50 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest mb-2 block">Our Promise</span>
              <h2 className="font-serif text-3xl font-bold text-forest-700 mb-4">Sourcing & Quality</h2>
              <div className="space-y-3 text-sm text-ink-500 leading-relaxed">
                <p>
                  We source our herbs from certified organic farms across India — from the Himalayas for Shilajit
                  to the plains of Rajasthan for Ashwagandha. Every ingredient is traceable from farm to finished product.
                </p>
                <p>
                  Our manufacturing facility is GMP-certified, ensuring the highest standards of hygiene, quality
                  control, and consistency. Each batch undergoes rigorous testing for heavy metals, microbial
                  contamination, and potency.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'GMP Certified', value: '100%' },
                { label: 'Natural Herbs', value: '100%' },
                { label: 'Happy Customers', value: '50K+' },
                { label: 'Product Rating', value: '4.7/5' },
              ].map((stat) => (
                <div key={stat.label} className="bg-cream-50 rounded-2xl p-5 text-center shadow-soft border border-cream-200">
                  <p className="font-serif text-3xl font-bold text-forest-700">{stat.value}</p>
                  <p className="text-xs text-ink-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Founder Note */}
        <div className="bg-forest-700 rounded-3xl p-8 lg:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-cream-50/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gold-400" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-cream-50 mb-4">A Note from Our Founders</h2>
            <blockquote className="text-base text-cream-200 leading-relaxed italic mb-6">
              "We started EarthVeda with a mission to bring authentic Ayurvedic wellness to every man in India.
              Too many products on the market are full of synthetic chemicals and false promises. We wanted
              to do things differently — to create products we would be proud to give to our own families.
              Every EarthVeda product is a promise: natural, safe, effective, and made with care. Thank you
              for trusting us with your wellness journey."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center">
                <span className="font-serif text-ink-800 font-bold">EV</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-cream-100">EarthVeda Founders</p>
                <p className="text-xs text-cream-300">Committed to your wellness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-forest-700 text-center mb-8">Our Certifications</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['GMP Certified', 'ISO 9001', 'Ayurvedic Licensed', 'FSSAI Approved'].map((cert) => (
              <div key={cert} className="bg-cream-50 rounded-2xl p-6 text-center shadow-soft border border-cream-200">
                <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-forest-600" />
                </div>
                <p className="text-sm font-semibold text-ink-700">{cert}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-cream-200/50 rounded-3xl p-8 lg:p-12">
          <h2 className="font-serif text-3xl font-bold text-forest-700 mb-3">Ready to Begin Your Wellness Journey?</h2>
          <p className="text-sm text-ink-400 mb-6 max-w-xl mx-auto">
            Explore our range of premium Ayurvedic products and find the right solution for your wellness goals.
          </p>
          <Link to="/shop" className="btn-primary">
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
