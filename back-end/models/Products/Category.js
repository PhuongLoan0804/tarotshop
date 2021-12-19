const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  display: String,
  categorySlug: String,
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category
