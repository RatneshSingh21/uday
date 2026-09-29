export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  size: string;
  tagline: string;
  description: string;
  fullDescription: string;
  ingredients: string[];
  benefits: string[];
  category: 'capsules' | 'powder' | 'oil' | 'majun' | 'kit';
  categoryLabel: string;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  comboItems?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};
