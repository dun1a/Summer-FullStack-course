console.log("Simple web server");
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

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
    response.json(notes)
})

// fetching a single note by id, the id is passed as a parameter in the url, and we can access it using request.params.id
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)

    // if there is a note fetch it, otherwise return a 404 error
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
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

    const newNote = {
        content: body.content,
        important: body.important || false,
        id: generateId() 
    }

    notes = notes.concat(newNote) // adds new note to existing notes array in a brand new array 

    console.log(newNote)
    response.json(newNote)
})


// deleting source
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

// binds the http server assigned to the app variable to listen to HTTP requests sent to port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
