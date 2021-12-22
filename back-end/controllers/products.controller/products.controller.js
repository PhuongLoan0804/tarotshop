const Product = require("../../models/Products/Products")
const Category = require("../../models/Products/Category")
const { deleteFalsyProp } = require("../../utils/deleteFalsyProp")
const mongoose = require("mongoose")

const createProduct = async (req, res) => {
  const {
    title,
    price,
    image0,
    image1,
    categorySlug,
    slug,
    description,
    numberInStock,
    status,
  } = req.body

  const category = await Category.find({ categorySlug })

  if (!category) {
    return res.status(404).send({ message: "Not found this category" })
  }

  const product = new Product({
    title,
    price,
    image0,
    image1,
    categorySlug,
    slug,
    description,
    boughtTimes: 0,
    clickedTimes: 0,
    numberInStock,
    status,
  })

  await product.save()

  res.status(200).send(product)
}

const getProductsById = async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).send({ message: "Not found this product" })
  }

  res.status(200).send(product)
}
const getAllProducts = async (req, res) => {
  const products = await Product.find({})

  res.status(200).send(products)
}

const updateProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)
  if (!product) res.status(404).send({ message: "Not found this product" })
  oke
  const newValue = req.body

  const categorySlug = newValue.categorySlug

  if (categorySlug) {
    const category = await Category.findOne({ categorySlug })
    if (!category)
      return res.status(404).send({ message: "Not found this category" })
  }

  const keys = Object.keys(newValue)
  const check = keys.every((key) => {
    return [
      "title",
      "price",
      "image0",
      "image1",
      "categorySlug",
      "slug",
      "description",
      "numberInStock",
      "status",
    ].includes(key)
  })
  if (check) {
    const deleteFalsy = deleteFalsyProp(newValue)

    for (const key in deleteFalsy) {
      product[key] = deleteFalsy[key]
    }

    await product.save()
    const updatedProduct = await Product.findById(id)

    return res.status(200).send(updatedProduct)
  } else {
    res.status(400).send("Not acceptd strange keys")
  }
}

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product)
    res.status(404).send({
      message: "Not found this product",
    })
  else
    res.status(200).send({
      message: "Deleted product",
      body: product,
    })
}

const getProductByQuery = async (req, res) => {
  const categorySlug = req.query.categorySlug
  const limitNum = req.query.limit
  const random = req.query.random
  const productsId = req.query.productsId

  if (categorySlug) {
    const category = await Category.findOne({ categorySlug })
    if (!category) {
      return res.status(404).send({ message: "Not found this category" })
    }

    const products = await Product.find({ categorySlug })

    return res.status(200).send(products)
  }

  if (limitNum) {
    const products = await Product.find({}).limit(Number(limitNum))
    return res.status(200).send(products)
  }

  if (random) {
    const products = await Product.aggregate([
      { $sample: { size: Number(random) } },
    ])

    return res.status(200).send(products)
  }

  if (productsId) {
    const prodIds = productsId
      .split(",")
      .map((id) => mongoose.Types.ObjectId(id))

    const products = await Product.find({ _id: { $in: prodIds } })

    return res.status(200).send(products)
  }

  res.status(200).send(await Product.find({}))
}

module.exports = {
  createProduct,
  getProductsById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByQuery,
}
