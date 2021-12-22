const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
  products: {},
  status: String,
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: Date,
  totalProducts: Number,
  totalPrice: Number,
  city: { value: Number, label: String },
  district: { value: Number, label: String },
  ward: { value: Number, label: String },
  detail: String,
  phoneNumber: String,
  status: {
    type: String,
    default: "PENDING",
  },
})

const Order = new mongoose.model("Order", ordersSchema)
module.exports = Order
