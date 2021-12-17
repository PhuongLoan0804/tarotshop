const Order = require("../../models/Order/Order")

const createOrder = (req, res) => {
  const {
    cartItems,
    totalProducts,
    totalPrice,
    selectedCity,
    selectedDistrict,
    selectedWard,
    phoneNumber,
    detailAddress,
  } = req.body

  const order = new Order({
    products: cartItems,
    owner: req.user._id,
    orderDate: new Date().toLocaleDateString(),
    totalProducts,
    totalPrice,
    address: {
      city: selectedCity,
      district: selectedDistrict,
      ward: selectedWard,
      detail: detailAddress,
    },
    phoneNumber,
  })

  console.log(order)
}

module.exports = {
  createOrder,
}
