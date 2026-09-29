import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';


export default function Header() {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-forest-700 text-cream-100 text-xs sm:text-sm py-2 px-4 text-center font-medium">
        Free Shipping on orders above ₹999 · 100% Natural Ayurvedic Products
      </div>

      <header className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-md border-b border-cream-200 shadow-soft">
        <div className="section-pad">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
           {/* Logo */}
<Link to="/" className="flex items-center shrink-0">
  <img
    src="/earthveda-logo.jpeg"
    alt="EarthVeda Herbal"
   className="w-36 sm:w-40 lg:w-48 h-auto object-contain"
  />
</Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium text-ink-600 hover:text-forest-600 transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-cream-200 transition-colors duration-200"
                aria-label="Search products"
              >
                <Search className="w-5 h-5 text-ink-600" />
              </button>

              {/* Wishlist */}
              <Link
                to="/shop"
                className="p-2 rounded-full hover:bg-cream-200 transition-colors duration-200 relative hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-ink-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-400 text-ink-800 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 rounded-full hover:bg-cream-200 transition-colors duration-200 relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-ink-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-forest-600 text-cream-50 text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-full hover:bg-cream-200 transition-colors duration-200 md:hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5 text-ink-600" /> : <Menu className="w-5 h-5 text-ink-600" />}
              </button>
            </div>
          </div>

          {/* Search bar dropdown */}
          {searchOpen && (
            <div className="pb-4 animate-slide-down">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-11 pr-4 py-3 bg-cream-50 border border-cream-300 rounded-full text-sm focus:outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 transition-all"
                  autoFocus
                />
              </form>
            </div>
          )}

          {/* Mobile nav */}
          {mobileOpen && (
            <nav className="md:hidden pb-4 animate-slide-down">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-ink-600 hover:bg-cream-200 hover:text-forest-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
