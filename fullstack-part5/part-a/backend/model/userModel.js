import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    passwordHash: String,
    // ids of the notes are stored within the user document as an array of Mongo ids
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId, // means it refers to another document 
            ref: 'Note' // specifies the name of the model that is being referenced
        }
    ],
})

// data will be saved like:
// [
//   {
//     username: 'mluukkai',
//     _id: 123456,
//     notes: [221212, 221255],
//   },
//   {
//     username: 'hellas',
//     _id: 141414,
//     notes: [221244],
//   },
// ]

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

export default User