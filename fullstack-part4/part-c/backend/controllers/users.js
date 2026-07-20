import bcrypt from 'bcrypt'
import Router from 'express'
import User from '../model/userModel.js'

const usersRouter = Router()

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username, 
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    console.log('user saved to database')
    response.status(201).json(savedUser)
})

export default usersRouter
