import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Zap, Star } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuantityStepper from './QuantityStepper';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

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
    <div className="card group hover:shadow-lift hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-gold-400 text-ink-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Best Seller
            </span>
          )}
          {product.category === 'kit' && (
            <span className="bg-forest-600 text-cream-50 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
              Combo Kit
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream-50/90 backdrop-blur-sm flex items-center justify-center hover:bg-cream-50 transition-all duration-300 group/heart"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              inWishlist ? 'fill-red-500 text-red-500 scale-110' : 'text-ink-400 group-hover/heart:text-ink-600'
            }`}
          />
        </button>
        {/* Stock badge */}
        <div className="absolute bottom-3 left-3">
          {product.stock === 0 ? (
            <span className="bg-red-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          ) : lowStock ? (
            <span className="bg-orange-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              Only {product.stock} left
            </span>
          ) : (
            <span className="bg-forest-500 text-cream-50 text-[10px] font-semibold px-2.5 py-1 rounded-full">
              In Stock
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(product.rating)
                    ? 'fill-gold-400 text-gold-400'
                    : 'text-cream-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-ink-400 ml-1">({product.reviewCount})</span>
        </div>

        {/* Name */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-base font-semibold text-ink-700 hover:text-forest-600 transition-colors mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Tagline */}
        <p className="text-xs text-ink-400 mb-3 line-clamp-2">{product.tagline}</p>

        {/* Size */}
        <p className="text-xs text-forest-500 font-medium mb-3">{product.size}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="font-serif text-xl font-bold text-forest-700">{formatPrice(product.price)}</span>
        </div>

        {/* Quantity + Add to cart */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-2">
            <QuantityStepper
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
              onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
              size="sm"
              max={product.stock}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full font-medium text-xs transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                added
                  ? 'bg-forest-500 text-cream-50'
                  : 'bg-forest-600 text-cream-50 hover:bg-forest-700 hover:shadow-card'
              }`}
            >
              {added ? (
                <>Added!</>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </>
              )}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full font-semibold text-xs bg-gold-400 text-ink-800 hover:bg-gold-300 hover:shadow-card transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
