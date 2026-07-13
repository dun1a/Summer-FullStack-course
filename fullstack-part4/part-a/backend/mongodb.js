import mongoose from 'mongoose'


const connectDB = async () => {
  console.log('connecting to:', process.env.MONGODB_URI)
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('connected to database')
}

export default connectDB

