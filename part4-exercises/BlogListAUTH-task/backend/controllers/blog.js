import Router from 'express'
import jwt from 'jsonwebtoken'
import Blog from '../model/blogModel.js'
import User from '../model/userModel.js'
import middleware from '../utils/middleware.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

// this function isolated the token from the authorization header
// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')){
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogRouter.post('/', async (request, response) => {
    const body = request.body

    // check token validity and decode the token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({
            error: 'token invalid'
        })
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

   const savedBlog = await newBlog.save()
   // save the created blog in the user object
   user.blogs = user.blogs.concat(savedBlog._id)
   await user.save() // save the user, after the change has been made

   response.status(201).json(savedBlog)
})


blogRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then((blog) => {
        if(blog){
            response.json(blog)
        }else{
            response.status(404).end()
        }
    })
    .catch((error) => next(error))
})


// blogRouter.delete('/:id', async (request, response) => {
//     await Blog.findByIdAndDelete(request.params.id)
//     response.status(204).end()
// })

// delete blog operation but blog can only be deleted by the user who created it
blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    const user = await User.findById(decodedToken.id)

    if(!user){
        return response.status(404).json({
            error: 'user not found'
        })
    }

    if(!blog) {
        return response.status(404).json({
            error: 'blog not found'
        })
    }

    if (blog.user.toString() === user.id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }else{
        return response.status(403).json({
            error: 'blog cannot be deleted'
        })
    }

})

blogRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blogToUpdate = await Blog.findById(request.params.id)

    if(!blogToUpdate){
        return response.status(404).end()
    }

    blogToUpdate.title = title
    blogToUpdate.author = author
    blogToUpdate.url = url
    blogToUpdate.likes = likes

    const updatedblog = await blogToUpdate.save()
    response.json(updatedblog)
})

export default blogRouter