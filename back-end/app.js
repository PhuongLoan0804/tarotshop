require('./database/database')

const cors = require('cors')

const usersRoute = require('./routes/user')

const express = require('express')
const app = express()

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONT_END
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(usersRoute)

module.exports = app