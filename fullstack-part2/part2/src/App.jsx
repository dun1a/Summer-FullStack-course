import { useState } from 'react'
import { useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'

// // const Note = ({note}) => {

// //   return (
// //     <li>{note.content}</li>
// //   )
// // }

// ////////////// part2 a
// //////// javascript array methods
// const App = (props) => {
//   const { notes } = props
//   // or use const App ({notes}) => { because we are onlu interested in the 'notes' of the props

//   const result = notes.map(note => note.id)
//   console.log(result)
//   return (
//     // <div>
//     //   <h1>Notes!</h1>
      
//     //   <ul>
//     //     <li>{notes[0].content}</li>
//     //     <li>{notes[1].content}</li>
//     //     <li>{notes[2].content}</li>
//     //   </ul>
//     // </div>

//     // more practical way to render the list of notes:
//     <div>
//       <h1>Notes!</h1>
//       <ul>
//         {/* (note,i) key{i} is not recommended, but it works when there is no ids */}
//        {notes.map(note => 
//        <Note key={note.id} note={note}/>)}
//       </ul>
//     </div>
//   )
// }
/////////////////////////////


// part 2 b
// saving notes in the component state

// const App = () => {
//   // uses useState function to initialize the piece of state stored in 'notes' with the array of notes passed in props
//   const [notes, setNotes] = useState(props.notes) // to initialize as empty array: useState([])
//   const [newNote, setNewNote] = useState('a new note...') // a state variable to sote user-submitted input
//   const [showAll, setShowAll] = useState(true) // using this state to enable fintering display functionality
//   // creating a function to handle adding new notes
//   const addNote = (event) => {
//     event.preventDefault() // to prevent the default behavior of the form submission, which is to reload the page
//     console.log('button clicked', event.target)
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5, // to randomly assign the importance of the note
//       id: String(notes.length + 1)
//     }
//     setNotes(notes.concat(noteObject)) // ensures the original array is not changed, by creating a new array with the added note
//     setNewNote('')
//   }
//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   const notesToShow = showAll
//    ? notes 
//    : notes.filter(note => note.important)
//   return (
//     <div>
//       <h1>Notes</h1>
//       <button onClick={() => setShowAll(!showAll)}>
//         show {showAll ? 'important' : 'all'}
//       </button>
//       <ul>
//         {notesToShow.map(note => 
//           <Note key={note.id} note={note}/>
//         )}
//       </ul>
      
//       <form onSubmit={addNote}>
//         <input value = {newNote} onChange={handleNoteChange}/>
//         <button type='submit'>save</button>
//       </form>
//     </div>
//   )
// }


// part 2 c
// fetching data from the server using axios

// const App = () => {
//   // uses useState function to initialize the piece of state stored in 'notes' with the array of notes passed in props
//   const [notes, setNotes] = useState([]) // to initialize as empty array: useState([])
//   const [newNote, setNewNote] = useState('a new note...') // a state variable to sote user-submitted input
//   const [showAll, setShowAll] = useState(true) // using this state to enable fintering display functionality
  
//   useEffect(() => { // takes two parameters: 1. the function (the effect itself), which runs only once the component has been rendered for the first time
//     // 2. how many times the effeect should run
//     console.log('effect')
//     axios
//     .get('http://localhost:3001/notes') // initiates fetching data
//       .then(response => { // event handler that is called when the promise returned by axios.get is fulfilled, and the response is passed as an argument to the handler function
//         console.log('promise fulfilled')
//         setNotes(response.data) // updates the state variable 'notes' with the data received from the server, which is accessed through response.data
//       })
//     }, [])
//     console.log('render', notes.length, 'notes')
    
//     // use effect can also be written like this:
//     //useEffect(() => {
//     //   console.log('effect')

//     //   const eventHandler = response => {
//     //     console.log('promise fulfilled')
//     //     setNotes(response.data)
//     //   }

//     //   const promise = axios.get('http://localhost:3001/notes')
//     //   promise.then(eventHandler)
//     // }, [])

//   // sending data to the server 
//   // creating a function to handle adding new notes
//   const addNote = (event) => {
//     event.preventDefault() // to prevent the default behavior of the form submission, which is to reload the page

//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5 // to randomly assign the importance of the note
//       //id: Math.random() < 0.5, we dont need id property (post task)
//     }
//     // sending data to the server 
//     axios.post('http://localhost:3001/notes', noteObject)
//     .then(response => {
//       console.log(response)
//       setNotes(notes.concat(response.data)) // updates the App component to show the added notes
//     setNewNote('')
//     })
//     // setNotes(notes.concat(noteObject)) // ensures the original array is not changed, by creating a new array with the added note
//     // setNewNote('')
//   }
//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   const notesToShow = showAll
//    ? notes 
//    : notes.filter(note => note.important)

//    // adding button to toggle note importance
//   const toggleImportanceOf = (id) => {
//     const url = `http://localhost:3001/notes/${id}`
//     const note = notes.find(n => n.id === id) // used to find the note we want to modify, by searching the notes array for the note with the matching id
//     const changedNote = {...note, important: !note.important} // after that we create a new object that is an exact copy of the old note (without the 'important' value)
//     console.log('importance of', id, ' needs to be toggled')

//     axios.put(url, changedNote)
//     .then(response => {
//       // creating a new array of notes that includes the updated note, and updating the state variable 'notes' with this new array
//       setNotes(notes.map(note => note.id === id ? response.data : note))
//     })
//   } 
//   return (
//     <div>
//       <h1>Notes</h1>
//       <button onClick={() => setShowAll(!showAll)}>
//         show {showAll ? 'important' : 'all'}
//       </button>
//       <ul>
//         {notesToShow.map(note => 
//           <Note key={note.id} 
//           note={note}
//           toggleImportance={ () => toggleImportanceOf(note.id)}/>
//         )}
//       </ul>
      
//       <form onSubmit={addNote}>
//         <input value = {newNote} onChange={handleNoteChange}/>
//         <button type='submit'>save</button>
//       </form>
//     </div>
//   )
// }
// export default App


//////////////////////7
// part 2 d
// fetching data from the server using axios

const App = () => {
  // uses useState function to initialize the piece of state stored in 'notes' with the array of notes passed in props
  const [notes, setNotes] = useState([]) // to initialize as empty array: useState([])
  const [newNote, setNewNote] = useState('a new note...') // a state variable to sote user-submitted input
  const [showAll, setShowAll] = useState(true) // using this state to enable fintering display functionality
  
  useEffect(() => { // takes two parameters: 1. the function (the effect itself), which runs only once the component has been rendered for the first time
    // 2. how many times the effeect should run
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
    
    }, [])
    console.log('render', notes.length, 'notes')
    
       // adding button to toggle note importance
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id) // used to find the note we want to modify, by searching the notes array for the note with the matching id
    const changedNote = {...note, important: !note.important} // after that we create a new object that is an exact copy of the old note (without the 'important' value)
    console.log('importance of', id, ' needs to be toggled')

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch(error => {
      alert(`the note '${note.content}' was already deleted from server`)
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
