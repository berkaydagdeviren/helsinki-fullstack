const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const app = express()
const Person = require('./models/person')
app.use(express.json())
const cors = require('cors')

app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))


app.get('/api/persons', (req, res) => {
  //res.json(persons)
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  console.log(req.params.id)
  Person.findById(req.params.id).then(result => {
    if (result) {
      res.json(result)
    }
    else {
      res.status(404).end()
    }
  })
    .catch(error => {
      next(error)
    })
})



app.get('/info', (res) => {
  const date = new Date()
  const info = `<p>Phonebook has info for ${Person.length} people</p>`
  res.send(info + date)
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body



  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })
  console.log(newPerson)

  newPerson.save().then(savedPerson => {
    res.json(savedPerson), console.log('SAVED PERSON: ', savedPerson)
  })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body


  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {

  Person.findByIdAndDelete(req.params.id).then(result => {
    res.status(204).end(), console.log('DELETED PERSON: ', result)
  })
    .catch(error => {
      next(error)
    })

})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {    return response.status(400).json({ error: error.message })  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})