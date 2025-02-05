// src/components/Home.js

import React from "react";
import NavigationHeader from "./NavigationHeader";
import Header from "./Header";

const Home = () => {
  return (
    <div className="home-page">
      <Header/>
      <NavigationHeader/>
    </div>
  );
};

export default Home;
