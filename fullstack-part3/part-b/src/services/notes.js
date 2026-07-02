import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const noneExisting = {
        id: 100000,
        content: 'This note is not saved to the server',
        important: true,
    }
    return request.then(response => response.data.concat(noneExisting))
    //return axios.get(baseUrl) 
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
    //return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
    //return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
    getAll,
    create,
    update
}