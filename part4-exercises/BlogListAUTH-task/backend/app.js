import dotenv from 'dotenv'
import connectDB from './mongodb.js'
import express from 'express'
import cors from 'cors'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import blogRouter from './controllers/blog.js'
import userRouter from './controllers/user.js'
import loginRouter from './controllers/login.js'

dotenv.config()
connectDB()

const app = express()
// app.use(express.static('dist'))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app