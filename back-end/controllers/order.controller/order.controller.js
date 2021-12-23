const Order = require("../../models/Order/Order")
const User = require("../../models/Users/User")
const Product = require("../../models/Products/Products")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "taskapp.noreply@gmail.com",
    pass: "longbuibao11011010",
  },
})

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

  console.log(cartItems)

  await Promise.all(
    cartItems.map(async (item) => {
      const product = await Product.findById(item.id)
      product.boughtTimes += 1

      const quantity = +item.quantity
      product.numberInStock -= quantity

      return await product.save()
    })
  )

  const order = new Order({
    products: cartItems,
    owner: req.user._id,
    orderDate: Date.now(),
    totalProducts,
    totalPrice,
    city: selectedCity || "",
    district: selectedDistrict || "",
    ward: selectedWard || "",
    detail: address,
    phoneNumber,
  })

  await order.save()
  res.status(201).send()
}

const getOrders = async (req, res) => {
  const user = req.user
  const orders = await Order.find({ owner: user._id })
  res.status(200).send(orders)
}

const getOrderById = async (req, res) => {
  const id = req.params.id
  const order = await Order.findById(id)
  res.send(order)
}

const deleteOrder = async (req, res) => {
  const id = req.params.id

  console.log(id)
  const order = await Order.findByIdAndDelete(id)

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
    return ["status"].includes(key)
  })

  const mailOptions = {
    from: "youremail@gmail.com",
    to: `${req.user.email}`,
    subject: "Sending Email using Node.js",
    html: `<h1>Hello From LonTon</h1><p> Your order was ${newValue.status} </p>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })

  if (check) {
    const order = await Order.findById(orderId)

    try {
      order.status = newValue.status

      const updatedOrder = await order.save()

      console.log(updatedOrder.toObject())
      res.status(200).send(updatedOrder)
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  } else {
    res.status(400).send("Not accept strange keys")
  }
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})

  const usersOrders = await Promise.all(
    orders.map(async (order) => {
      const user = await User.findById(order.owner)
      return {
        ...order.toObject(),
        userName: user.name,
        phone: user.phone,
        userEmail: user.email,
        // ...user,
      }
    })
  )

  res.status(200).send(usersOrders)
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  getAllOrders,
}
