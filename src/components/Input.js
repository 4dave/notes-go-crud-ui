import { useState } from "react"

const Input = ({ addNote }) => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    addNote({
      title: e.target.title.value,
      body: e.target.body.value,
    })
    // clear the form
    setBody("")
    setTitle("")
  }

  return (
    // return a form with input fields for title and body
    // and a submit button
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          name="body"
          id="body"
          placeholder="note"
          style={{ resize: "none", height: "100px" }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default Input
