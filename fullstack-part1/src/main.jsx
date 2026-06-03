//import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'

import App from './App.jsx'

/* let counter = 0
// renderes the App.jsx component's contents here, in the div-element in the index.html file with the id value root
const root = ReactDOM.createRoot(document.getElementById('root'))

const refresh = () => {
    root.render(<App counter = {counter} />)
}

setInterval (() => {
    if (counter < 10) {
        counter += 1
        refresh()
    }
}, 1000)
 */
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)

