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
  
  const deletePerson = (id) => {
    console.log('delete person with id', id)
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Are you sure you want to delete person with id ${id}?`)){
      phonebookService
      .update(id, person)
      .then((returnedPerson) => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
    return
    
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
