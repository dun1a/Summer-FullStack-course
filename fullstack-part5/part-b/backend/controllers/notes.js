import Router from 'express'
import jwt from 'jsonwebtoken'
import Note from '../model/noteModel.js'
import User from '../model/userModel.js'

const notesRouter = Router()
// before async/await
// notesRouter.get('/', (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes)
//   })
// })

// using async/await
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id',async (request, response) => {
  const note =await Note.findById(request.params.id)
 
  if(note){
    response.json(note)
  }else{
    response.status(404).end()
  }
})


// making creating notes possible only with logged-in users
const getTokenFrom = request => { // helper function to extract token from request headers
  const auhtorization = request.get('authorization') // gets Authorization header from the request 
  if (auhtorization && auhtorization.startsWith('Bearer ')){ // checks that header exists and checks if it starts with 'Bearer'
    return auhtorization.replace('Bearer ', '') // removes the 'Bearer' and returns only the raw token string
  }
  return null // if there is no authorization header or it doesn't start with 'Bearer', return null
}

notesRouter.post('/', async (request, response) => {
  const body = request.body

  // verify the decode the token using the SECRET key
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET) // contains the username and id fields
  if(!decodedToken.id){ // if token doesn't have id = token invalid => throw error
    return response.status(401).json({
      error: 'token invalid'
    })
  }
  const user = await User.findById(decodedToken.id) 

  // check for user so that user information is sent in the userId field to the request body
  //const user = await User.findById(body.userId)

  if(!user) {
    return response.status(400).json({
      error: 'userid missing or not valid'
    })
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  const savedNote = await newNote.save()
  user.notes = user.notes.concat(savedNote._id) // add the created note's id to the note array in the user object
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then((note) => {
      if(!note){
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

export default notesRouter