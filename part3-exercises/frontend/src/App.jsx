import { useState } from 'react'
import {useEffect} from 'react'
import phonebookService from './services/Phonebook.js'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'

function App() {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const [message, setMessage] = useState(null)

  useEffect(() => {
    // fetch initial data from the server using the phonebookService
    phonebookService
    .getAll()
    .then(initialPersons => {
      //console.log('initial persons', initialPersons)
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedPersonNumber = 
        {
          ...person, 
          number: newNumber
        }

        phonebookService
        .update(person.id, changedPersonNumber)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
        setMessage(`${newName}'s number has been updated`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
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
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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
      <Notification message={message} />
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
