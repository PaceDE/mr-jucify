import React, { useState } from "react";
import LogoImg from "../images/logo.png";
import "../css/Header.css"; 

const categories = [
  "Select Category",
  "Vegetables",
  "Fruits",
  "Salads",
  "Fish & Seafood",
  "Fresh Meat",
  "Health Product",
  "Butter & Eggs",
];

const Logo = () => (
  <div className="w-1/6 flex justify-start ml-6 lg:w-1/12">
    <img src={LogoImg} alt="logo" className="w-full" />
  </div>
);

const CategorySelect = () => {
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative category-container">
      <button className="category-btn" onClick={() => setIsOpen(!isOpen)}>
        {selectedCategory}
        <i className={`bi bi-caret-${isOpen ? "up" : "down"}-fill ml-2`}></i>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {categories.map((category, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => {
                setSelectedCategory(category);
                setIsOpen(false);
              }}
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
  return (
    <header className="header-container">
      <Logo />
      <CategorySelect />
      <SearchBar />
      <ContactInfo icon="bi-telephone-inbound" text="+977xxxxxxxxxxx" />
      <ContactInfo icon="bi-question-circle" text="Help & More" />
      
    </header>
  );
};

export default Header;
