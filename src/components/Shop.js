import React from "react";
import { useEffect } from "react";
import Banner from "./Banner";
import LeftBoxWrapper from "./shop/LeftBoxWrapper";
import TopItems from "./shop/TopItems";
import SearchBox from "./shop/SearchBox";
import ProductCategory from "./shop/ProductCategory";
import ProductTags from "./shop/ProductTags";



import "../css/Shop.css";
import { useLocation } from "react-router-dom";
import { useProduct } from "../context/ProductContext";


const Shop = () => {
  const {setSelectedCategory} = useProduct();

  const location=useLocation();
  useEffect(() => {
    // If the location is not /shop or its child paths, reset the selectedCategory
    if (!location.pathname.startsWith("/shop")) {
      setSelectedCategory("All Products");
    }
  }, [location, setSelectedCategory]);
  
  return (
    <>
      <Banner pageTitle={"Shop"} />
      <section className="main-body">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 col-md-12">
              <div className="container-left">
                <LeftBoxWrapper />
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="miscellaneous">
                <SearchBox />
                <ProductCategory/>
                <TopItems />
                <ProductTags/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
