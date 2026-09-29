import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products } from '@/data/products';

type SortOption = 'popularity' | 'price-low' | 'price-high' | 'newest';

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'capsules', label: 'Capsules' },
  { value: 'powder', label: 'Powder' },
  { value: 'oil', label: 'Oil' },
  { value: 'majun', label: 'Majun' },
  { value: 'kit', label: 'Combo Kits' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (localSearch.trim()) {
      const query = localSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [selectedCategory, priceRange, sortBy, localSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchParams({ search: localSearch.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setLocalSearch('');
    setSearchParams({});
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 3000]);
    setSortBy('popularity');
    clearSearch();
  };

  const FilterContent = () => (
    <>
      {/* Search */}
      <div>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-none focus:border-forest-500 transition-all"
          />
        </form>
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="mt-2 text-xs text-forest-600 hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear search
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-serif text-sm font-semibold text-ink-700 mb-3">Category</h3>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                selectedCategory === cat.value
                  ? 'bg-forest-600 text-cream-50 font-medium'
                  : 'text-ink-500 hover:bg-cream-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="font-serif text-sm font-semibold text-ink-700 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-ink-500">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={3000}
            step={100}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-forest-600"
          />
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-2 py-1.5 bg-cream-50 border border-cream-300 rounded-lg text-xs focus:outline-none focus:border-forest-500"
              placeholder="Min"
            />
            <input
              type="number"
              max={3000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-2 py-1.5 bg-cream-50 border border-cream-300 rounded-lg text-xs focus:outline-none focus:border-forest-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="text-xs text-forest-600 hover:underline font-medium"
      >
        Reset all filters
      </button>
    </>
  );

  return (
    <div className="section-pad py-8 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Shop' }]} />

      <div className="mb-6">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-forest-700 mb-2">Shop All Products</h1>
        <p className="text-sm text-ink-400">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 space-y-6 bg-cream-50 rounded-2xl p-5 shadow-soft border border-cream-200">
            <FilterContent />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter toggle + sort */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-cream-50 border border-cream-300 rounded-full text-sm font-medium text-ink-600 hover:bg-cream-200 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs text-ink-400 hidden sm:block">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2.5 bg-cream-50 border border-cream-300 rounded-full text-sm text-ink-600 focus:outline-none focus:border-forest-500 cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-ink-300" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-ink-600 mb-2">No products found</h3>
              <p className="text-sm text-ink-400 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button onClick={resetFilters} className="btn-primary">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-800/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-cream-100 shadow-lift overflow-y-auto animate-slide-down p-5 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-lg font-bold text-ink-700">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-cream-200">
                <X className="w-5 h-5 text-ink-600" />
              </button>
            </div>
            <FilterContent />
            <button onClick={() => setShowFilters(false)} className="btn-primary w-full">
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
