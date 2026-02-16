const express = require("express")
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const userVerify = require("../middleware/auth.middleware")


const postRouter = express.Router()

/**
 * POST /api/posts [protected]
 * - req.body = {caption, image-file}
 */

postRouter.post("/", upload.single("image"), userVerify, postController.createPostController)

postRouter.get("/", userVerify, postController.getPostController)

postRouter.get("/:postId", userVerify, postController.getPostDetailsController)

module.exports = postRouter