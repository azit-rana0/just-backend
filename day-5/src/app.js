// server create karna
// server config karna

const express = require("express")

const app = express()

app.use(express.json())

let notes = []

// GET /notes
app.post("/notes", (req, res) => {
    notes.push(req.body)
    res.status(201).json({
        massage: "Note created successfully"
    })
})

// POST /notes
app.get("/notes", (req, res) => {
    res.status(200).json({
        massage: "Note geted successfully",
        notes: notes
    })
})

// DELETE /notes/:index
app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index]
    res.status(200).json({
        massage: "Note deleted successfully",
    })
})

// PATCH /notes/:index
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description
    res.status(200).json({
        massage: "Note updated successfully",
    })
})

// PUT /notes/:index
app.put("/notes/:index", (req, res) => {
    notes[req.params.index] = req.body
    res.status(200).json({
        massage: "Note replaced successfully",
    })
})

module.exports = app