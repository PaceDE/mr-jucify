const mongoose= require('mongoose');
const {  Schema } =mongoose;

const productSchema = new mongoose.Schema({
  pId: { type: Number, required: true, unique:true},
  pName: { type: String, required: true },
  description: { type: String},
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  imgSrc: { type: String, required: true, unique: true },
  category: { type: [String] },
  tags: { type: [String] },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;