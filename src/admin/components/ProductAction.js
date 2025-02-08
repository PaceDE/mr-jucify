import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

const ProductAction = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(""); // Success/Error message
  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/getproducts"
      );
      setProducts(response.data);
    } catch (error) {
      setMessage("Failed to load products. ❌");
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (productId,productName) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/deleteproduct/${productId}`
      );

      if (response.status === 200) {
        setMessage("Product deleted successfully! ✅");
        await axios.post("http://localhost:5000/api/activity", {
          action: "Product Deleted",
          entity: `Product ID: ${productId}, Product Name: ${productName}`,
        });

        setTimeout(()=>{
            setMessage("");
        },4000)
        // Remove deleted product from state
        setProducts(products.filter((product) => product.pId !== productId));
      } else {
        setMessage("Failed to delete product. ❌");
        setTimeout(() => {
          setMessage("");
        }, 4000);
        
      }
    } catch (error) {
      setMessage("Server error. Please try again later. ❌");
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
  };

  // Load products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 h-[100%] text-white p-6 rounded-lg">
      {products.length!==0 ? (
        <h2 className="text-2xl font-bold mb-4">List of all products</h2>
      ) : (
        <h2 className="text-2xl font-bold mb-4">No Products to show</h2>
      )}
      {message && <p>{message}</p>}
      <table className="w-full border-collapse border border-gray-700 mt-4 text-xs">
        <thead>
          <tr className="bg-gray-800 text-white text-center ">
            <th className="border border-gray-700 p-2">S.N</th>
            <th className="border border-gray-700 p-2">Product ID</th>
            <th className="border border-gray-700 p-2">Product Name</th>
            <th className="border border-gray-700 p-2">Price (Rs)</th>
            <th className="border border-gray-700 p-2 ">Original Price (Rs)</th>
            <th className="border border-gray-700 p-2 max-w-14">Category</th>
            <th colSpan="2" className="border border-gray-700 p-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.pId}
              className="border border-gray-700 text-center"
            >
              <td className="border border-gray-700 p-2">{index + 1}</td>
              <td className="border border-gray-700 p-2">{product.pId}</td>
              <td className="border border-gray-700 p-2">{product.pName}</td>
              <td className="border border-gray-700 p-2">${product.price}</td>
              <td className="border border-gray-700 p-2">
                {product.originalPrice}
              </td>
              <td className="border border-gray-700 p-2 max-w-20">
                {product.category.join(" , ")}
              </td>
              <td className="border border-gray-700 p-2">
                <button
                  onClick={() =>
                    handleDeleteProduct(product.pId, product.pName)
                  }
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                >
                  Delete <i className="fa-solid fa-trash-can ml-2"></i>
                </button>
              </td>
              <td>
                <Link
                  to={`/admin/product/update/${product.pId}`}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
                >
                  Update <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAction;
