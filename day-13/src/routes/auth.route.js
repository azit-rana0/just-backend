const express = require("express")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userModel = require("../models/user.model")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isEmailAlreadyExists = await userModel.findOne({ email })

    if (isEmailAlreadyExists) {
        res.status(409).json({
            massage: "with this email address user already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({ name, email, password: hash })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        massage: "user registerd successfully",
        user,
        token
    })
})

authRouter.post("/protected", (req, res) => {
    console.log(req.cookies, "rana")

    res.status(200).json({
        message: "This is a protected route"
    })
})

/**
 * POST /api/auth/login
 */

/**
 * controller
 */
authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        res.status(404).json({
            massage: "user not found with this email address"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordMatched) {
        res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        massage: "user logged in",
        user,
        token
    })

})

module.exports = authRouter