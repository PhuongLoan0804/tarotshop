const Product = require("../../models/Products/Products")
const Category = require("../../models/Products/Category")

const createProduct = async (req, res) => {
  const { title, price, image0, image1, categorySlug, slug, description } =
    req.body

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
  })

  await product.save()

  res.status(200).send(product)
}

const getProductsById = async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)

  if (!product) {
    res.status(404).send({
      message: "Not found this product",
    })
  }

  res.status(200).send(product)
}
const getAllProducts = async (req, res) => {
  const products = await Product.find({})

  res.status(200).send(products)
}

const updateProduct = async (req, res) => {
  const id = req.params.id
  const product = Product.findById(id)

  if (!product) res.status(404).send({ message: "Not found this product" })

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
    ].includes(key)
  })
  if (check) {
    const product = await Product.findById(id)

    try {
      keys.forEach((key) => {
        product[key] = newValue[key]
      })
      const updatedProduct = await product.save()
      res.status(200).send(updatedProduct)
    } catch (e) {
      res.status(500).send(e)
    }
  } else {
    res.status(400).send("Not acceptd strange keys")
  }
}

const deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete(req.params.id)

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

const getProductByCategorySlug = async (req, res) => {
  const categorySlug = req.query.categorySlug
  const category = await Category.findOne({ categorySlug })

  if (!category) {
    return res.status(404).send({ message: "Not found this category" })
  }

  const products = await Product.find({ categorySlug })

  res.status(200).send(products)
}

module.exports = {
  createProduct,
  getProductsById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByCategorySlug,
}