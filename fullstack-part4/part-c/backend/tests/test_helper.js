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
    await note.save() // saves created note in db
    await note.deleteOne() // imediately deletes created the saved object 

    return note._id.toString() // returns the ID of the now-deleted note
}

// this function checks the notes stored in the database
const notesInDb = async () => {
    const notes = await Note.find({}) // fetches all notes in the db
    return notes.map(note => note.toJSON()) // converts them to JSON objects 
}

export default{ initialNotes, nonExistingId, notesInDb }