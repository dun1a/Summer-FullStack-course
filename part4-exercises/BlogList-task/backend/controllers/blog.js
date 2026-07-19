import Router from 'express'
import Blog from '../model/blogModel.js'

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })

   const savedBlog = await newBlog.save()
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