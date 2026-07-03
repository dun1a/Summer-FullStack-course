import express from 'express';
import cors from 'cors';

console.log("Testing testing testing")
const app = express();
app.use(cors());
app.use(express.json())

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request,response) => {
    response.json(phonebook)
})

app.get('/info', (request, response) => {
    const html = `
    <p>Phoneboook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>
    `
    response.send(html)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebook.find(p => p.id === id)
    
    if(person){
        response.json(person)
    }else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    if(phonebook.find(p => p.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: Math.floor(Math.random() * 10000).toString(),
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(newPerson)
    console.log(phonebook)
    response.json(newPerson)
})

const PORT = 3001;
app.listen(PORT)
console.log(`Server running on port ${PORT}`)