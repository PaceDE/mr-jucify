import React from "react";
import NavigationHeader from "./NavigationHeader";
import Header from "./Header";
import Banner from "./Banner";
import LeftBoxWrapper from "./shop/LeftBoxWrapper";
import TopItems from "./shop/TopItems";
import SearchBox from "./shop/SearchBox";
import ProductCategory from "./shop/ProductCategory";
import ProductTags from "./shop/ProductTags";

import "../css/Shop.css";


const Shop = () => {
  return (
    <>
      <Header />
      <NavigationHeader />
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
                <ProductCategory />
                <TopItems />
                <ProductTags />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
