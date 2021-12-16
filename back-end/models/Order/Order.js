const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
  product: [mongoose.Types.ObjectId],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: Date,
  quantity: Number,
  note: String,
  address: {
    provine: String,
    township: String,
    street: String,
  },
  phoneNumber: String,
})

const Order = new mongoose.model("Order", ordersSchema)
module.exports = Order
