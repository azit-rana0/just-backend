/*
    - server create krna
    - server ko config krna
*/

const express = require("express");

const app = express()  // server create ho jata hai

app.use(express.json())

let notes = []

// POST /notes
app.post("/notes", (req, res) => {
    notes.push(req.body)
    res.send("note created")
})

// GET /notes
app.get("/notes", (req, res) => {
    res.send(notes)
    res.send("note geted")
})

// DELETE /note
// params

// delete/notes/2
app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index]
    res.send("note deleted")
})

// PATCH /notes/:index
// patch/note/3
// req.body = {description:- "sample modified description."}
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description
    res.send("note edited")
})

// PUT /notes/:index
// put/note/3
// [req.params.index] = req.body
app.put("/notes/:index", (req, res) => {
    notes[req.params.index] = req.body
    res.send("note replaced")
})

module.exports = app;