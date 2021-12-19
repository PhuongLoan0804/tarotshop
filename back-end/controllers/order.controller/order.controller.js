const Order = require("../../models/Order/Order")
const mongoose = require("mongoose")

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

const deleteOrder = async (req, res) => {
  const id = req.params.id
  const order = await Order.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  })

  if (!order) {
    return res.status(404).send("Not found this id")
  }

  res.status(200).send(`Deleted order ${id}`)
}

const updateOrder = async (req, res) => {
  const newValue = req.body
  const orderId = req.params.id
  const keys = Object.keys(newValue)
  const check = keys.every((key) => {
    return [
      "products",
      "city",
      "district",
      "ward",
      "detail",
      "phoneNumber",
    ].includes(key)
  })
  if (check) {
    const order = Order.findById(orderId)

    try {
      keys.forEach((key) => {
        order[key] = newValue[key]
      })
      const updatedOrder = await order.save()
      res.status(200).send(updatedOrder)
    } catch (e) {
      res.status(500).send(e)
    }
  } else {
    res.status(400).send("Not accept strange keys")
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
}
