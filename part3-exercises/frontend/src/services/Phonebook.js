import axios from 'axios'

//const baseUrl = 'http://localhost:3001/persons'

// because we are using backend now, we don't need to specify the baseUrl anymore, we can just use the relative path
const baseUrl = '/api/persons' // also need to add a proxy to vite.config.js so api requests reach the backend

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)    
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log('sending delete for id', id)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    deletePerson
}