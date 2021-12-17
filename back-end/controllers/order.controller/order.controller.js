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

module.exports = {
  createOrder,
}
