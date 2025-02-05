import React from "react";

const CartItem = ({ imgSrc, name, price }) => {
  return (
    <div className="minicart-products flex items-center p-4 border-b border-gray-200">
      <div className="minicart-image w-1/3 h-20 overflow-hidden">
        <img src={imgSrc} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="minicart-detail w-2/3 h-16 relative pl-4">
        <a
          className="details block font-semibold text-lg text-gray-700 hover:text-green-600"
          href="/"
        >
          {name}
        </a>
        <span className="price font-medium text-sm text-gray-600">{price}</span>
        <button
          type="button"
          className="remove-item absolute top-0 right-0 text-2xl text-gray-400 hover:text-green-600"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CartItem;
