const Category = require("../../models/Products/Category")

const createCategory = async (req, res) => {
  const { display, categorySlug } = req.body
  const category = new Category({ display, categorySlug })

  await category.save()

  res.status(201).send(category)
}

const getCategories = async (req, res) => {
  const categories = await Category.find({})
  res.status(200).send(categories)
}

const getCategoryByCategorySlug = async (req, res) => {
  const category = await Category.findOne({
    categorySlug: req.query.categorySlug,
  })

  if (!category) {
    return res.status(404).send({
      message: "Not found this category",
    })
  }

  res.status(200).send(category)
}

const getCategory = async (req, res) => {
  const category = await Category.findById({
    _id: req.params.id,
  })

  if (!category) {
    return res.status(404).send({
      message: "Not found this category",
    })
  }

  res.status(200).send(category)
}

const updateCategory = async (req, res) => {
  const id = req.params.id
  const category = await Category.findById(id)

  console.log(category)

  if (!category) res.status(404).send({ message: "Not found this category" })

  const newValue = req.body
  const keys = Object.keys(newValue)
  const check = keys.every((key) => {
    return ["categorySlug", "display"].includes(key)
  })
  if (check) {
    try {
      keys.forEach((key) => {
        category[key] = newValue[key]
      })
      const updatedCategory = await category.save()
      res.status(200).send(updatedCategory)
    } catch (e) {
      res.status(500).send(e)
    }
  } else {
    res.status(400).send("Not accept strange keys")
  }
}

const deleteCategory = async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id)
  if (!deletedCategory)
    return res.status(404).send({ message: "Not found this category" })
  res.status(200).send(deletedCategory)
}

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryByCategorySlug,
}
