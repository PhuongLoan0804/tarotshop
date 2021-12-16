const Order = require("../../models/Order/Order")

const createOrder = (req, res) => {
  const cartItems = req.body
  console.log(cartItems)
}

module.exports = {
  createOrder,
}
