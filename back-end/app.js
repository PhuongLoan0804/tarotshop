require("./database/database")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const usersRoute = require("./routes/user")
const orderRoute = require("./routes/order")

const express = require("express")
const app = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_END,
  })
)
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_END,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(usersRoute)
app.use(orderRoute)

module.exports = app
