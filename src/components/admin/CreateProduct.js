import React, { useState} from "react";
import axios from "axios";
import { useActivity } from "../../context/ActivityContext";

const CreateProduct = () => {

  

  const [message, setMessage] = useState(""); // Success/Error message
  const[success,setSuccess] = useState(false);
  const{ handleActivity} =useActivity();
  

  // Handle form input changes


  // Handle image upload to Cloudinary
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    const cloudName = "dcvrqpqif";
    const myPreset = "mr-jucify";
    formData.append("file", imageFile);
    formData.append("upload_preset", myPreset); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );

      if (response.data.secure_url) {
        return response.data.secure_url; // Return the Cloudinary image URL
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Image upload failed");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Upload image to Cloudinary
    let imgUrl = "";
    if (form.image.files[0]) {
      try {
        imgUrl = await uploadImage(form.image.files[0]); // Upload image and get URL
      } catch (error) {
        setMessage("Image upload failed. Please try again. ❌");
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }
    }


    const productData = {
      pId: form.pId.value,
      pName: form.pName.value,
      description: form.description.value,
      price: form.price.value,
      originalPrice: form.originalPrice.value,
      category: form.category.value.replace(/\s+/g, ' ').split(",").map((item) => item.trim()), // Convert to array
      tags: form.tags.value.replace(/\s+/g, ' ').split(",").map((item) => item.trim()), // Convert to array
      imgSrc: imgUrl, // Use Cloudinary URL
    };



    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/createproduct",
        productData
      );

      if (response.status===201) {
        setMessage(response.data.message + "✅");
        setSuccess(true);
        handleActivity(
          "Product Created",
          `Product id : ${productData.pId} Product name : ${productData.pName}`
        );
        setTimeout(() => {
          setMessage("");
          setSuccess(false);
        }, 4000);
        form.reset();
      } else {
        setMessage(`Error: ${response.data.message} ❌`);
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

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Id */}
        <div>
          <label className="block">Product Id:</label>
          <input
            type="number"
            name="pId"
            required
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block">Product Name:</label>
          <input
            type="text"
            name="pName"
            required
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block">Description:</label>
          <textarea
            name="description"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
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
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block">Tags (comma separated):</label>
          <input
            type="text"
            name="tags"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block">Product Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-bold"
        >
          Create Product
        </button>
        {message && <p className={success?"text-green-400":"text-red-600"}>{message}</p>}
      </form>
    </div>
  );
};

export default CreateProduct;
