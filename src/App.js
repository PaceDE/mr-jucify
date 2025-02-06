import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Shop from "./components/Shop";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Header from "./components/Header";
import NavigationHeader from "./components/NavigationHeader";
import Footer from "./components/Footer";
import { ProductProvider } from "./context/ProductContext";

const App=()=> {

  return (
    <BrowserRouter>
      <ProductProvider>
        <Header />
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/category/:cname" element={<Shop />} />
          <Route path="/shop/tag/:tname" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
