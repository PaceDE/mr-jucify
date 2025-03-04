import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const ItemBox = ({
  imgSrc,
  title,
  price,
  originalPrice,
  id,
  onQuickView,
  item,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart({ id, name: title, price, image: imgSrc, quantity: 1 });
  };

  const handleAddToWishlist = () => {
    const itemToAdd = { id: id, name: title, price: price, image: imgSrc };
    addToWishlist(itemToAdd);
  };

  const handleQuickViewClick = () => {
    onQuickView(item);
  };

  const handleTitleClick = () => {
    navigate("/detail", { state: { item: item } });
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
              <button onClick={handleQuickViewClick}>
                <div className="black">
                  <i
                    className="bi bi-eye-fill"
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>
              </button>
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
          <h3 onClick={handleTitleClick} style={{ cursor: "pointer" }}>
            {title}
          </h3>
          <span className="item-price">
            Rs {price}
            <h6>Rs {originalPrice}</h6>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemBox;
