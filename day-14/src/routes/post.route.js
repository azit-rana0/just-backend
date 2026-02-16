const express = require("express")
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })


const postRouter = express.Router()

/**
 * POST /api/posts [protected]
 * - req.body = {caption, image-file}
 */

postRouter.post("/", upload.single("image"), postController.createPostController)

postRouter.get("/", postController.getPostController)

postRouter.get("/:postId", postController.getPostDetailsController)

module.exports = postRouter