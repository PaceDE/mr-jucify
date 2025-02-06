import React from "react";

const SearchBox = () => {
  return (
    <div className="search-box">
      <div className="text">
        <h6>Search Productss</h6>
      </div>
      <div className="search-product">
        <form action="#">
          <input
            type="text"
            name="search"
            placeholder="Enter Keyword"
            className="object-name"
          />
          <button type="submit" className="search-button">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
