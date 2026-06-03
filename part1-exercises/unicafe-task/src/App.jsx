import {useState} from 'react'

const Button = (props) => {
  return (

    <button onClick={props.onClick} > {props.text} </button>
  )


}

const App = () => {
const [goodCounter, setGoodCounter] = useState(0)
const [neutralCounter, setNeutralCounter] = useState(0)
const [badCounter, setBadCounter] = useState(0)

const handleGoodClick = () => {
  setGoodCounter(goodCounter + 1)
}

const handleNeutralClick = () => {
  setNeutralCounter(neutralCounter + 1)
}

const handleBadClick = () => {
  setBadCounter(badCounter + 1)
}

return (
  <div>
    <h1> give feedback </h1>

    <Button onClick={handleGoodClick} text='good' />
    <Button onClick={handleNeutralClick} text = 'neutral' />
    <Button onClick={handleBadClick} text = 'bad' />

    <h1> statistics </h1>
    <p> good {goodCounter}</p>
    <p> neutral {neutralCounter}</p>
    <p> bad {badCounter}</p>
  </div>
)

}

export default App