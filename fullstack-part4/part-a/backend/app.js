import express from 'express'
import cors from 'cors'
import logger from './utlis/logger.js'
import middleware from './utlis/middleware.js'

import notesRouter from './controllers/notes.js'

const app = express()

app.use(express.static('dist'))
app.use(express.json())

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// binds the http server assigned to the app variable to listen to HTTP requests sent to port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

export default app
