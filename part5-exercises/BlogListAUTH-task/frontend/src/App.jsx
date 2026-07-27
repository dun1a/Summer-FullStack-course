import { useState } from 'react'
import { useEffect } from 'react'
import blogService from './services/blogService.js'
import loginService from './services/loginService.js'
import BlogsList from './components/BlogsList.jsx'
import Notification from './components/Notification.jsx'

function App() {

    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log('fetching blogs...')
        blogService.getAll()
        .then(blogs => setBlogs(blogs))
    }, [])

    // useEffect(() => {
    //     const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    //     if(loggedUserJSON) {
    //         const user = JSON.parse(loggedUserJSON)
    //         setUser(user)
    //         blogService.setToken(user.token)
    //     }
    // }, [])

    // login functionality
    const handleLogin = async (event) => {
        event.preventDefault()
        //console.log('Logging in with', username, password)
        try {
            const user = await loginService.login({username, password})
            
            //window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            
            //blogService.setToken(user.token)
            setUser(user)
            console.log('user', user)
            setUsername('')
            setPassword('')
        } catch{
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 2000)
        }
    }

    const loginForm = () => {
        return(
        <form onSubmit = {handleLogin}>
            <div>
                <h2> Login </h2>
                <label>
                    username:
                    <input
                        type = 'text'
                        value = {username}
                        onChange = {({ target }) => setUsername(target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    password:
                    <input
                        type = 'password'
                        value = {password}
                        onChange = {({ target }) => setPassword(target.value)}
                    />
                </label>
            </div>
            <button type = 'submit'> login </button>
        </form>
        )
    }

    return (
        <div>
            <Notification message = {errorMessage} />
            {!user && loginForm()}
            {user && (
                <div>
                    <p>{user.name} Logged in</p>
                    <BlogsList blogs = {blogs} />
                </div>
            )}
        </div>
    )

}

export default App
