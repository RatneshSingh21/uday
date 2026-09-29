import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Check, ArrowRight, Truck, Banknote, Smartphone, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/types';
import Breadcrumbs from '@/components/Breadcrumbs';

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 49;

interface ShippingForm {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

type PaymentMethod = 'cod' | 'upi' | 'card';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<ShippingForm>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingForm> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    const id = 'EV' + Date.now().toString().slice(-8);
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  // Order confirmation screen
  if (orderPlaced) {
    return (
      <div className="section-pad py-8 animate-fade-in">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-20 h-20 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="w-10 h-10 text-forest-600" />
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-forest-700 mb-3">
            Order Confirmed!
          </h1>
          <p className="text-sm text-ink-500 mb-2">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div className="inline-flex items-center gap-2 bg-cream-50 border border-cream-300 rounded-full px-5 py-2.5 mb-8 mt-2">
            <span className="text-sm text-ink-400">Order ID:</span>
            <span className="font-mono font-bold text-forest-700">{orderId}</span>
          </div>

          <div className="bg-cream-50 rounded-2xl shadow-soft border border-cream-200 p-6 text-left mb-6">
            <h2 className="font-serif text-lg font-semibold text-ink-700 mb-4">Shipping Details</h2>
            <div className="space-y-2 text-sm text-ink-500">
              <p><span className="text-ink-400">Name:</span> {form.name}</p>
              <p><span className="text-ink-400">Phone:</span> {form.phone}</p>
              <p><span className="text-ink-400">Address:</span> {form.address}, {form.city}, {form.state} - {form.pincode}</p>
              <p><span className="text-ink-400">Payment:</span> {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Card'}</p>
            </div>
          </div>

          <div className="bg-forest-50 rounded-2xl p-4 mb-8 border border-forest-100">
            <div className="flex items-center gap-2 text-sm text-forest-700">
              <Truck className="w-5 h-5" />
              <span>Expected delivery in 3-7 business days</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="btn-primary">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/" className="btn-ghost">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart redirect
  if (items.length === 0) {
    return (
      <div className="section-pad py-8 animate-fade-in">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Checkout' }]} />
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-ink-300" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink-600 mb-3">Your Cart is Empty</h1>
          <p className="text-sm text-ink-400 mb-8">Add items to your cart before checking out.</p>
          <Link to="/shop" className="btn-primary">
            Shop Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { id: 'cod' as const, label: 'Cash on Delivery', desc: 'Pay when you receive', icon: Banknote },
    { id: 'upi' as const, label: 'UPI Payment', desc: 'GPay, PhonePe, Paytm', icon: Smartphone },
    { id: 'card' as const, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
  ];

  return (
    <div className="section-pad py-8 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />

      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-forest-700 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form + Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-cream-50 rounded-2xl shadow-soft border border-cream-200 p-6">
            <h2 className="font-serif text-xl font-bold text-ink-700 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">Street Address *</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="input-field resize-none"
                  rows={2}
                  placeholder="House no, building, street, area"
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="input-field"
                  placeholder="City"
                />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">State *</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="input-field"
                  placeholder="State"
                />
                {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-ink-600 mb-1.5 block">Pincode *</label>
                <input
                  type="text"
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="input-field"
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
                {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-cream-50 rounded-2xl shadow-soft border border-cream-200 p-6">
            <h2 className="font-serif text-xl font-bold text-ink-700 mb-4">Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === method.id
                      ? 'border-forest-600 bg-forest-50'
                      : 'border-cream-200 hover:border-cream-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    paymentMethod === method.id ? 'bg-forest-600' : 'bg-cream-200'
                  }`}>
                    <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-cream-50' : 'text-ink-400'}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-ink-700">{method.label}</p>
                    <p className="text-xs text-ink-400">{method.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    paymentMethod === method.id ? 'border-forest-600 bg-forest-600' : 'border-cream-300'
                  }`}>
                    {paymentMethod === method.id && <Check className="w-3 h-3 text-cream-50" />}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-ink-300 mt-3 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Payment integration coming soon. This is a demo checkout.
            </p>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-cream-50 rounded-2xl shadow-soft border border-cream-200 p-6">
            <h2 className="font-serif text-xl font-bold text-ink-700 mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-4 pb-4 border-b border-cream-200 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-cream-200 shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink-700 line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-ink-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-ink-700 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2.5 pb-4 border-b border-cream-200">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Subtotal</span>
                <span className="font-medium text-ink-700">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Shipping</span>
                <span className="font-medium text-ink-700">
                  {shipping === 0 ? <span className="text-forest-600">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline py-4 mb-4">
              <span className="font-serif text-lg font-bold text-ink-700">Total</span>
              <span className="font-serif text-2xl font-bold text-forest-700">{formatPrice(total)}</span>
            </div>

            <button onClick={handlePlaceOrder} className="btn-primary w-full mb-4">
              Place Order
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <Shield className="w-4 h-4 text-forest-600" />
                <span>SSL Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <Check className="w-4 h-4 text-forest-600" />
                <span>7-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <Truck className="w-4 h-4 text-forest-600" />
                <span>Fast & Reliable Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
