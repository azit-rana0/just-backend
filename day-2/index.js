const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Backend Home Page...")
});

app.get("/about", (req, res) => {
    res.send("Backend About Page...")
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})