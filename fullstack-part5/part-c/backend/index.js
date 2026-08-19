import app from './app.js'
import logger from './utlis/logger.js'

// whenever Express gets an HTTP GET request
// it will first check if the dist directory contains a file
// corresponding to the request's address. If a correct file is found, Express will return it.

// binds the http server assigned to the app variable to listen to HTTP requests sent to port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
