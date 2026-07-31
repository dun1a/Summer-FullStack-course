import { useState } from 'react'
import { useEffect } from 'react'
import blogService from './services/blogService.js'
import loginService from './services/loginService.js'
import BlogsList from './components/BlogsList.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm.jsx'

function App() {

    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [notifType, setNotifType] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log('fetching blogs...')
        blogService.getAll()
        .then(blogs => setBlogs(blogs))
    }, [])

    // check if user is already logged in
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // login functionality
    const handleLogin = async (event) => {
        event.preventDefault()
        //console.log('Logging in with', username, password)
        try {
            const user = await loginService.login({username, password})
            
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)

            setUser(user)
            //console.log('user', user)
            setUsername('')
            setPassword('')
            setNotifType('success')
            setMessage('Login successful')
            
            setTimeout(() => {
                setMessage(null)
            }, 2000)
        } catch{
            setNotifType('error')
            setMessage('wrong username or password')
            
            setTimeout(() => {
                setMessage(null)
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

    const handleAddBlog = (event) => {
        event.preventDefault()
        console.log('adding blog', title)

        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        if(!title || !author){
            setNotifType('error')
            setMessage('Title and author are required')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            return
        }
        setNotifType('success')
        setMessage(`A new blog '${newBlog.title}' by ${newBlog.author} has been added`)
        setTimeout(() => {
            setMessage(null)
        }, 5000)

        blogService
        .create(newBlog)
        .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
        })
    }

    const blogForm = () => {
        return (
            <Togglable buttonLabel = 'create new blog'>
                <BlogForm
                    onSubmit = {handleAddBlog}
                    value1 = {title}
                    value2 = {author}
                    value3 = {url}
                    handleChange1 = {({ target }) => setTitle(target.value)}
                    handleChange2 = {({ target }) => setAuthor(target.value)}
                    handleChange3 = {({ target }) => setUrl(target.value)}
                />
            </Togglable>
        )
    }
 
    const logOut = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    return (
        <div>
            <Notification message = {message} type = {notifType} />
            {!user && loginForm()}
            {user && (
                <div>
                    <p>{user.name} Logged in</p> 
                    <button onClick={logOut}>Logout</button>
                    <BlogsList blogs = {blogs} />
                    {blogForm()}
                </div>
            )}
        </div>
    )

}

export default App
