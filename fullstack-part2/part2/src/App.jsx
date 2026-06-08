import { useState } from 'react'
import Note from './components/Note'

// const Note = ({note}) => {

//   return (
//     <li>{note.content}</li>
//   )
// }

////////////// part2
//////// javascript array methods
const App = (props) => {
  const { notes } = props
  // or use const App ({notes}) => { because we are onlu interested in the 'notes' of the props

  const result = notes.map(note => note.id)
  console.log(result)
  return (
    // <div>
    //   <h1>Notes!</h1>
      
    //   <ul>
    //     <li>{notes[0].content}</li>
    //     <li>{notes[1].content}</li>
    //     <li>{notes[2].content}</li>
    //   </ul>
    // </div>

    // more practical way to render the list of notes:
    <div>
      <h1>Notes!</h1>
      <ul>
        {/* (note,i) key{i} is not recommended, but it works when there is no ids */}
       {notes.map(note => 
       <Note key={note.id} note={note}/>)}
      </ul>
    </div>
  )
}

export default App
