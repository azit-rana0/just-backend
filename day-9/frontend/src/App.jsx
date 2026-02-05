import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';

const App = () => {
  const [notes, setNotes] = useState([])
  const [show, setShow] = useState(false);
  const [editNoteId, setEditNoteId] = useState("")
  const [editNoteData, setEditNoteData] = useState({
    title: "",
    description: ""
  })

  function fetchNotes() {
    axios.get('https://just-backend-l88m.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.notes);
      });
  }

  useEffect(() => {
    fetchNotes()
  }, []);


  function handleCreateSubmit(e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    axios.post("https://just-backend-l88m.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    }).then((res) => {
      fetchNotes()
      e.target.reset()
      toast.success("Note created!");
    })

  }

  function handleDeleteNote(noteId) {
    axios.delete(`https://just-backend-l88m.onrender.com/api/notes/${noteId}`)
      .then((res) => {
        fetchNotes()
        toast.error("Note deleted!");
      })
  }

  function handleUpdateNoteSubmit(e) {
    e.preventDefault();
    axios.patch(`https://just-backend-l88m.onrender.com/api/notes/${editNoteId}`,
      editNoteData
    ).then((res) => {
      fetchNotes();
      toast.info("Note updated!");
      setShow(false);
    })
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditNoteData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="notes-container">
      <form className="note-create-form" onSubmit={(e) => handleCreateSubmit(e)}>
        <input name="title" type="text" maxLength={35} placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create note</button>
      </form>

      {show && (
        <div
          className="update-container"
        >
          <form className="note-update-form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleUpdateNoteSubmit}
          >
            <h2>Update Note</h2>

            <input
              name="title"
              value={editNoteData.title}
              onChange={handleChange}
            />

            <input
              name="description"
              value={editNoteData.description}
              onChange={handleChange}
            />

            <div className="btns">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShow(false)}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

      <div className="notes">
        {notes.length > 0 ?
          notes.map((note) => {
            return (
              <div key={note._id} className="note">
                <h1>{note.title}</h1>

                <div className="desc">
                  <p>{note.description}</p>
                </div>

                <button onClick={() => {
                  handleDeleteNote(note._id)
                }} className="delete">Delete</button>

                <button onClick={() => {
                  setEditNoteId(note._id);
                  setEditNoteData({
                    title: note.title,
                    description: note.description
                  });
                  setShow(true);
                }} className="edit">Edit</button>

              </div>)
          }) :
          <div className="loading-container">
            <div className="loader"></div>
            <h2 className="loader-title">Loading... </h2>
          </div>}
      </div>
    </div>
  )
}

export default App