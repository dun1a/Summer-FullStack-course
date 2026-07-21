import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Router from 'express'
import User from '../model/userModel.js'

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username }) // search for user in the database by the username attached to the request
    // then check password 
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) // compare the password and the passwordhash

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    // if everything goes well, token is created with jwt.sign() method
    // token contains username and user id in a digitally signed form 
    ///// make it so that the token expires in 1 hour
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60*60 }
    )

    response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginRouter