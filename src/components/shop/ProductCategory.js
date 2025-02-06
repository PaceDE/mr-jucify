import React from "react";
 const categories=[
          "Fruits",
          "Salad",
          "Vegetables",
          "Sea Food",
          "Fresh Meat",
          "Health Products",
        ];

const ProductCategory = () => {
  return (
    <div className="product-category">
      <div className="text">
        <h6>Products Category</h6>
      </div>
      <div className="category-list">
        {categories.map((category, index) => (
          <a href="/" key={index}>
            <li>+ {category}</li>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
