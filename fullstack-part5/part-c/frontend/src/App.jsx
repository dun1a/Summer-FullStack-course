import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import loginService from './services/login.js'
import noteService from './services/notesService.js'
import Note from './components/Note.jsx'
import Home from './components/Home.jsx'
import NoteList from './components/NoteList.jsx'
import NoteForm from './components/NoteForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import Notification from './components/Notification.jsx'

//////////////////////7
// part 2 d
// fetching data from the server using axios

const App = () => {
  // uses useState function to initialize the piece of state stored in 'notes' with the array of notes passed in props
  const [notes, setNotes] = useState(null) // to initialize as empty array: useState([])
  const [newNote, setNewNote] = useState('a new note...') // a state variable to sote user-submitted input
  const [showAll, setShowAll] = useState(true) // using this state to enable fintering display functionality
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => { // takes two parameters: 1. the function (the effect itself), which runs only once the component has been rendered for the first time
    // 2. how many times the effeect should run
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
    }, [])

    // tell the browser to check after rendering whethere there is already a user logged in in the local storage
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        noteService.setToken(user.token)
      }
    }, []) // <= empty array as the second argument ensures that theeffect is executed only when the component is rendered for the FIRST TIME
    
    
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

  // logic for loging in 
  const handleLogin = async (event) => {
    event.preventDefault()
    
    // Implementation for handling login
    try {
      const user = await loginService.login({ username, password })
      
      // save the details of the logged-in user to the local storage, so that browser doesn't forget and reset the user
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      
      noteService.setToken(user.token) // the token is set in the notesService, so that it can be used in the headers of the requests to the server
      
      setUser(user) // the token returned with a successful login is saved to the application's state
      setUsername('')
      setPassword('')

    }catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel = "login">
      <LoginForm
        username = {username}
        password = {password}
        handleUsernameChange = {({target}) => setUsername(target.value)}
        handlePasswordChange = {({target}) => setPassword(target.value)}
        handleSubmit = {handleLogin}
      />
    </Togglable>

  )

  const noteForm = () => (
    <Togglable buttonLabel = "new note">
      <NoteForm
        onSubmit = {addNote}
        value = {newNote}
        handleChange = {handleNoteChange}
      />
    </Togglable>
  )


  return (

    <Router>
      <div>
        <Link to = "/"> home</Link>
        <Link to = "/notes"> notes</Link>
        <Link to = "/create"> create note</Link>
      </div>

      <Routes>
        <Route path = "/notes" element = {<NoteList notes = {notes}/>}/>
        <Route path = "/create" element = {<NoteForm addNote = {addNote}/>} />
        <Route path = "/" element = {<Home />} />
      </Routes>
    </Router>

    // <div>
    //   <h1>Notes</h1>
    //   <Notification message={errorMessage} />

    //   {/*redenders the forms conditionally */}
    //   {!user && loginForm()} {/* = if the not user show the login form to the user to login*/}
    //   {user && (
    //     <div>
    //       <p>{user.name} logged in</p>
    //       {noteForm()}
    //     </div>
    //   )}
    //   <hr />

    //   <div>
    //   <button onClick={() => setShowAll(!showAll)}>
    //     show {showAll ? 'important' : 'all'}
    //   </button>
    //   </div>
      
    //   <ul>
    //     {notesToShow.map(note => 
    //       <Note key={note.id} 
    //       note={note}
    //       toggleImportance={ () => toggleImportanceOf(note.id)}/>
    //     )}
    //   </ul>
      
    //   {/* <form onSubmit={addNote}>
    //     <input value = {newNote} onChange={handleNoteChange}/>
    //     <button type='submit'>save</button>
    //   </form> */}
    // </div>
  )
}
export default App
