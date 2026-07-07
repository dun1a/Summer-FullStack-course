import mongoose from 'mongoose'

const connectDB = async () => {
    const conn = await mongoose.connect("mongodb+srv://dun1aa1nud:Bd7TlNBGwAJnlEzr@cluster0.ipd6vx.mongodb.net/Summer-fullstack")
    console.log(`connected to database`)
}

export default connectDB;

