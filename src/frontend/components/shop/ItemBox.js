import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';

const ItemBox = ({ imgSrc, title, price, originalPrice, id }) => {
  const {setWishlist,wishlist,isLoading} = useAuth();
  const addWishList = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/product/addWishlist/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
       console.log("Response data:", data);

      if (data.msg) {
        setWishlist(data.wishlist);
        toast.success(data.msg)
      }

      else {
        toast.error("Failed to add to Wishlist");
      }
    } catch (error) {
      toast.error("Failed to add to Wishlist");
    }
  }
  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="item-box-container">
      <div className="item-box">
        <div className="item-image">
          <img src={imgSrc} alt={title} />
          <div className="whishlist-heart" onClick={() => { addWishList(id) }}>
            <i className="fa fa-heart-o"></i>
          </div>
          <div className="text-box">
            <div className="Cart">
              <a href="/">Add to cart</a>
              <a href="/">
                <div className="black">
                  <i className="bi bi-cart-fill" style={{ fontSize: '20px' }}></i>
                </div>
              </a>
            </div>
            <div className="Quick-view">
              <a href="/">Quick View</a>
              <a href="/" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div className="black">
                  <i className="bi bi-eye-fill" style={{ fontSize: '20px' }}></i>
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
