import { useState } from 'react'
import { useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'

//////////////////////7
// part 2 d
// fetching data from the server using axios

const App = () => {
  // uses useState function to initialize the piece of state stored in 'notes' with the array of notes passed in props
  const [notes, setNotes] = useState(null) // to initialize as empty array: useState([])
  const [newNote, setNewNote] = useState('a new note...') // a state variable to sote user-submitted input
  const [showAll, setShowAll] = useState(true) // using this state to enable fintering display functionality
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => { // takes two parameters: 1. the function (the effect itself), which runs only once the component has been rendered for the first time
    // 2. how many times the effeect should run
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
    }, [])
    //console.log('render', notes.length, 'notes')
    
    // do not render anything if notes is still null
    if (!notes) {
      return null
    }

       // adding button to toggle note importance
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id) // used to find the note we want to modify, by searching the notes array for the note with the matching id
    const changedNote = {...note, important: !note.important} // after that we create a new object that is an exact copy of the old note (without the 'important' value)
    
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch(error => {
      setErrorMessage(`Note '${note.content}' was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  } 

  // sending data to the server 
  // creating a function to handle adding new notes
  const addNote = (event) => {
    event.preventDefault() // to prevent the default behavior of the form submission, which is to reload the page

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5 // to randomly assign the importance of the note
      //id: Math.random() < 0.5, we dont need id property (post task)
    }

    // sending data to the server 
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
    // setNotes(notes.concat(noteObject)) // ensures the original array is not changed, by creating a new array with the added note
    // setNewNote('')
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
   ? notes 
   : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
          note={note}
          toggleImportance={ () => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      
      <form onSubmit={addNote}>
        <input value = {newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}
export default App
