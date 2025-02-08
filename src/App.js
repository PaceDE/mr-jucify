import React from "react";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
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
import ChangeProduct from "./admin/components/ChangeProduct";
import DeleteProduct from "./admin/components/DeleteProduct";
import RecentActivity from "./admin/components/RecentActivity";
import { ProductProvider } from "./context/ProductContext";
import { ActivityProvider } from "./context/ActivityContext";

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
        <ActivityProvider>
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
        </ActivityProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
