const postModel = require("../models/post.model")
const {ImageKit,toFile} = require("@imagekit/nodejs")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController = async (req, res) => {
    console.log(req.body, req.file)

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: 'image'
    });

    res.send(file)
}

module.exports = { createPostController }