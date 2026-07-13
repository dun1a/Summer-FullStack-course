import express from 'express'
import cors from 'cors'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

import blogRouter from './controllers/blog.js'

const app = express()
// app.use(express.static('dist'))
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app