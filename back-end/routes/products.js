const express = require("express")
const router = new express.Router()
const productsController = require("../controllers/products.controller/products.controller")
const auth = require("../middleware/auth")

router.post("/products", auth, productsController.createProduct)
router.get("/products", productsController.getProductByQuery)
router.get("/products/all", productsController.getAllProducts)
router.get("/products/:id", productsController.getProductsById)
router.patch("/products/:id", auth, productsController.updateProduct)
router.delete("/products/:id", auth, productsController.deleteProduct)

module.exports = router
