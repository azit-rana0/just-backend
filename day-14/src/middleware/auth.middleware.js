const jwt = require("jsonwebtoken")

const userVerify = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token not provided, Unauthorized access",
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "user not authorized, "
        })
    }

    req.user = decoded.id

    next()

}

module.exports = userVerify