const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: [true, "user name already exists"],
        required: [true, "user name is required"]
    },

    email: {
        type: String,
        unique: [true, "email already exists"],
        required: [true, 'email is required']
    },

    password: {
        type: String,
        required: [true, "password is required"]
    },

    bio: String,

    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/xfl1j1jos/istockphoto-1337144146-612x612.jpg"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel