import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './mongodb.js'
import mongoose from 'mongoose'
import Note from './model/NoteModel.js'

dotenv.config(); 
const app = express()
connectDB()
app.use(cors())
app.use(express.json())
// whenever Express gets an HTTP GET request
// it will first check if the dist directory contains a file 
// corresponding to the request's address. If a correct file is found, Express will return it.
app.use(express.static('dist')) 

let notes = []

// dont need this here rn //
// createServer creates a new server
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
// END //

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        notes.forEach(note => {
            console.log(note)
        })
        response.json(notes)
    })

})

// fetching a single note by id, the id is passed as a parameter in the url, and we can access it using request.params.id
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
    .then(note => {
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
    })
    //const id = Number(request.params.id)
    //console.log(id)
    //const note = notes.find(note => note.id === id)

    // if there is a note fetch it, otherwise return a 404 error
    .catch(error => {
        response.status(400).json({error: 'malformatted id'})
    })
})


// adding a new note
const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) : 0 // ... unpacks the array so Math.max can compare with all the ids and returns the largest number of the array
    return String(maxId + 1)
}
app.post('/api/notes', (request, response) => {

    const body = request.body

    if(!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const newNote =  new Note({
        content: body.content,
        important: body.important || false,
        //id: generateId() 
    })
    // save method for saving created objects to the databse
    newNote.save().then(savedNote => {
        console.log('note saved!')
        console.log(savedNote)
        response.json(savedNote)
    })
})

// deleting source
app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))

    //const id = Number(request.params.id)
    //notes = notes.filter(note => note.id !== id)

    //response.status(204).end()
})

// binds the http server assigned to the app variable to listen to HTTP requests sent to port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
