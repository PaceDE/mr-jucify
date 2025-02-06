import React from "react";

const productTags = [
  "Mango",
  "Juice",
  "Apple",
  "Broccoli",
  "Juicy",
  "Green",
  "Summer",
  "Dairy",
  "Fresh",
  "Cream",
  "Juicyfy",
];

const ProductTags = () => {
  return (
    <div className="products-tag">
      <div className="text">
        <h6>Product Tags</h6>
      </div>

      <div className="tag-name">
        {productTags.map((tag, index) => (
          <a key={index} href="/">
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductTags;
