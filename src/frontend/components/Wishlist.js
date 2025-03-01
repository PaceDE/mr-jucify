import React from "react";
import Banner from "./Banner";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Wishlist = () => {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist, notification, clearNotification } =
    useWishlist();
  console.log(wishlistItems); // Add this line

  return (
    <>
      <Banner pageTitle={"wishlist"} />
      {notification && (
        <div
          className="fixed top-4 right-4 bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Notification:</strong>
          <span className="block sm:inline">{notification.message}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={clearNotification}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div className="w-3/5 mx-auto my-[100px] flex justify-center">
        <div className="table w-full">
          <div className="table-header-group">
            <div className="table-row font-semibold">
              <div className="table-cell">Image</div>
              <div className="table-cell">Product Name</div>
              <div className="table-cell">Price</div>
              <div className="table-cell">Stock Status</div>
              <div className="table-cell">Action</div>
            </div>
          </div>
          <div className="table-row-group">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((d) => (
                <div className="table-row" key={d.id}>
                  <div className="table-cell">
                    <img src={d.image} alt={d.name} className="w-24 h-24" />
                  </div>
                  <div className="table-cell align-middle">{d.name}</div>
                  <div className="table-cell align-middle">Rs.{d.price}</div>
                  <div className="table-cell align-middle">In Stock</div>{" "}
                  {/* Assuming all wishlist items are in stock */}
                  <div className="table-cell align-middle">
                    <button
                      className="px-4 py-3 bg-[#679509] text-white rounded-full text-sm font-semibold hover:bg-[#2a660a] duration-200 ease-linear"
                      onClick={() => addToCart(d)}
                    >
                      Add to Cart
                    </button>
                    <i
                      className="fa fa-times text-2xl duration-200 ease-linear hover:text-[#679509] hover:rotate-90 cursor-pointer ml-2"
                      aria-hidden="true"
                      onClick={() => removeFromWishlist(d.id)}
                    ></i>
                  </div>
                </div>
              ))
            ) : (
              <div className="table-row">
                <div className="table-cell text-center py-4" colSpan="5">
                  Your wishlist is empty.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
