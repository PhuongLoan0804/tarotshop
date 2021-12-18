const express = require("express")
const router = new express.Router()
const auth = require("../middleware/auth")
const orderController = require("../controllers/order.controller/order.controller")

router.post("/orders", auth, orderController.createOrder)
router.get("/orders/:id")
router.get("/orders", auth, orderController.getOrders)

module.exports = router
