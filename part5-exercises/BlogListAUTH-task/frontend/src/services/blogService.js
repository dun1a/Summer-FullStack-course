import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'John Doe',
        url: 'https://example.com/react-patterns',
        likes:7
    }
]

const getAll = () => {
    const config = {
        headers: {Authorization: token}
    }

    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

export default {
    getAll,
    initialBlogs,
    setToken
}