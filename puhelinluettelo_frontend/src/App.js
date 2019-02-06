import React, { useState, useEffect } from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [message, setMessage] = useState({
    message: '',
    isError: true
  })

  useEffect(() => updatePersonList(), [])

  const updatePersonList = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setTimedMessage('Haku epäonnistui', true)
      })
  }

  const setTimedMessage = (newMessage, isError) => {
    setMessage({
      message: newMessage,
      isError: isError
    })
    setTimeout(() => {
      setMessage({
        message: '',
        isError: false
      })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newPhone,
    }
    const current = persons.find(person => person.name === newName)
    if (!current) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setTimedMessage(`Henkilön ${returnedPerson.name} lisäys onnistui`, false)
      })
      .catch(error => {
        setTimedMessage('Henkilön lisäys epäonnistui', true)
      })
    } else if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService
          .update(current.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map( person => person.id !== current.id ? person : returnedPerson))
            setTimedMessage(`Henkilön ${returnedPerson.name}  päivitys onnistui`, false)
      })
      .catch(error => {
        setTimedMessage(`Henkilö ${newName} oli jo poistettu`, true)
        updatePersonList()
      })
    }
    setNewName('')
    setNewPhone('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const removePerson = id => {
    const p = persons.find(person => {
      return person.id === id
    })
    if (p && window.confirm(`Poistetaanko ${p.name}?`)) {
      personService
        .remove(id)
        .then(initialPersons => {
          setPersons(initialPersons)
          setTimedMessage(`Henkilön ${p.name}  poisto onnistui`, false)
        })
        .catch(error => {
          setTimedMessage('Henkilön poisto epäonnistui', true)
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={message} />
      <Filter filter={filter} filterChange={handleFilterChange} />

      <h3> lisää uusi </h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <h3>Numerot</h3>
      <Persons
        persons={persons}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )

}

export default App