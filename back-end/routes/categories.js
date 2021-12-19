const express = require("express")
const router = new express.Router()
const categoriesController = require("../controllers/products.controller/category.controller")
const auth = require("../middleware/auth")

router.get("/categories/all", categoriesController.getCategories)
router.get("/categories/:id", categoriesController.getCategory)
router.get("/categories/", categoriesController.getCategoryByCategorySlug)
router.post("/categories", auth, categoriesController.createCategory)
router.patch("/categories/:id", auth, categoriesController.updateCategory)
router.delete("/categories/:id", auth, categoriesController.deleteCategory)

module.exports = router
