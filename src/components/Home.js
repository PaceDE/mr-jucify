// src/components/Home.js

import React from "react";
import NavigationHeader from "./NavigationHeader";
import Header from "./Header";
import Banner from "./blocks/Banner";
import SmallBanner from "./blocks/SmallBanner";
import ItemSlider from "./blocks/ItemSlider";
import ShopByCategory from "./blocks/ShopByCategory";
import Deal from "./blocks/Deal";
import Summary from "./blocks/Summary";
import ContactBlock from "./blocks/ContactBlock";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="home-page">
      <Header/>
      <NavigationHeader/>
      <Banner />
      <SmallBanner />
      
      <div className="mt-10">
        <h2 className="relative text-4xl font-semibold text-center">
          <span className="border-b-[5px] border-[#679509]">Featured Products</span>
        </h2>
        <ItemSlider />
      </div>

      <div className="mt-10">
        <h2 className="relative text-4xl font-semibold text-center mb-10">
          <span className="border-b-[5px] border-[#679509]">Shop By Category</span>
        </h2>
        <ShopByCategory />
      </div>
    
      <div className="my-10">
        <h2 className="relative text-4xl font-semibold text-center">
          <span className="border-b-[5px] border-[#679509]">Newest Products</span>
        </h2>
        <ItemSlider />
      </div>

      <div className="mb-12">
        <Deal />
      </div>

      <Summary />

      <ContactBlock />

      <Footer />


    </div>
    
  );
};

export default Home;