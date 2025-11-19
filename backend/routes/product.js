const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const {createProduct,getProducts,getProduct,deleteProduct,updateProduct,addWishlist,deleteWishlist} = require("../controllers/productControler");
const { verifyToken } = require("../middleware/verifyToken");


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
 createProduct
);


router.get(
  "/getproducts",getProducts
);
  
router.get("/getproducts/:pId",getProduct);

router.delete("/deleteproduct/:pId", deleteProduct);

router.put("/updateproduct/:pId",updateProduct );

router.put('/addWishList/:id',verifyToken,addWishlist)
router.delete('/deleteWishlist/:id',verifyToken,deleteWishlist)


module.exports = router;
