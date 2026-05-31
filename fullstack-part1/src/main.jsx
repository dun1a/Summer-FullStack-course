//import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'

import App from './App.jsx'

// renderes the App.jsx component's contents here, in the div-element in the index.html file with the id value root
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
