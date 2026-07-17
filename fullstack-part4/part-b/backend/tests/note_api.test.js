import {test, after, beforeEach} from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Note from '../model/NoteModel.js'

// tests only use the Express application defined in the app.js file
// which does NOT listen to any ports


// run npm test -- --test-only when you have test.only in the test files
// run npm test -- test/fileName.test.js to run a specific test file

const api = supertest(app)

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

// before adding test_helper.js
beforeEach(async () => {
    await Note.deleteMany({}) // database cleared at the beginning
    let noteObject = new Note(initialNotes[0]) // add new note
    await noteObject.save() // save first note
    noteObject = new Note(initialNotes[1]) // add second note
    await noteObject.save() // save second note
})

test.only('notes are returned as json', async () => {
    await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/) // means regular expression or regex
})

test.only('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'), true)
})

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

    const contents = response.body.map(response => response.content)

    assert.strictEqual(response.body.length, initialNotes.length + 1)
    assert(contents.includes('async/await simplifies making async calls'))
})

test.only('note with no content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, initialNotes.length)
})

after(async () => {
    await mongoose.connection.close()
})