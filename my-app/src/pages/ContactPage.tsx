import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Check, ChevronDown } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { faqs } from '@/data/products';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-700 to-forest-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="section-pad relative py-16 lg:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-cream-50/10 backdrop-blur-sm border border-cream-50/20 rounded-full px-4 py-1.5 mb-6">
            <Mail className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-cream-100 font-medium tracking-wide">GET IN TOUCH</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-cream-50 mb-4">Contact Us</h1>
          <p className="text-lg text-cream-200 max-w-2xl mx-auto leading-relaxed">
            Have questions? We're here to help. Reach out and our wellness team will get back to you.
          </p>
        </div>
      </section>

      <div className="section-pad py-12">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact form */}
          <div className="bg-cream-50 rounded-3xl shadow-soft border border-cream-200 p-6 lg:p-8">
            <h2 className="font-serif text-2xl font-bold text-forest-700 mb-2">Send Us a Message</h2>
            <p className="text-sm text-ink-400 mb-6">We typically respond within 24 hours</p>

            {sent && (
              <div className="flex items-center gap-3 bg-forest-50 border border-forest-200 rounded-xl p-4 mb-6 animate-scale-in">
                <div className="w-8 h-8 rounded-full bg-forest-600 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-cream-50" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-forest-700">Message sent successfully!</p>
                  <p className="text-xs text-ink-400">We'll get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-field resize-none"
                  rows={5}
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact info + WhatsApp + Map */}
          <div className="space-y-6">
            {/* WhatsApp CTA */}
            <div className="bg-forest-600 rounded-3xl p-6 lg:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-cream-50/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-cream-50" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cream-50 mb-2">Chat on WhatsApp</h3>
              <p className="text-sm text-cream-200 mb-4">
                Get instant answers from our wellness experts. Click below to start a conversation.
              </p>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cream-50 text-forest-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-cream-200 transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                +91 12345 67890
              </a>
            </div>

            {/* Contact details */}
            <div className="bg-cream-50 rounded-3xl shadow-soft border border-cream-200 p-6 lg:p-8">
              <h3 className="font-serif text-xl font-bold text-forest-700 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-700">Address</p>
                    <p className="text-sm text-ink-400">123 Herbal Street, Wellness District,<br />Mumbai 400001, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-700">Phone</p>
                    <a href="tel:+911234567890" className="text-sm text-ink-400 hover:text-forest-600 transition-colors">
                      +91 12345 67890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-700">Email</p>
                    <a href="mailto:care@earthveda.com" className="text-sm text-ink-400 hover:text-forest-600 transition-colors">
                      care@earthveda.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-cream-50 rounded-3xl shadow-soft border border-cream-200 overflow-hidden">
              <div className="aspect-video bg-forest-50 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                    <path d="M0 100 Q100 50 200 100 T400 100" stroke="#2F5D3A" strokeWidth="2" fill="none" />
                    <path d="M0 120 Q100 70 200 120 T400 120" stroke="#2F5D3A" strokeWidth="2" fill="none" />
                    <path d="M0 80 Q100 30 200 80 T400 80" stroke="#2F5D3A" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className="text-center relative z-10">
                  <MapPin className="w-12 h-12 text-forest-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-ink-600">Mumbai, India</p>
                  <p className="text-xs text-ink-400">Map placeholder — connect Google Maps API</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest mb-2 block">FAQ</span>
            <h2 className="font-serif text-3xl font-bold text-forest-700">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-cream-50 rounded-2xl shadow-soft border border-cream-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-sm font-semibold text-ink-700">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-forest-600 shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 animate-slide-down">
                    <p className="text-sm text-ink-500 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
