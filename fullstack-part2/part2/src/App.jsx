import { useState } from 'react'
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

const App = (props) => {
  // uses useState function to initialize the piece of state stored in 'notes' with the array of notes passed in props
  const [notes, setNotes] = useState(props.notes) // to initialize as empty array: useState([])
  const [newNote, setNewNote] = useState('a new note...') // a state variable to sote user-submitted input
  const [showAll, setShowAll] = useState(true) // using this state to enable fintering display functionality
  // creating a function to handle adding new notes
  const addNote = (event) => {
    event.preventDefault() // to prevent the default behavior of the form submission, which is to reload the page
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, // to randomly assign the importance of the note
      id: String(notes.length + 1)
    }
    setNotes(notes.concat(noteObject)) // ensures the original array is not changed, by creating a new array with the added note
    setNewNote('')
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
          <Note key={note.id} note={note}/>
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
