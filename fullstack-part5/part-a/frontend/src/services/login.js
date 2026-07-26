import axios from 'axios'

const baseUrl = '/api/login'

const login = async credentials => { // credential object is: { username: 'mluukkai', password: 'salainen' } 
    const response = await axios.post(baseUrl, credentials)
    return response.data // returns the user object: { token: '...', username: 'mluukkai', name
}

export default {
    login
}