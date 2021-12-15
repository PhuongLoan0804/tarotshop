const User = require('../../models/Users/User')

const createUser = async(req, res) => {
    try {
        const user = new User(req.body)
        await user.save()

        const token = await user.generateAuthToken()
        res.status(201).send({
            token,
            owner: user._id,
            isOk: true
        })

    } catch (e) {
        res.status(400).send(e)
    }
}

const loginUser = async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body)

        const token = await user.generateAuthToken()

        res.status(200).send({
            token,
            owner: user._id,
            isOk: true
        })

    } catch (e) {
        res.status(400).send(e.toString())
    }
}

const logoutUser = async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send({
            message: 'Đã đăng xuất'
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const logoutAll = async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const getMe = async(req, res) => {
    res.status(200).send({ user: req.user, token: req.token, isOk: true })
}

const updateUser = async(req, res) => {
    const newValue = req.body
    const keys = Object.keys(newValue)
    const check = keys.every((key) => {
        return ["name", "email", "password"].includes(key)
    })
    if (check) {
        try {
            keys.forEach(key => {
                req.user[key] = newValue[key]
            })
            const updatedUser = await req.user.save()
            res.status(200).send(updatedUser)
        } catch (e) {
            res.status(500).send(e)
        }
    } else {
        res.status(400).send("accepted keys: ['name', 'email', 'password']")
    }
}

const deleteUser = async(req, res) => {

    try {
        await req.user.remove()

        res.send(`deleted user ${req.user.email}`)

    } catch (e) {
        res.status(500).send(e)
    }
}

const checkOldPassword = async(req, res) => {
    const userObject = {
        email: req.user.email,
        password: req.body.currentPwd
    }
    try {
        const user = await User.findByCredentials(userObject)
        if (user) {
            res.status(200).send({
                isMatch: true,
                user
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    logoutAll,
    getMe,
    deleteUser,
    updateUser,
    checkOldPassword
}