import Router from 'express'
import Blog from '../model/blogModel.js'
import User from '../model/userModel.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne()

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


blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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