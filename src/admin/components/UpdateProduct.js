import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { pId } = useParams();

  const [product, setProduct] = useState({
    pId: "",
    pName: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    tags: "",
    imgSrc: "",
  });
  const [message, setMessage] = useState(""); // For success/error messages

  // Fetch the product details based on the pId
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/getproducts/${pId}`
        );
        setProduct(response.data);
      } catch (error) {
        setMessage("Failed to fetch product details. ❌");
      }
    };

    fetchProductDetails();
  }, [pId]); // Runs only when pId changes

  if (!product) {
    return <p className="text-red-400">{message}</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typeof product.category === "string") {
      product.category = product.category
        .replace(/\s+/g, " ")
        .split(",")
        .map((item) => item.trim());
    }
    if (typeof product.tags === "string") {
      product.tags = product.tags
        .replace(/\s+/g, " ")
        .split(",")
        .map((item) => item.trim());
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/product/updateproduct/${product.pId}`,
        product
      );
      if (response.status === 200) {
        setMessage("Product updated successfully! ✅");
        await axios.post("http://localhost:5000/api/activity", {
          action: "Product Updated",
          entity: `Product ID: ${product.pId}, Product Name: ${product.pName}`,
        });
        setTimeout(() => {
          navigate("/admin");
        }, 3000);
      } else {
        setMessage("Failed to update product. ❌");
      }
    } catch (error) {
      setMessage("Failed to update product. ❌");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Id */}
        <div>
          <label className="block">
            Product Id: <span className="text-gray-500"> (Read Only)</span>
          </label>
          <input
            type="number"
            name="pId"
            required
            value={product.pId}
            className="w-full p-2 bg-gray-500 border border-gray-700 rounded-md"
            readOnly
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block">Product Name:</label>
          <input
            type="text"
            name="pName"
            required
            value={product.pName}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
            onChange={handleChange}
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block">Description:</label>
          <textarea
            name="description"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block">Price ($):</label>
          <input
            type="number"
            name="price"
            required
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        {/* Original Price */}
        <div>
          <label className="block">Original Price ($):</label>
          <input
            type="number"
            name="originalPrice"
            required
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
            value={product.originalPrice}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block">Category (comma separated):</label>
          <input
            type="text"
            name="category"
            required
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
            value={product.category}
            onChange={handleChange}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block">Tags (comma separated):</label>
          <input
            type="text"
            name="tags"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
            value={product.tags}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-bold"
        >
          Update Product
        </button>
        {message && <p className={"text-green-400"}>{message}</p>}
      </form>
    </div>
  );
};

export default UpdateProduct;
