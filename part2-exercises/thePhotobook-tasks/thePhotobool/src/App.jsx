import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Hoshi' }
  ])

  const [newName, setNewName] = useState('')
  console.log(newName)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person,index) => <p key={index}>{person.name}</p>)}
      </ul>

    </div>
  )
}

export default App
