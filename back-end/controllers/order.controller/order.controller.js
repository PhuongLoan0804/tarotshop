const Order = require("../../models/Order/Order")

const createOrder = (req, res) => {
  const data = req.body
  const productIds = data.cartItems.map((item) => item.id)
  const owner = req.user._id
  const orderDate = new Date().toLocaleDateString()
  const quantity = data.quantity

  console.log(req.body)
}

module.exports = {
  createOrder,
}
