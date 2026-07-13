import mongoose from 'mongoose'
import logger from './utils/logger.js'

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    logger.info('Connected to database')
}

export default connectDB