import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import LogoImg from "../../images/logo.png";
import "../css/Header.css";
import { useAuth } from "../../context/AuthContext";

const Logo = () => (
  <div className="w-1/6 flex justify-start ml-6 lg:w-1/12">
    <img src={LogoImg} alt="logo" className="w-full" />
  </div>
);

const CategorySelect = () => {
  const { selectedCategory, setSelectedCategory, allCategory } = useProduct();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!currentPath.startsWith("/shop/category")) {
      setSelectedCategory("All Products");

    }
  }, [location, setSelectedCategory])


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    const currentPath = window.location.pathname;
    if (category !== "All Products") {
      navigate(`/shop/category/${category.toLowerCase()}`); // Navigate with category in URL
    }
    else if (currentPath.startsWith("/shop") && currentPath !== ('/shop')) {
      navigate('/shop');
    }
  };


  return (
    <div className="relative category-container">
      <button className="category-btn" onClick={() => setIsOpen(!isOpen)}>
        {selectedCategory}
        <i className={`bi bi-caret-${isOpen ? "up" : "down"}-fill ml-2`}></i>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li

            className="dropdown-item"
            onClick={() => handleCategoryClick("All Products")}
          >
            All Products
          </li>
          {allCategory.map((category, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SearchBar = () => (
  <div className="search-container">

    <input
      type="text"
      placeholder="Search Products..."
      className="search-input"
      name="search"
    />
    <button className="search-btn">
      <i className="bi bi-search"></i>
    </button>


  </div>
);

const ContactInfo = ({ icon, text }) => (
  <div className="contact-info">
    <i className={`bi ${icon} mr-2`}></i>
    <span>{text}</span>
  </div>
);



const Header = () => {
  const { isLoggedIn, isLoading, logout } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <header className="header-container">
      <Logo />
      <CategorySelect />
      <SearchBar />
      {!isLoggedIn ? (
        <div className="flex gap-2">
          <Link to='/register'>
            <button type="button" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2">
              Register
            </button>
          </Link>
          <Link to='/login'>
            <button type="button" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <div
          onClick={logout}
          className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 cursor-pointer"
        >
          Logout
        </div>
      )}
    </header>
  );
};

export default Header;
