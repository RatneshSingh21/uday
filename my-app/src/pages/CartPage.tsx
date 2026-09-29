import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, Truck, Tag, X, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/types';
import QuantityStepper from '@/components/QuantityStepper';
import Breadcrumbs from '@/components/Breadcrumbs';

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 49;

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;

  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'EARTH10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "EARTH10" for 10% off!');
      setCouponApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    setCouponError('');
  };

  if (items.length === 0) {
    return (
      <div className="section-pad py-8 animate-fade-in">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Cart' }]} />
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-ink-300" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink-600 mb-3">Your Cart is Empty</h1>
          <p className="text-sm text-ink-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our range of premium Ayurvedic products.
          </p>
          <Link to="/shop" className="btn-primary">
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-pad py-8 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Cart' }]} />

      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-forest-700 mb-2">
        Shopping Cart
      </h1>
      <p className="text-sm text-ink-400 mb-6">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>

      {/* Free shipping progress bar */}
      <div className="bg-forest-50 rounded-2xl p-4 mb-6 border border-forest-100">
        <div className="flex items-center gap-2 mb-2">
          <Truck className="w-5 h-5 text-forest-600" />
          {remainingForFreeShipping > 0 ? (
            <p className="text-sm text-ink-600">
              Add <span className="font-semibold text-forest-700">{formatPrice(remainingForFreeShipping)}</span> more for{' '}
              <span className="font-semibold text-forest-700">FREE shipping!</span>
            </p>
          ) : (
            <p className="text-sm text-forest-700 font-medium flex items-center gap-1.5">
              <Check className="w-4 h-4" /> You've unlocked FREE shipping!
            </p>
          )}
        </div>
        <div className="w-full h-2.5 bg-cream-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-forest-500 to-forest-600 rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-cream-50 rounded-2xl shadow-soft border border-cream-200 p-4 flex gap-4"
            >
              {/* Image */}
              <Link to={`/product/${item.product.slug}`} className="shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-cream-200">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <Link to={`/product/${item.product.slug}`}>
                      <h3 className="font-serif text-base font-semibold text-ink-700 hover:text-forest-600 transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-ink-400 mt-0.5">{item.product.size}</p>
                    <p className="text-sm font-semibold text-forest-700 mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 rounded-full hover:bg-red-50 text-ink-300 hover:text-red-500 transition-colors shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <QuantityStepper
                    quantity={item.quantity}
                    onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                    onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                    size="sm"
                    max={item.product.stock}
                  />
                  <p className="font-serif text-lg font-bold text-ink-700">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-forest-600 hover:underline font-medium">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-cream-50 rounded-2xl shadow-soft border border-cream-200 p-6">
            <h2 className="font-serif text-xl font-bold text-ink-700 mb-4">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-4">
              {couponApplied ? (
                <div className="flex items-center justify-between bg-forest-50 border border-forest-200 rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-forest-600" />
                    <span className="text-sm font-medium text-forest-700">EARTH10 — 10% off</span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-ink-300 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code"
                      className="input-field flex-1 text-sm py-2.5"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2.5 bg-forest-600 text-cream-50 rounded-xl text-sm font-medium hover:bg-forest-700 transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
                  <p className="text-xs text-ink-300 mt-1.5">Try "EARTH10" for 10% off your order!</p>
                </>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2.5 pb-4 border-b border-cream-200">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Subtotal</span>
                <span className="font-medium text-ink-700">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-forest-600">Discount</span>
                  <span className="font-medium text-forest-600">-{formatPrice(discount)}</span>
                </div>
              )}
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

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full mb-3"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-ink-400">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Fast Delivery
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Secure
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Easy Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
