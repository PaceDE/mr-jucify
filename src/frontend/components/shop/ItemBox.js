import React from "react";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const ItemBox = ({ imgSrc, title, price, originalPrice, id }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = () => {
    const item = {
      id: id,
      name: title,
      price: price,
      image: imgSrc,
    };
    addToCart(item);
  };

  const handleAddToWishlist = () => {
    const item = {
      id: id,
      name: title,
      price: price,
      image: imgSrc,
    };
    addToWishlist(item);
  };

  return (
    <div className="item-box-container">
      <div className="item-box">
        <div className="item-image">
          <img src={imgSrc} alt={title} />
          <button onClick={handleAddToWishlist}>
            <div className="whishlist-heart">
              <i className="fa fa-heart-o"></i>
            </div>
          </button>
          <div className="text-box">
            <div className="Cart">
              <button onClick={handleAddToCart} className="text-white">
                Add to cart
              </button>
              <div className="black" style={{ pointerEvents: "none" }}>
                <i className="bi bi-cart-fill" style={{ fontSize: "20px" }}></i>
              </div>
            </div>
            <div className="Quick-view">
              <a href="/">Quick View</a>
              <a
                href="/"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="black">
                  <i
                    className="bi bi-eye-fill"
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="item-detail">
          <span>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </span>
          <a href="details.html">
            <h3>{title}</h3>
          </a>
          <span className="item-price">
            Rs {price} <h6>&nbsp; Rs {originalPrice}</h6>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemBox;
