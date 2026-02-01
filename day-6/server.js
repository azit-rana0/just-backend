const app = require("./src/app")

const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect('mongodb+srv://azit:qGBEx7la0gifhBet@cluster0.twnzubh.mongodb.net/day-6')
        .then(() => console.log('Connected to Database'))
}
connectToDB()
app.listen(3000, () => console.log("server is running on port 3000"))