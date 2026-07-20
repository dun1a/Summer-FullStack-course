import dotenv from 'dotenv'
import connectDB from './mongodb.js'
import express from 'express'
import cors from 'cors'
import logger from './utlis/logger.js'
import middleware from './utlis/middleware.js'
import notesRouter from './controllers/notes.js'
import usersRouter from './controllers/users.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.static('dist'))
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
