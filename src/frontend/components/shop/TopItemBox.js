import React from "react";

const TopItemBox = ({ imgSrc, title, price, originalPrice }) => {
  return (
    <div className="top-item-box">
      <div className="top-item-image">
        <img src={imgSrc} alt={title} style={{ width: "100%" }} />
      </div>
      <div className="top-item-detail">
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
        <span className="top-item-price">
          Rs {price} &nbsp;<h6>&nbsp; Rs {originalPrice}</h6>
        </span>
      </div>
    </div>
  );
};

export default TopItemBox;
