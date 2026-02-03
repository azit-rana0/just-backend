import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {

  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios.get('https://just-backend-l88m.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.notes);
      });
  }

  useEffect(() => {
    fetchNotes()
  }, []);


  function handleSubmit(e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    console.log(title.value, description.value);

    axios.post("https://just-backend-l88m.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    }).then((res) => {
      fetchNotes()
      e.target.reset()
    })

  }

  function handleDeleteNote(noteId) {
    axios.delete(`https://just-backend-l88m.onrender.com/api/notes/${noteId}`)
      .then((res) => {
        fetchNotes()
      })
  }

  function handleEditNote(noteId) {
    console.log(noteId);
    let updateDesc = prompt("Enter new description")
    axios.patch(`https://just-backend-l88m.onrender.com/api/notes/${noteId}`, {
      description: updateDesc
    }).then((res) => {
      console.log(res);
      fetchNotes()
    })
  }

  return (
    <>
      <form className="note-create-form" onSubmit={(e) => handleSubmit(e)}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create note</button>
      </form>
      <div className="notes">
        {
          notes.map((note) => {
            return <div key={note._id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => handleDeleteNote(note._id)} className="delete">Delete</button>
              <button onClick={() => handleEditNote(note._id)} className="edit">Edit</button>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App