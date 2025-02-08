// TopItems.js
import React from "react";
import TopItemBox from "./TopItemBox";
import Image1 from "../../../images/1.png"; // Replace with actual image paths
import Image2 from "../../../images/5.png";
import Image3 from "../../../images/7.png";
import Image4 from "../../../images/8.png";

const topItemsData = [
  { imgSrc: Image1, title: "Onion & Garlic", price: 199, originalPrice: 249 },
  { imgSrc: Image2, title: "Mushroom", price: 499, originalPrice: 549 },
  { imgSrc: Image3, title: "Acai Berry", price: 299, originalPrice: 349 },
  { imgSrc: Image4, title: "Peach", price: 299, originalPrice: 349 },
];

const TopItems = () => {
  return (
    <div className="top-items">
      <div className="text">
        <h6>Top Rated Products</h6>
      </div>
      <div className="top-content">
        {topItemsData.map((item, index) => (
          <TopItemBox
            key={index}
            imgSrc={item.imgSrc}
            title={item.title}
            price={item.price}
            originalPrice={item.originalPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default TopItems;
