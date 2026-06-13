import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Hoshi',
      number: '123-456-7890'
     }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  console.log(newName)

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber

    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          <p>name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/> </p>
          <p>number: <input value={newNumber} onChange={(e)=> setNewNumber(e.target.value)} /> </p>
          <button type='submit'>add</button>
        </div>

      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person,index) => <p key={index}>{person.name}: {person.number}</p>)}
      </ul>

    </div>
  )
}

export default App
