const Products = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const product = new Products({ ...req.body });
    await product.save();
    res.status(200).json({ message: "Added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
