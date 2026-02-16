const postModel = require("../models/post.model")
const { ImageKit, toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController = async (req, res) => {

    const userId = req.user

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: 'image',
        folder: "just-backend-insta-clone"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: userId
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })

}

const getPostController = async (req, res) => {

    const userId = req.user

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "post data fetched data",
        posts
    })

}

/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id, also check whether the post belongs to the user that the request come from
 */

const getPostDetailsController = async (req, res) => {

    const userId = req.user;
    const postId = req.params.postId;

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "forbidden content."
        })
    }

    res.status(200).json({
        message: "post fetched succeefully",
        post
    })

}

module.exports = { createPostController, getPostController, getPostDetailsController }