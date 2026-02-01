require('dotenv').config()
const app = require("./src/app")

const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to Database'))
}
connectToDB()
app.listen(3000, () => console.log("server is running on port 3000"))