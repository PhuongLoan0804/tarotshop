const express = require("express")
const router = new express.Router()
const auth = require("../middleware/auth")
const orderController = require("../controllers/order.controller/order.controller")

router.post("/orders", auth, orderController.createOrder)
router.get("/orders/:id", auth, orderController.getOrderById)
router.get("/orders", auth, orderController.getOrders)
router.get("/admin/orders", auth, orderController.getAllOrders)
router.delete("/orders/:id", auth, orderController.deleteOrder)
router.patch("/orders/:id", auth, orderController.updateOrder)

module.exports = router
