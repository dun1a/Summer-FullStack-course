import Note from '../model/NoteModel.js'

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false
    }, 
    {
        content: 'Browser can execute only Javascript',
        important: true
    }
]

// this function is used to create a database object ID that does not belong to any note object in the database
const nonExistingId = async () => {
    const note = new Note({
        content: 'willremovethissoon'
    })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

// this function checks the notes stored in the database
const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

export { initialNotes, nonExistingId, notesInDb }