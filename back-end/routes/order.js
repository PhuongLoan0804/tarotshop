const express = require("express")
const router = new express.Router()
const auth = require("../middleware/auth")
const orderController = require("../controllers/order.controller/order.controller")

router.post("/orders", orderController.createOrder)

module.exports = router
