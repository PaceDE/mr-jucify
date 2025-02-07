import React from "react";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Shop from "./components/Shop";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Header from "./components/Header";
import AdminPage from "./components/AdminPage";
import NavigationHeader from "./components/NavigationHeader";
import Footer from "./components/Footer";
import CreateProduct from "./components/admin/CreateProduct";
import ChangeProduct from "./components/admin/ChangeProduct";
import DeleteProduct from "./components/admin/UpdateProduct";
import { ProductProvider } from "./context/ProductContext";
import RecentActivity from "./components/admin/RecentActivity";

const App=()=> {

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
        <Layout>
          <Routes>
            <Route path="/admin" element={<AdminPage />}>
              {/* Default Page (when /admin is visited) */}
              <Route index element={<RecentActivity />} />

              {/* Nested Routes inside AdminPage */}
              <Route path="product/create" element={<CreateProduct />} />
              <Route path="product/change" element={<ChangeProduct />} />
              <Route path="product/delete" element={<DeleteProduct />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/category/:cname" element={<Shop />} />
            <Route path="/shop/tag/:tname" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
