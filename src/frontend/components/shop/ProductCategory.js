import React from "react";
import { useProduct } from "../../../context/ProductContext"; 
import { useNavigate } from "react-router-dom";


const ProductCategory = () => {
  const { setSelectedCategory, allCategory} = useProduct();
  const navigate=useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if(category==="All Products")
    { 
      navigate(`/shop`);
    }
    else
    {
      navigate(`/shop/category/${category.toLowerCase()}`);
    }
  };

  return (
    <div className="product-category">
      <div className="text">
        <h6>Products Category</h6>
      </div>
      <div className="category-list ">
        <button
         
          onClick={() => handleCategoryClick("All Products")} // Handle category click directly
        >
          &nbsp; All Products &nbsp;
        </button>
        {allCategory.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)} // Handle category click directly
          >
            &nbsp; {category} &nbsp;
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
