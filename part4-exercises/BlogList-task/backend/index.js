import dotenv from 'dotenv'
import connectDB from './mongodb.js'
import app from './app.js'
import logger from './utils/logger.js'

dotenv.config()
connectDB()

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})
