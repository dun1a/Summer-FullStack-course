import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'

//const promise = axios.get('http://localhost:3001/notes')
//// of we want to access the result of the get operation from the promise, 
//// we need to register an event handler to the promise using the method 'then'
//promise.then(response => {
  //  console.log(response) // response object parameter conatins all the essential data related to the response of the HTTP get request
//})

// storing the promise object in a variable, getting only the data
// axios.get('http://localhost:3001/notes').then(response => {
//     const notes = response.data
//     console.log(notes)
// })

// better way to format chained method calls:
// axios
//   .get('http://localhost:3001/notes')
//   .then(response =>{
//     const notess = response.data
//     console.log(notess)
//   })

// const notes = [
//     {id: 1, content: 'HTML is easy', important: true},
//     {id: 2, content: 'Browser can execute only JavaScript', important: false},
//     {id: 3, content: 'GET and POST are the most important methods of HTTP protocol', important: true}
// ]

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
