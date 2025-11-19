import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./frontend/page/Home";
import About from "./frontend/page/About";
import Shop from "./frontend/page/Shop";
import Blog from "./frontend/page/Blog";
import Contact from "./frontend/page/Contact";
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
import { ToastContainer } from "react-toastify";
import Login from "./frontend/page/Login";
import Register from "./frontend/page/Register";
import PrivateRoute from "./frontend/components/PrivateRoute";
import AuthProvider from "./context/AuthContext";


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

  return (
    <BrowserRouter>
      <ProductProvider>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPage />}>
                {/* Default Page (when /admin is visited) */}
                <Route index element={<RecentActivity />} />

                {/* Nested Routes inside AdminPage */}
                <Route path="product/create" element={<CreateProduct />} />
                <Route path="product/update/:pId" element={<UpdateProduct />} />
                <Route path="product/action" element={<ProductAction />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/category/:cname" element={<Shop />} />
                <Route path="/shop/tag/:tname" element={<Shop />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Route>

              <Route path="/about" element={<About />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />

            </Routes>
          </Layout>
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
