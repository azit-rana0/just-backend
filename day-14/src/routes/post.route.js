const express = require("express")
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middleware/auth.middleware")


const postRouter = express.Router()

/**
 * POST /api/posts [protected]
 * - req.body = {caption, image-file}
 */

postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

postRouter.get("/", identifyUser, postController.getPostController)

postRouter.get("/:postId", identifyUser, postController.getPostDetailsController)

/**
 * @route POST /api/posts/like/:postId
 * @description like a post with the id provided in the requiest params.
 */

postRouter.post("/like/:postId", identifyUser, postController.likePostController)

module.exports = postRouter