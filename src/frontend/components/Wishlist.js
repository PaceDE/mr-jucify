import React from "react";
import Banner from "./Banner";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Wishlist = () => {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <>
      <Banner pageTitle={"Wishlist"} />
      <div className="w-3/5 mx-auto my-[100px] flex justify-center">
        <div className="table w-full">
          <div className="table-header-group">
            <div className="table-row font-semibold">
              <div className="table-cell text-center">Image</div>
              <div className="table-cell text-center ">Product Name</div>
              <div className="table-cell text-center">Price</div>
              <div className="table-cell text-center">Status</div>
              <div className="table-cell text-center">Action</div>
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
                  <div className="table-cell align-middle">
                    <button
                      className="px-4 py-3 bg-[#679509] text-white rounded-full text-sm font-semibold hover:bg-[#2a660a] duration-200 ease-linear"
                      onClick={() => addToCart(d)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="table-cell align-middle">
                    <i
                      className="fa fa-times text-2xl duration-200 ease-linear hover:text-[#679509] hover:rotate-90 cursor-pointer ml-2"
                      aria-hidden="true"
                      onClick={() => removeFromWishlist(d.id, d.name)}
                    ></i>
                  </div>
                </div>
              ))
            ) : (
              <div className="table-row">
                <div
                  className="table-cell text-center py-4 align-middle"
                  colSpan="5"
                >
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
