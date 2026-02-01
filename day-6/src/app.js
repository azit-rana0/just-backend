const express = require("express");

const app = express()

app.use(express.json())

let notes = []

app.post("/notes", (req, res) => {
    notes.push(req.body)
    res.status(201).json({
        massage: "notes created successfully"
    })
})

app.get("/notes", (req, res) => {
    res.status(200).json({
        massage: "notes geted successfully",
        notes: notes
    })
})

app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index]
    res.status(200).json({
        massage: "notes deleted successfully",
    })
})
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].content = req.body.content
    res.status(200).json({
        massage: "notes updated successfully",
    })
})

app.put("/notes/:index", (req, res) => {
    notes[req.params.index] = req.body
    res.status(200).json({
        massage: "notes replaced successfully",
    })
})

module.exports = app