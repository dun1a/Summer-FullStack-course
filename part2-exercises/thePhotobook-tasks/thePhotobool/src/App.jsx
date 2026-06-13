import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Hoshi', number: '123-456-7890', id: 1},
    { name: 'Dunia', number: '123-456-7890', id: 2}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1

    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
  

  return (
    <div>
      <h1>Phonebook</h1>
      <p>Filter shown with <input value={nameFilter} onChange={(e)=> setNameFilter(e.target.value)}/></p>

      <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/> </p>
          <p>number: <input value={newNumber} onChange={(e)=> setNewNumber(e.target.value)} /> </p>
          <button type='submit'>add</button>
        </div>

      </form>
      <h2>Numbers</h2>
        {personsToShow.map((person,index) => <p key={index}>{person.name}: {person.number}</p>)}
    </div>
  )
}

export default App
