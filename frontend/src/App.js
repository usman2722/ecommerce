import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboardNew from './pages/AdminDashboardNew';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminBanners from './pages/AdminBanners';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminSignupPage from './pages/AdminSignupPage';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Update cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <>
      {!location.pathname.startsWith('/admin') && <Header cartCount={cartCount} />}
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200 pb-12">
        <main className="py-3">
          <Routes>
            <Route path="/" element={<HomePage onCartChange={updateCartCount} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage onCartChange={updateCartCount} />} />
            <Route path="/checkout" element={<CheckoutPage onCartChange={updateCartCount} />} />

            {/* Admin Panel - all pages use new layout, dashboard is default */}
            <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboardNew /></PrivateRoute>} />
            <Route path="/admin/dashboard" element={<PrivateRoute adminOnly={true}><AdminDashboardNew /></PrivateRoute>} />
            <Route path="/admin/products" element={<PrivateRoute adminOnly={true}><AdminProducts /></PrivateRoute>} />
            <Route path="/admin/orders" element={<PrivateRoute adminOnly={true}><AdminOrders /></PrivateRoute>} />
            <Route path="/admin/products/:id/edit" element={<PrivateRoute adminOnly={true}><AdminEditProduct /></PrivateRoute>} />
            <Route path="/admin/products/new" element={<PrivateRoute adminOnly={true}><AdminAddProduct /></PrivateRoute>} />
            <Route path="/admin/banners" element={<PrivateRoute adminOnly={true}><AdminBanners /></PrivateRoute>} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin-signup" element={<AdminSignupPage />} />

            <Route path="/categories" element={<CategoriesPage onCartChange={updateCartCount} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
      {!location.pathname.startsWith('/admin') && <Footer />}
      <ScrollToTop />
    </>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
