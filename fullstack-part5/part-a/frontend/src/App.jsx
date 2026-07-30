import { useState, useEffect, useRef } from 'react'
import loginService from './services/login.js'
import noteService from './services/notesService.js'
import Note from './components/Note.jsx'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import NoteForm from './components/NoteForm.jsx'
import Togglable from './components/Togglable.jsx'

//////////////////////7
// part 2 d
// fetching data from the server using axios

const App = () => {
  // uses useState function to initialize the piece of state stored in 'notes' with the array of notes passed in props
  const [notes, setNotes] = useState([]) // to initialize as empty array: useState([])
  const [showAll, setShowAll] = useState(true) // using this state to enable fintering display functionality
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // useRef must be used before other hooks
  const noteFormRef = useRef() // creates a reference that is assigned to the Toggle component
  // containing the creation note formm, this reference acts as a reference to the component
  // made changes is the Toggle component

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
    
    
  // sending data to the server 
  // creating a function to handle adding new notes
  const addNote = (noteObject) => {
    // after a note is created, we hide the form using the noteFormRef.toggleVisibility() from the Toggle component
    noteFormRef.current.toggleVisibility() // the current property of the reference points to the component instance, and we can call the toggleVisibility method on it

    // sending data to the server 
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
    // setNotes(notes.concat(noteObject)) // ensures the original array is not changed, by creating a new array with the added note
    // setNewNote('')
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
      console.log('user', user)
      setUser(user) // the token returned with a successful login is saved to the application's state
      setUsername('')
      setPassword('')
    }catch (error){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
}

  const loginForm = () => {
    return (
      <Togglable buttonLabel = 'login'>
        <LoginForm 
          username = {username}
          password = {password}
          handleUsernameChange = {({ target }) => setUsername(target.value)}
          handlePasswordChange = {({ target }) => setPassword(target.value)}
          handleLogin = {handleLogin}
          />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {/*redenders the forms conditionally */}
      {!user && loginForm()} {/* = if the not user show the login form to the user to login*/}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel = 'create note'>
            <NoteForm 
              createNote = {addNote}
              />
          </Togglable>
        </div>
      )}
      <hr />

      {/*importance filtering */ }

      <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      </div>
      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
            note={note}
            toggleImportance={ () => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      
    </div>
  )
}
export default App
