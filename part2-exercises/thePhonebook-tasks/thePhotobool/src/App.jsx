import { useState } from 'react'
import {useEffect} from 'react'
import phonebookService from './services/Phonebook.js'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

function App() {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    // fetch initial data from the server using the phonebookService
    phonebookService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

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
    // send/create new person and send to server 
    phonebookService
    .create(personObject)
    .then(returnedPerson =>  {
      setPersons(persons.concat(returnedPerson))
    })
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
