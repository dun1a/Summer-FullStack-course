import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Router from 'express'
import User from '../model/userModel.js'

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username}) // search for user from the database by the username
    // chack the password
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({ // status code 401 = unauthorized
            error: 'invalid username or password'
        })
    }

    // if everything goes well and the password is correct, the token is created using jwt.sign() method
    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginRouter 