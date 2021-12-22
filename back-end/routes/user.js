const express = require("express")
const router = new express.Router()
const auth = require("../middleware/auth")
const userController = require("../controllers/users.controller/users.controller")

router.post("/users", userController.createUser)
router.post("/users/login", userController.loginUser)
router.post("/users/logout", auth, userController.logoutUser)
router.post("/users/logoutall", auth, userController.logoutAll)
router.get("/users/me", auth, userController.getMe)
router.get("/users", auth, userController.getAllUsers)
router.patch("/users/me", auth, userController.updateUser)
router.delete("/users/:id", auth, userController.deleteUser)

router.post("/check-old-password", auth, userController.checkOldPassword)

module.exports = router
