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

test.only('blogs have id property not _id', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body
    blogs.forEach(blog => {
        assert(blog.id)
        assert(!blog._id)
    })
})
    
test.only(' a valid blog can be added to db', async () => {
    const newBlog = {
        title: 'New blog',
        author: 'new author',
        url: 'http://example.com/new-blog',
        likes: 12
    }

    await api
    .post('/api/blogs') // send POST request to /api/blogs
    .send(newBlog) // attaches newBlog object as the request body ( data to send to server)
    .expect(201) 
    .expect('Content-type', /application\/json/) // assert the response returns as JSON

    const blogsAfter = await helper.blogsInDb() // fetches all blogs currently in the database adter the POST request

    assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)
})

test.only('if likes property is missing, it results to 0', async () => {
    const newBlog = {
        title: 'New blog',
        author: 'new author',
        url: 'http://example.com/new-blog'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()

    const noLikesBlog = blogsAfter.find(blog => blog.title === newBlog.title)

    assert.strictEqual(noLikesBlog.likes, 0)
})

test.only('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    //const ids = blogsAtEnd.map(blog => blog.id)
    assert(!ids.includes(blogToDelete.id))
})


after(async () => {
    await mongoose.connection.close()
})
