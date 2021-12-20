const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image0: String,
  categorySlug: String,
  slug: String,
  description: String,
  boughtTimes: Number,
  clickedTimes: Number,
  numberInStock: Number,
  status: String,
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
