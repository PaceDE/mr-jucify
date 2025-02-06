const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { body, validationResult } = require("express-validator");


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

    // Check if the product already exists
    const productExist = await Product.findOne({
      $or: [{ pId: req.body.pId }, { imgSrc: req.body.imgSrc }],
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
module.exports = router;
