// src/components/Offcanvas.js
import React from "react";
import CartItem from "./CartItem"; // We'll create this component for each product in the cart

const Offcanvas = () => {
  return (
    <div
      className="offcanvas fixed inset-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-full sm:translate-x-0 w-[340px] right-0"
      tabIndex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasWithBothOptionsLabel"
      data-bs-scroll="true"
    >
      {/* Offcanvas Header */}
      <div className="offcanvas-header w-full h-16 bg-gray-800 p-4 relative">
        <div className="minicart-header flex items-center space-x-2 text-yellowgreen">
          <i className="bi bi-bag-fill text-xl text-yellowgreen"></i>
          <span className="font-bold text-lg">3 Items</span>
        </div>
        <button
          type="button"
          className="close-button absolute right-4 bottom-2 text-3xl text-white hover:text-green-600"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Offcanvas Body */}
      <div className="offcanvas-body p-4 space-y-4">
        {/* Cart Items */}
        <CartItem imgSrc="./images/10.png" name="Carrot" price="Rs 99 * 5" />
        <CartItem imgSrc="./images/11.png" name="Turnip" price="Rs 149 * 3" />
        <CartItem imgSrc="./images/12.png" name="Tomato" price="Rs 99 * 10" />

        {/* Cart Summary */}
        <div className="minicart-bottom mt-4 border-t border-gray-200 pt-4">
          <h6 className="font-semibold text-xl text-green-600">
            Total: <span className="font-bold text-green-800">Rs 1932</span>
          </h6>
          <div className="view-cart mt-2">
            <a
              href="cart.html"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View Cart
            </a>
          </div>
          <div className="proceed-checkout mt-2">
            <a
              href="checkout.html"
              className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-full font-semibold"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;
