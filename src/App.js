import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./frontend/components/Home";
import About from "./frontend/components/About";
import Shop from "./frontend/components/Shop";
import Blog from "./frontend/components/Blog";
import Contact from "./frontend/components/Contact";
import Header from "./frontend/components/Header";
import AdminPage from "./admin/AdminPage";
import NavigationHeader from "./frontend/components/NavigationHeader";
import Footer from "./frontend/components/Footer";
import CreateProduct from "./admin/components/CreateProduct";
import UpdateProduct from "./admin/components/UpdateProduct";
import ProductAction from "./admin/components/ProductAction";
import RecentActivity from "./admin/components/RecentActivity";
import { ProductProvider } from "./context/ProductContext";
import Wishlist from "./frontend/components/Wishlist";
import Cart from "./frontend/components/Cart";
import { CartProvider, useCart } from "./context/CartContext";
import Login from "./frontend/components/Login";
import Notification from "./frontend/components/Notification";
import Register from "./frontend/components/Register";
import Checkout from "./frontend/components/Checkout";

const App = () => {
  const Layout = ({ children }) => {
    const location = useLocation();

    // Hide Header and Footer on specific routes
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
      <>
        {!isAdminPage && <Header />}
        {!isAdminPage && <NavigationHeader />}
        {children}
        {!isAdminPage && <Footer />}
      </>
    );
  };

  const NotificationWrapper = () => {
    const { notification, clearNotification } = useCart();

    return (
      <>
        {notification && (
          <Notification
            message={notification.message}
            onClose={clearNotification}
          />
        )}
      </>
    );
  };

  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <Layout>
            <NotificationWrapper />
            <Routes>
              <Route path="/admin" element={<AdminPage />}>
                {/* Default Page (when /admin is visited) */}
                <Route index element={<RecentActivity />} />
                {/* Nested Routes inside AdminPage */}
                <Route path="product/create" element={<CreateProduct />} />
                <Route path="product/update/:pId" element={<UpdateProduct />} />
                <Route path="product/action" element={<ProductAction />} />
              </Route>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/category/:cname" element={<Shop />} />
              <Route path="/shop/tag/:tname" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Layout>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;
