const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middleware/auth.middleware")

const userRouter = express.Router()

/**
 * @route POST /api/users/follow/:userId
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followsUserController)

/**
 * @route POST /api/users/unfollow/:userId
 * @description unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowsUserController)


module.exports = userRouter;