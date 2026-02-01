const express = require('express')
const noteModel = require('./models/notes.model')

const app = express()

app.use(express.json())

// POST /note
// req.body => {title, description}
app.post('/notes', async (req, res) => {
    const { title, description } = req.body

    const notes = await noteModel.create({
        title, description
    })

    res.status(201).json({
        massage: 'Note created successfully',
        notes: notes
    })
})

// GET /note
// fetch all the notes data
app.get('/notes', async (req, res) => {

    const notes = await noteModel.find()
    res.status(200).json({
        massage: "Noted fetched successfully",
        notes: notes
    })
})

module.exports = app