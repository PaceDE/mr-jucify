const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();


// Route 1 : Create and save Product
router.post(
  "/createproduct",
  [
    body("pId", "Product ID must be an integer").isInt().withMessage(),
    body("pName")
      .isString()
      .withMessage("Product name must be a string")
      .notEmpty()
      .withMessage("Product name is required"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("originalPrice")
      .isFloat({ min: 0 })
      .withMessage("Original price must be a positive number"),
    body("imgSrc")
      .isString()
      .withMessage("Image source must be a string")
      .notEmpty()
      .withMessage("Image source is required"),
    body("tags")
      .optional()
      .isArray()
      .withMessage("Tags must be an array of strings")
      .custom((value) => {
        if (value && !value.every((item) => typeof item === "string")) {
          throw new Error("Each tag must be a string");
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    // Check if the product already exists
    const productExist = await Product.findOne({
     imgSrc: req.body.imgSrc
    });

    if (productExist) {
      return res
        .status(400)
        .json({ errors: "The Product ID and image source must be different" });
    }

    try {
      // Create a new product instance and save
      const product = new Product(req.body);
      await product.save(); // Ensure the save is completed before sending the response

      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  }
);


// Route 2:get all products using get "/api/auth/getproducts" . No login Required
router.get(
  "/getproducts",
  async (req, res) => {
     try {
       const products = await Product.find(); // Fetch all products from MongoDB
       res.status(200).json(products); // Send the products as a response
     } catch (error) {
       console.error(error.message);
       res.status(500).send("Server error: " + error.message);
     }
  });
  router.get("/getproducts/:pId", async (req, res) => {
    const { pId } = req.params;
    try {
      const product = await Product.findOne({pId}); // Fetch all products from MongoDB
      res.status(200).json(product); // Send the products as a response
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  });





  
  

  // Function to delete image from Cloudinary
  const deleteImageFromCloudinary = async (imgUrl) => {

    const regex = /\/v\d+\//; // Matches "/v" followed by version number and "/"
    const baseUrl = imgUrl.split(regex)[1]; // Split the URL at the version part
    const public_id = baseUrl.split('.')[0];
    
    const cloudName =process.env.CLOUD_NAME; // Your Cloudinary cloud name
    const apiKey = process.env.API_KEY; // Cloudinary API Key
    const apiSecret =process.env.API_SECRET; // Cloudinary API Secret
     
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Generate signature (SHA-1 Hash)
    const signature = crypto
      .createHash("sha1")
      .update(`public_id=${public_id}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    try {
      const response = await axios.post(
        url,
        {
          public_id: public_id,
          api_key: apiKey,
          timestamp: timestamp,
          signature: signature // The public_id of the image to delete
        }
      );

      if (response.data.result === "ok") {
        console.log("Image deleted successfully from Cloudinary.");
      } else {
        console.log("Failed to delete image.");
      }
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  };

router.delete("/deleteproduct/:pId", async (req, res) => {
  const { pId } = req.params; // Get the product ID from URL params
  try {
    // Find the product by ID and delete it
   const product = await Product.findOne({ pId });

   if (!product) {
     return res.status(404).json({ message: "Product not found!" });
   }

   // Delete image from Cloudinary if it exists
   if (product.imgSrc) {
     await deleteImageFromCloudinary(product.imgSrc);
   }

   // Delete the product from database
   await Product.findOneAndDelete({ pId });

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product. Please try again." });
  }
});




router.put("/updateproduct/:pId", async (req, res) => {
  const { pId } = req.params;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { pId },
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});


module.exports = router;
