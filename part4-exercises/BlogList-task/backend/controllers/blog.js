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

blogRouter.put('/:id', (request, response, next) => {
    const { title, author, url, likes } = request.body

    Blog.findById(request.params.id)
    .then((blog) => {
        if(!blod){
            return response.status(404).end()
        }

        blog.title = title
        blog.author = author
        blog.url = url
        blog.likes = likes

        return blog.save().then((updatedBlog) => {
            response.json(updatedBlog)
        })
    })
    .catch((error) => next(error))
})

export default blogRouter