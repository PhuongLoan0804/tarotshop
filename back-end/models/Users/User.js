const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      validate(val) {
        if (!isNaN(val.charAt(0))) {
          throw new Error("Please do not use user name start with a number!")
        }
      },
    },
    email: {
      type: String,
      trim: true,
      default: null,
      unique: true,
      async validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Check your email again")
        }
      },
    },
    password: {
      type: String,
      require: true,
      validate(val) {
        if (validator.contains(val, "password")) {
          throw new Error("Dont put `password` in your password")
        }
        if (val.length < 6) {
          throw new Error("password must be 6 characters or more")
        }
      },
    },
    status: {
      type: String,
      default: "active",
    },
    phone: String,
    address: String,
    gender: String,
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatarObj: String,
  },
  {
    timestamps: true,
    minimize: true,
  }
)

userSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()
  delete userObj.password
  delete userObj.tokens
  delete userObj.avatarObj

  return userObj
}

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id.toString() },
    process.env.SECRET_BCRYPT_KEY
  )
  this.tokens = this.tokens.concat({ token })
  await this.save()
  return token
}

//hash plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

//remove all orders before remove user
userSchema.pre("remove", async function (next) {})

userSchema.statics.findByCredentials = async (userObject) => {
  const { email, password } = userObject
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({
      status: 404,
      message: "Not found that email",
    })
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Email or password is incorrect")
  }
  return user
}

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "owner",
})

const User = mongoose.model("User", userSchema)

module.exports = User
