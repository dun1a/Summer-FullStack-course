import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import connectDB from './mongo.js';
import mongoose from 'mongoose'
import Person from './model/PersonsModel.js'

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json())
app.use(express.static('dist'))

let phonebook = [ ]

app.get('/api/persons', (request,response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    
})

app.get('/info', (request, response) => {
    const html = `
    <p>Phoneboook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>
    `
    response.send(html)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
    })
    //const id = request.params.id
    //const person = phonebook.find(p => p.id === id)
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))

    //const id = request.params.id
    //phonebook = phonebook.filter(p => p.id !== id)
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

    // save person according to the Person schema created
    const newPerson = new Person({
        //id: Math.floor(Math.random() * 10000).toString(),
        name: body.name,
        number: body.number
    })

    newPerson.save().then(savedPerson => {
        console.log('saved person', savedPerson)
        response.json(savedPerson)
    })
    // phonebook = phonebook.concat(newPerson)
    // console.log(phonebook)
    // response.json(newPerson)
})

app.put('/api/persons/:id', (request,response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(request.params.id)
    .then(person => {
        if(!person){
            return response.status(404).end()
        }

        person.name = name
        person.number = number
        
        return person.save()
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})