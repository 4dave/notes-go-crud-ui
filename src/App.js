import { useEffect, useState } from "react"
import "./App.css"
import Input from "./components/Input"
import Notes from "./components/Notes"
import axios from "axios"

const App = () => {
  const [notes, setNotes] = useState([])
  const [error, setError] = useState(null)

  const getNotes = async () => {
    const response = await axios.get("http://localhost:8080/notes")
    setNotes(response.data.data)
    // console.log("notes: ", response.data.data)
  }

  useEffect(() => {
    getNotes()
  }, [])

  const addNote = async (note) => {
    if (note.title !== "" && note.body !== "") {
      const response = await axios.post("http://localhost:8080/notes", note)
      setNotes([...notes, response.data.data])
      setError(null)
    } else {
      setError("Please fill out both fields")
    }
  }

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:8080/notes/${id}`)
    setNotes(notes.filter((note) => note.ID !== id))
  }

  return (
    <div className="container">
      <div className="input">
        <Input addNote={addNote} />
        <p>
          {error !== null ? (
            <span style={{ color: "red" }}>{error}</span>
          ) : (
            <span>&nbsp;</span>
          )}
        </p>
      </div>
      <div className="notes">
        <Notes notes={notes} deleteNote={deleteNote} />
      </div>
    </div>
  )
}

export default App
