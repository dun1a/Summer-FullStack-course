import Router from 'express'
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

notesRouter.post('/', async (request, response) => {
  const body = request.body

  // check for user so that user information is sent in the userId field to the request body
  const user = await User.findById(body.userId)

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