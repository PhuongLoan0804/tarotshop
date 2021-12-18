const Order = require("../../models/Order/Order")

const createOrder = async (req, res) => {
  const {
    cartItems,
    totalProducts,
    totalPrice,
    selectedCity,
    selectedDistrict,
    selectedWard,
    phoneNumber,
    address,
  } = req.body

  const order = new Order({
    products: cartItems,
    owner: req.user._id,
    orderDate: Date.now(),
    totalProducts,
    totalPrice,
    city: selectedCity,
    district: selectedDistrict,
    ward: selectedWard,
    detail: address,
    phoneNumber,
  })

  await order.save()
  res.status(201).send()
}

const getOrders = async (req, res) => {
  const user = req.user
  const order = await Order.find({ owner: user._id })
  res.send(order)
}

const getOrderById = async (req, res) => {
  const id = req.params.id
  const order = await Order.findById(id)

  const productsId = order.products.map((product) => product._id)
  console.log(productsId)

  // todo : return array of product + quantity + total price

  res.send(order)
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
}
