require("./database/database")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const usersRoute = require("./routes/user")
const orderRoute = require("./routes/order")
const productRoute = require("./routes/products")
const categoriesRoute = require("./routes/categories")

const express = require("express")
const app = express()

const whiteList = ["http://localhost:3000", "http://localhost:3001"]

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
}

app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(usersRoute)
app.use(orderRoute)
app.use(productRoute)
app.use(categoriesRoute)

module.exports = app
