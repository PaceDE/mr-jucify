import React, { useState,useEffect } from "react";
import ItemBox from "./ItemBox";


const itemsPerPage = 6; // Display 9 items per page
const server = " http://localhost:5000";

const LeftBoxWrapper = () => {
  const [items, setItems] = useState([]); // Store fetched products
  const [filteredItems, setFilteredItems] = useState(items);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/getproducts"
        ); // Replace with your actual API endpoint
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setItems(data);
        setFilteredItems(data); // Store fetched products
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
 

  
 

  const sortByName = () => {
    const sortedItems = [...filteredItems].sort((a, b) => a.pName.localeCompare(b.pName))
    setFilteredItems(sortedItems);
  };

  const sortByPrice = () => {
    const sortedItems = [...filteredItems].sort((a,b) => a.price - b.price);
    setFilteredItems(sortedItems);
  }

  const handleSort = (e) => {
    const option = e.target.value;
    if (option === '1'){
      sortByName();
       setCurrentPage(1);
    }else if (option === '2'){
      sortByPrice();
       setCurrentPage(1);
    }
    else 
    {
       setFilteredItems(items);
        setCurrentPage(1);
      
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);
  var pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages[i] = i + 1;
  }

  // Get items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Calculate start and end items for the current page
  const startItem = startIndex + 1;
  const endItem = startIndex + currentItems.length;
  const totalItems = filteredItems.length;


  

  return (
    <>
      {/* Top Bar*/}
      <div className="top-bar">
        <div className="result-no">
          <p>
            Showing {startItem}-{endItem} of {totalItems} Results
          </p>
        </div>
        <div className="sorting">
          <select className="default-sorting" id="sorting-options" name="sortingOptions" onChange={handleSort}>
            <option value="0">
              Default Sorting
            </option>
            <option value="1" onClick={sortByName}>
              Sort By Name
            </option>
            <option value="2">
              Sort By Price
            </option>
          </select>
        </div>
      </div>

      {/* Items Wrapper*/}

      <div className="item-box-wrapper">
        {currentItems.map((item) => (
          <ItemBox
            key={item.id}
            imgSrc={`${server}${item.imgSrc}`}
            title={item.pName}
            price={item.price}
            originalPrice={item.originalPrice}
            id={item.pId}
          />
        ))}
      </div>

      {/*Paginatiton*/}
      <div className="pagination-control">
        <div className="mb-3">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#60; Previous
          </button>

          {pages.map((num,index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(num);
                }}
                className={`${currentPage === num ? "active" : ""}`}
              >
                {num}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &#62;
          </button>
        </div>
        <div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>
    </>
  );
};

export default LeftBoxWrapper;
