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


blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body

    // before adding middleware to extract the user id
    // check token validity and decode the token
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if(!decodedToken.id){
    //     return response.status(401).json({
    //         error: 'token invalid'
    //     })
    // }

    // const user = await User.findById(decodedToken.id)


    // after adding middleware userExtractor
    // get user from request object
    const user = await User.findById(request.user.id)

    if(!user){
        return response.status(404).json({
            error: 'user not found'
        })
    }

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: request.user.id
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


// delete blog operation but blog can only be deleted by the user who created it
blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = await User.findById(request.user.id)

    console.log('blog id', blog.id)
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