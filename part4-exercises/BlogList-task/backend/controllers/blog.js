import Router from 'express'
import Blog from '../models/blogModel.js'

const blogRouter = Router()

blogRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
    const body = request.body

    if(!body.title || !body.author){
        return response.status(400).json({
            error: 'title or author missing'
        })
    }

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })

    newBlog.save().then((savedBlog) => {
        response.json(savedBlog)
    })
    .catch((error) => next(error))
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