import 'dotenv/config'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const connectDB = async () => {
  console.log('connecting to:', MONGODB_URI)
  await mongoose.connect(MONGODB_URI)
  console.log('connected to database')
}

export default connectDB

