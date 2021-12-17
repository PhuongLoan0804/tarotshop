const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
  products: [{ productId: mongoose.Types.ObjectId, quantity: Number }],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: Date,
  totalProducts: Number,
  totalPrice: Number,
  address: {
    city: String,
    district: String,
    ward: String,
    detail: String,
  },
  phoneNumber: String,
})

const Order = new mongoose.model("Order", ordersSchema)
module.exports = Order
