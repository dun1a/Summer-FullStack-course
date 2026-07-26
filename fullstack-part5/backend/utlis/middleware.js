import logger from './logger.js'

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message) // catches whatever error caught in next(error) in a different place and prints the message

  if(error.name === 'CastError'){ // when providing an invalid MongoDB id
    return response.status(400).send({
      error: 'malformatted id'
    })
  }else if (error.name === 'ValidationError'){ // when data doesn't pass the schema validation
    return response.status(400).json( {
      error: error.message
    })
  }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }else if( error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

export default {
  unknownEndpoint,
  errorHandler
}

