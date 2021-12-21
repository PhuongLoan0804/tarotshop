const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
  products: [{ productId: mongoose.Types.ObjectId, quantity: Number }],
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
  status: String,
})

const Order = new mongoose.model("Order", ordersSchema)
module.exports = Order
