import React, { useState, useEffect } from "react";
import ItemBox from "./ItemBox";
import { useProduct } from "../../../context/ProductContext";
import { useParams } from "react-router-dom";
import Modal from "../Modal";
import { useCart } from "../../../context/CartContext";

const itemsPerPage = 6;

const LeftBoxWrapper = () => {
  const { items, loading, error } = useProduct();
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedSorting, setSelectedSorting] = useState("0");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectItem] = useState(null);
  const { addToCart } = useCart();
  const { cname, tname } = useParams();
  const currentPath = window.location.pathname;

  useEffect(() => {
    setSelectedSorting("0");
    setCurrentPage(1);

    if (currentPath.startsWith("/shop/category") && cname) {
      if (cname !== "All Products") {
        const categorizedItems = items.filter((item) =>
          item.category.some((category) =>
            category.toLowerCase().includes(cname.toLowerCase()),
          ),
        );
        setFilteredItems(categorizedItems);
      } else {
        setFilteredItems(items);
      }
    } else if (currentPath.startsWith("/shop/tag") && tname) {
      const taggedItems = items.filter((item) =>
        item.tags.some((tag) =>
          tag.toLowerCase().includes(tname.toLowerCase()),
        ),
      );
      setFilteredItems(taggedItems);
    } else {
      setFilteredItems(items);
    }
  }, [items, currentPath, cname, tname]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const sortByName = () => {
    const sortedItems = [...filteredItems].sort((a, b) =>
      a.pName.localeCompare(b.pName),
    );
    setFilteredItems(sortedItems);
    setCurrentPage(1);
    setSelectedSorting(1);
  };

  const sortByPrice = () => {
    const sortedItems = [...filteredItems].sort((a, b) => a.price - b.price);
    setFilteredItems(sortedItems);
    setCurrentPage(1);
    setSelectedSorting(2);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    if (option === "1") {
      sortByName();
    } else if (option === "2") {
      sortByPrice();
    } else {
      setFilteredItems(items);
      setCurrentPage(1);
      setSelectedSorting(0);
    }
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const startItem = startIndex + 1;
  const endItem = startIndex + currentItems.length;
  const totalItems = filteredItems.length;

  const handleQuickView = (item) => {
    setSelectItem(item);
  };

  const handleModalClose = () => {
    setSelectItem(null);
  };

  return (
    <>
      <div className="top-bar">
        <div className="result-no">
          <p>
            Showing {startItem || 0}-{endItem} of {totalItems} Results
          </p>
        </div>
        <div className="sorting">
          <select
            className="default-sorting"
            id="sorting-options"
            name="sortingOptions"
            value={selectedSorting}
            onChange={handleSort}
          >
            <option value="0">Default Sorting</option>
            <option value="1">Sort By Name</option>
            <option value="2">Sort By Price</option>
          </select>
        </div>
      </div>

      <div className="item-box-wrapper">
        {currentItems.map((item) => (
          <ItemBox
            key={item.pId}
            imgSrc={item.imgSrc}
            title={item.pName}
            price={item.price}
            originalPrice={item.originalPrice}
            id={item.pId}
            onQuickView={handleQuickView}
            item={item}
          />
        ))}
        {selectedItem && (
          <Modal
            {...selectedItem}
            key={selectedItem.pId}
            addToCart={addToCart}
            onClose={handleModalClose}
          />
        )}
      </div>

      <div className="pagination-control">
        <div className="mb-3">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#60; Previous
          </button>
          {pages.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`${currentPage === num ? "active" : ""}`}
            >
              {num}
            </button>
          ))}
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
