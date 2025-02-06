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

function App() {
  return (
    <BrowserRouter>
    <Header />
    <NavigationHeader />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
