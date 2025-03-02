import React from "react";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Offcanvas = ({ total }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const navigate = useNavigate();
  return (
    <>
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
            <span className="font-bold text-lg">{totalItems} Items</span>{" "}
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
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              imgSrc={item.image}
              name={item.name}
              price={`Rs ${item.price} * ${item.quantity}`}
            />
          ))}

          <div className="minicart-bottom mt-4 border-t border-gray-200 pt-4">
            <h6 className="font-semibold text-xl text-green-600">
              Total:{" "}
              <span className="font-bold text-green-800">Rs {totalPrice}</span>{" "}
            </h6>
            <div className="view-cart mt-2">
              <button
                className="text-white hover:bg-green-700 font-semibold py-2 px-4 rounded-full bg-green-600 w-full"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </button>
            </div>
            <div className="proceed-checkout mt-2">
              <button
                className="text-white hover:bg-green-700 font-semibold py-2 px-4 rounded-full bg-green-600 w-full"
                onClick={() =>
                  navigate("/checkout", { state: { total: totalPrice } })
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offcanvas;
