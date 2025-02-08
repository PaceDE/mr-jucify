import React, { useState, useEffect } from "react";
import axios from "axios";
import { useActivity } from "../../context/ActivityContext";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(""); // Success/Error message
  const {handleActivity} = useActivity();

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
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/deleteproduct/${productId}`
      );

      if (response.status === 200) {
        setMessage("Product deleted successfully! ✅");
        const productName = products.find(
          (product) => product.pId === productId
        )?.pName;
        handleActivity("product Deleted", `Product Id:${productId} Product name:${productName}`);

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
      <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
      {message && <p>{message}</p>}
          <table className="w-full border-collapse border border-gray-700 mt-4">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 p-2">S.N</th>
                <th className="border border-gray-700 p-2">Product ID</th>
                <th className="border border-gray-700 p-2">Product Name</th>
                <th className="border border-gray-700 p-2">
                  Original Price ($)
                </th>
                <th className="border border-gray-700 p-2">Price ($)</th>
                <th className="border border-gray-700 p-2">Action</th>
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
                  <td className="border border-gray-700 p-2">
                    {product.pName}
                  </td>
                  <td className="border border-gray-700 p-2">
                    ${product.originalPrice}
                  </td>
                  <td className="border border-gray-700 p-2">
                    ${product.price}
                  </td>
                  <td className="border border-gray-700 p-2">
                    <button
                      onClick={() => handleDeleteProduct(product.pId)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default DeleteProduct;
