const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  image0: String,
  image1: String,
  categorySlug: String,
  slug: String,
  description: String,
  boughtTimes: Number,
  clickedTimes: Number,
})

const Product = mongoose.model(productSchema)

module.exports = Product
