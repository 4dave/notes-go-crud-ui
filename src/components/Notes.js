import { MdDelete } from "react-icons/md"
import { useState } from "react"

const Notes = ({ notes, deleteNote }) => {
  const [confirmDelete, setConfirmDelete] = useState({
    id: "",
    state: false,
  })

  const handleConfirm = (id, color) => {
    if (color === "red") {
      setConfirmDelete({ id: id, state: true })
      console.log("confirming...", id)
    } else if (color === "black") {
      handleDelete(id)
      console.log("deleteing...", id)
    } else if (color === "exit") {
      setConfirmDelete({ id: "", state: false })
      console.log("exiting...", id)
    }
  }

  const handleDelete = (id) => {
    deleteNote(id)
    setConfirmDelete({ id: "", state: false })
  }

  const convertDate = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString({
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <h1>The list of notes here:</h1>
      <div className="list">
        {notes?.map((note) => (
          <div key={note.ID} className="note">
            <h2>{note.title}</h2>
            <p>{note.body}</p>
            <span>{convertDate(note.CreatedAt)}</span>
            <div className="buttons">
              {confirmDelete.id !== note.ID ? (
                <MdDelete
                  onClick={() => handleConfirm(note.ID, "red")}
                  size="1.5em"
                />
              ) : (
                <>
                  <MdDelete
                    onClick={() => handleConfirm(note.ID, "black")}
                    size="1.5em"
                    color="red"
                  />
                  are you sure?
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Notes
