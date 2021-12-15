const jwt = require('jsonwebtoken')
const User = require('../models/Users/User')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET_BCRYPT_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user

        console.log(token)
        next()
    } catch (error) {
        res.status(403).send({ a: 'a' })
    }
}

module.exports = auth