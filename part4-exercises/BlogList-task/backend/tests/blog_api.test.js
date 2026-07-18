import {test, after, beforeEach} from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../model/blogModel.js'
import helper from './blog_helper.js'

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({}) // clear database at the beginning
    await Blog.insertMany(helper.initialBlogs) // add initial blogs
})

test.only('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test.only('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})
