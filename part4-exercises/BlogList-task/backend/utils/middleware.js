import logger from './logger.js'

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if(error.name === 'CastError'){
        return response.status(400).send({
            error: 'malformatted id'
        })
    }else if(error.name === 'ValidationError'){
        return response.status(400).json({
            error: error.message
        })
        // error handling for duplicates 
    }else if(error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
        return response.status(400).json({
            error: 'username must be unique'
        })
    }
    next(error)
}

export default {
    unknownEndpoint,
    errorHandler
}