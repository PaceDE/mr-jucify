import React from "react";
import { useProduct } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";



const ProductTags = () => {

  const{allTags,setSelectedCategory,setCurrentTag}=useProduct();
  const navigate=useNavigate();

  const handleTagSelect = (tag)=>{
    setCurrentTag(tag);
    setSelectedCategory("All Products");
    navigate(`/shop/tag/${tag.toLowerCase()}`);
  }
  return (
    <div className="products-tag">
      <div className="text">
        <h6>Product Tags</h6>
      </div>

      <div className="tag-name">
        {allTags.map((tag, index) => (
          <button key={index} onClick={()=>{handleTagSelect(tag)}}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTags;
