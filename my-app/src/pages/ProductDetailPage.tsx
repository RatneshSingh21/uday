import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Zap, Check, Truck, Shield, RefreshCw, ChevronRight, Leaf } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { formatPrice } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuantityStepper from '@/components/QuantityStepper';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'benefits'>('description');

  if (!product) {
    return (
      <div className="section-pad py-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-ink-600 mb-4">Product Not Found</h1>
        <p className="text-sm text-ink-400 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product, 4);
  const inWishlist = isInWishlist(product.id);
  const lowStock = product.stock <= 10;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="section-pad py-8 animate-fade-in">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Shop', path: '/shop' },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-cream-200 shadow-soft mb-4 relative">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-gold-400 text-ink-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                Best Seller
              </span>
            )}
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`aspect-square rounded-xl overflow-hidden bg-cream-200 border-2 transition-all duration-200 ${
                  activeImage === index ? 'border-forest-600 shadow-card' : 'border-transparent hover:border-cream-300'
                }`}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-cream-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-ink-400">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Name */}
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-forest-700 mb-2">
            {product.name}
          </h1>

          {/* Tagline */}
          <p className="text-base text-ink-500 mb-4">{product.tagline}</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-serif text-3xl font-bold text-forest-700">{formatPrice(product.price)}</span>
            <span className="text-sm text-ink-400">/ {product.size}</span>
          </div>

          {/* Stock */}
          <div className="mb-4">
            {product.stock === 0 ? (
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                Out of Stock
              </span>
            ) : lowStock ? (
              <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Only {product.stock} left in stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-forest-50 text-forest-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Check className="w-3.5 h-3.5" />
                In Stock
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-sm text-ink-500 leading-relaxed mb-6">{product.description}</p>

          {/* Quantity + Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <QuantityStepper
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
              onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
              max={product.stock}
            />
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                added
                  ? 'bg-forest-500 text-cream-50'
                  : 'bg-forest-600 text-cream-50 hover:bg-forest-700 hover:shadow-card'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </>
              )}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gold-400 text-ink-800 hover:bg-gold-300 hover:shadow-card transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-4 h-4" /> Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="w-12 h-12 rounded-full border-2 border-cream-300 flex items-center justify-center hover:border-forest-500 transition-all duration-300 shrink-0"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                  inWishlist ? 'fill-red-500 text-red-500' : 'text-ink-400'
                }`}
              />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: Truck, label: 'Free Shipping', sub: 'Above ₹999' },
              { icon: Shield, label: 'Secure', sub: 'Protected' },
              { icon: RefreshCw, label: '7-Day', sub: 'Returns' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center p-3 bg-cream-50 rounded-xl border border-cream-200">
                <item.icon className="w-5 h-5 text-forest-600 mb-1.5" />
                <p className="text-xs font-semibold text-ink-700">{item.label}</p>
                <p className="text-[10px] text-ink-400">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 text-sm">
            <Leaf className="w-4 h-4 text-forest-500" />
            <span className="text-ink-400">Category:</span>
            <Link to="/shop" className="text-forest-600 font-medium hover:underline">
              {product.categoryLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Ingredients / Benefits */}
      <div className="mt-12 bg-cream-50 rounded-2xl shadow-soft border border-cream-200 overflow-hidden">
        <div className="flex border-b border-cream-200">
          {[
            { key: 'description', label: 'Description' },
            { key: 'ingredients', label: 'Ingredients' },
            { key: 'benefits', label: 'Benefits' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? 'text-forest-600'
                  : 'text-ink-400 hover:text-ink-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-forest-600" />
              )}
            </button>
          ))}
        </div>
        <div className="p-6 lg:p-8">
          {activeTab === 'description' && (
            <p className="text-sm text-ink-500 leading-relaxed">{product.fullDescription}</p>
          )}
          {activeTab === 'ingredients' && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.ingredients.map((ingredient, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-ink-600">
                  <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                  {ingredient}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'benefits' && (
            <ul className="space-y-3">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                  <Check className="w-4 h-4 text-forest-600 mt-0.5 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Combo items (if kit) */}
      {product.comboItems && (
        <div className="mt-8 bg-forest-50 rounded-2xl p-6 border border-forest-100">
          <h3 className="font-serif text-lg font-semibold text-forest-700 mb-4">What's in this kit:</h3>
          <ul className="space-y-2">
            {product.comboItems.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-ink-600">
                <ChevronRight className="w-4 h-4 text-gold-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-forest-700 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
