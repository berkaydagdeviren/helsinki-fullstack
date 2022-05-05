import axios from 'axios'
import { useEffect, useState } from 'react'
import PersonService from './services/persons'
const Filter = ({ filterName, handleFilterName }) => {
  return (
    <div>
      <p style={{ display: 'inline-block' }}> filter shown with  :   </p>
      <input
        value={filterName}
        onChange={handleFilterName}
      />
    </div>
  )
}

const PersonForm = ({ addNewPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <div>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div>
          <button
            type="submit">add</button>
        </div>
      </form>
    </div>
  )
}


const Persons = ({ filterName, persons, giveFilterResults, deletePerson }) => {

  return (

    filterName === '' ?
      persons.map(person => <p key={person.name}>
        {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>DELETE</button>
      </p>
      ) : giveFilterResults().map(person =>
        <div>
          <p key={person.name}>{person.name} {person.number}  </p>

        </div>)

  )
}

const Notification = ({message}) => {
  
  if (message === null) {
    return null
  }
  if (message.includes('ERROR')) {
    return (<div className='error'>
      {message}
    </div>)
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    PersonService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    })
  }, [])



  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [message, setMessage] = useState(null)
  

  const handleNewName = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }
  const handleFilterName = (event) => {
    setfilterName(event.target.value)

  }
  const giveFilterResults = () => {
    const filteredNames = persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()))
    return filteredNames
  }
  const addNewPerson = (e) => {
    e.preventDefault();
    const NewPerson = {
      name: newName,
      number: newNumber
    }
    console.log(newName, persons)
    persons.find(person => person.name === newName)
      ? window.confirm(`${newName} is already added to phonebook, do you want to change the number?`) &&

      PersonService.update(persons.find(person => person.name === newName).id, NewPerson)
        .then(returnedPerson => setPersons(persons.map(person => person.name === newName ? returnedPerson : person))).catch((error) => {
          console.log(error)
          setMessage(
            `ERROR: ${newName} was already deleted from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }) &&
        setMessage(`${newName}'s number has been succesfully changed.`) &&
        setTimeout(() => setMessage(null), 5000)
        
      :

      PersonService.create(NewPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        
        console.log(persons)
        setNewName('');
        setNewNumber('');
        setMessage(`${newName} has been succesfully added.`) 
        setTimeout(() => setMessage(null), 5000)
      }).catch(error => {
        setMessage(
           `ERROR: ${error.response.data.error}`
        )
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const deletePerson = (id) => {

    if (window.confirm(`Are you sure you want to delete ${persons.find(person => person.id === id).name}?`)) {
      PersonService.delete_person(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))

      })
      setMessage(`${persons.find(person => person.id === id).name} has been succesfully deleted.`) 
          setTimeout(() => setMessage(null), 5000)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <PersonForm addNewPerson={addNewPerson} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>

      <Persons filterName={filterName} giveFilterResults={giveFilterResults} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App