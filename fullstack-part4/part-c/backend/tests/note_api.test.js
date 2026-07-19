import {test, after, beforeEach} from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import helper from './test_helper.js'
import Note from '../model/NoteModel.js'

// tests only use the Express application defined in the app.js file
// which does NOT listen to any ports


// run npm test -- --test-only when you have test.only in the test files
// run npm test -- test/fileName.test.js to run a specific test file

const api = supertest(app)

// before adding test_helper.js
// beforeEach(async () => {
//     await Note.deleteMany({}) // database cleared at the beginning
//     let noteObject = new Note(initialNotes[0]) // add new note
//     await noteObject.save() // save first note
//     noteObject = new Note(initialNotes[1]) // add second note
//     await noteObject.save() // save second note
// })

// after adding test_helper.js
beforeEach(async () => {
    await Note.deleteMany({}) // database cleard at the beginning 
    console.log('cleared database')
    await Note.insertMany(helper.initialNotes)

    // does same this as the code above 
    // let noteObject = new Note(helper.initialNotes[0]) // add new note
    // await noteObject.save() // save first added note

    // noteObject = new Note(helper.initialNotes[1]) // add second note
    // await noteObject.save() // save second note object
})

test.only('notes are returned as json', async () => {
    await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/) // means regular expression or regex
})

test.only('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length,helper.initialNotes.length)
})

test.only('a specific note is within the returned notes', async () => {
   const notesAtStart = await helper.notesInDb() // fetches notes in the database
   const noteToView = notesAtStart[0] // selects the first note in the database

   const resultNote = await api // checks if the note fetched from the database is the same one as the one fetched from the api
   .get(`/api/notes/${noteToView.id}`) // fetches the note from the api using the id of the note fetched from the database
   .expect(200)
   .expect('Content-type', /application\/json/)

   assert.deepStrictEqual(resultNote.body, noteToView) // checks if the note fetched from the database is the same as the one fetched from the API
   // deepStrictequal checks the object's content and structure
})

test.only('fails with statuscode 404 if note does not exits', async () => {
    const valiNoneexistingId = await helper.nonExistingId() 

    await api
    .get(`/api/notes/${valiNoneexistingId}`)
    .expect(404)
})

test.only('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445' // 23 characters instead of 24

    await api
    .get(`/api/notes/${invalidId}`)
    .expect(400)
})

// adding a new note
test.only('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
   .expect('Content-type', /application\/json/)

    const response = await api.get('/api/notes')

    const notesInDb = await helper.notesInDb()
    assert.strictEqual(notesInDb.length, helper.initialNotes.length + 1)

    const contents = notesInDb.map(note => note.content)

    assert(contents.includes('async/await simplifies making async calls'))
})

// adding note with no content
test.only('note with no content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const response = await api.get('/api/notes')

    const notesInDb = await helper.notesInDb()

    assert.strictEqual(notesInDb.length, helper.initialNotes.length)
})

// for deleting a note
test.only('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb() // takes snapshot of database before the deleting, to know what there was at the beginning
    const noteToDelete = notesAtStart[0] // picks first note object as the one to delete

    await api // 
        .delete(`/api/notes/${noteToDelete.id}`) // sends delete request to the api wiht the notes id
        .expect(204) // expects 204 No content response = deletion successful

    const notesAtEnd = await helper.notesInDb() // takes another snapshot of db after the delete operation to compare with before

    const id = notesAtEnd.map(note => note.id) // gets all remaining ids
    assert(!id.includes(noteToDelete.id)) // checks if deleted note's id is no longer in the db (!id = assert that this is NOT included)

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1 ) // confirms that  the database has now exactly one less note than before
})

after(async () => {
    await mongoose.connection.close()
})