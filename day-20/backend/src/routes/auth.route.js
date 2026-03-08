const express = require("express")
const authController = require("../controllers/auth.controller")
const identifyUser = require("../middleware/auth.middleware")


const authRouter = express.Router()


/**
 * POST /api/auth/register
 */
authRouter.post("/register", authController.registerController)

/**
 * POST /api/auth/login
 */
authRouter.post("/login", authController.logincontroller)

/**
 * GET /api/auth/get-me
 * get me currently logged in user's information
 * Private
 */
authRouter.get("/get-me",identifyUser, authController.getMeController)
module.exports = authRouter