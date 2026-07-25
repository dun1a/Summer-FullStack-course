import Blog from '../model/blogModel.js'
import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const initialBlogs = [
    {
        title: 'First Blog',
        author: 'John Doe',
        url: 'http://example.com/first-blog',
        likes: 5
    },
    {
        title: 'Second Blog',
        author: 'Jane Smith',
        url: 'http://example.com/second-blog',
        likes: 10
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const loginAndToken = async (api, username, password) => {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        name: 'test user',
        passwordHash
    })
    await user.save()
    console.log('user saved:', user.username)

    const login = await api
    .post('/api/login')
    .send({
        username,
        password
    })
 
    return login.body.token
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

export default { initialBlogs, blogsInDb, usersInDb, loginAndToken }