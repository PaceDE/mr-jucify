// src/components/Home.js

import React from "react";
import NavigationHeader from "./NavigationHeader";
import Header from "./Header";
import Banner from "./blocks/Banner";
import SmallBanner from "./blocks/SmallBanner";
import ItemSlider from "./blocks/ItemSlider";

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
    </div>
  );
};

export default Home;
