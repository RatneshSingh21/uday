import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Product } from '@/types';

interface WishlistContextValue {
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'earthveda-wishlist';

function loadWishlist(): string[] {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(loadWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
