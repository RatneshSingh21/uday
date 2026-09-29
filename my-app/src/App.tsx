import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgeGate from '@/components/AgeGate';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AgeGate />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
