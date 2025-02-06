import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "../css/NavigationHeader.css";
import Offcanvas from "./Offcanvas";

const categories = [
  "Team",
  "Cart",
  "Checkout",
  "My Account",
  "Login",
  "Register",
  "FAQ",
];
const Basket = () => {
  return (
    <a
      data-bs-toggle="offcanvas"
      href="#offcanvas"
      role="button"
      aria-controls="offcanvasWithBothOptions"
      className="basket"
    >
      <div className="icon basket ml">
        <i className="bi bi-basket2 w-5"></i>
        <div className="badge">5</div>{" "}
        {/* The circle here could be dynamic if using state */}
      </div>
    </a>
  );
};


const NavigationHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navigation-header">
      {/* Mobile Menu Toggle */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <i className="fa fa-bars text-black text-2xl"></i>
      </button>

      {/* Navigation Menu */}
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Shop
            </NavLink>
          </li>
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="dropdown-btn"
            >
              Page <span>▼</span>
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <ul className="dropdown-menu">
                {categories.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/${item.toLowerCase().replace(" ", "")}`}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Icons Section */}
      <div className="icons">
        <div className="whishlist">
          <a href="wishlist.html">
            <i className="bi bi-suit-heart"></i>
            <div className="circle">2</div>
          </a>
        </div>
        <div className="profile">
          <a href="login.html">
            <i className="bi bi-person"></i>
          </a>
        </div>
        <Basket />
        <Offcanvas />
      </div>
    </header>
  );
};

export default NavigationHeader;
