const express = require("express")
const router = new express.Router()
const productsController = require("../controllers/products.controller/products.controller")

router.post("/products", productsController.createProduct)
router.get("/products/:id", productsController.getProductsById)
router.get("/products", productsController.getAllProducts)
router.patch("/products", productsController.updateProduct)
router.delete("/products", productsController.deleteProduct)

module.exports = router
