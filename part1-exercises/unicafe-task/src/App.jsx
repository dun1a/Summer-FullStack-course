import {useState} from 'react'

// task 1.6
// const Button = (props) => {
//   return (

//     <button onClick={props.onClick} > {props.text} </button>
//   )


// }

// const App = () => {
// const [goodCounter, setGoodCounter] = useState(0)
// const [neutralCounter, setNeutralCounter] = useState(0)
// const [badCounter, setBadCounter] = useState(0)

// const handleGoodClick = () => {
//   setGoodCounter(goodCounter + 1)
// }

// const handleNeutralClick = () => {
//   setNeutralCounter(neutralCounter + 1)
// }

// const handleBadClick = () => {
//   setBadCounter(badCounter + 1)
// }

// return (
//   <div>
//     <h1> give feedback </h1>

//     <Button onClick={handleGoodClick} text='good' />
//     <Button onClick={handleNeutralClick} text = 'neutral' />
//     <Button onClick={handleBadClick} text = 'bad' />

//     <h1> statistics </h1>
//     <p> good {goodCounter}</p>
//     <p> neutral {neutralCounter}</p>
//     <p> bad {badCounter}</p>
//   </div>
// )

// }

// task 1.7

// const Button = (props) => {
//   return (

//     <button onClick={props.onClick} > {props.text} </button>
//   )


// }

// const App = () => {
// const [goodCounter, setGoodCounter] = useState(0)
// const [neutralCounter, setNeutralCounter] = useState(0)
// const [badCounter, setBadCounter] = useState(0)

// const handleGoodClick = () => {
//   setGoodCounter(goodCounter + 1)
// }

// const handleNeutralClick = () => {
//   setNeutralCounter(neutralCounter + 1)
// }

// const handleBadClick = () => {
//   setBadCounter(badCounter + 1)
// }

// const all = goodCounter + neutralCounter + badCounter
// const average = (all / 3)
// const positivereviews = parseFloat((goodCounter / all) * 100).toFixed(2)

// return (
//   <div>
//     <h1> give feedback </h1>

//     <Button onClick={handleGoodClick} text='good' />
//     <Button onClick={handleNeutralClick} text = 'neutral' />
//     <Button onClick={handleBadClick} text = 'bad' />

//     <h1> statistics </h1>
//     <p> good {goodCounter}</p>
//     <p> neutral {neutralCounter}</p>
//     <p> bad {badCounter}</p>
//     <p> all {all} </p>
//     <p> average {average}</p>
//     <p> positive {positivereviews}%</p>
//   </div>
// )

// }

// task 1.8 and 1.9
const Button = (props) => {
  return (
    <button onClick={props.onClick} > {props.text} </button>
  )
}

// const StatisticLine = (props) => {
//   return (
//     <div>
//       <p> {props.text} {props.result}</p>
//     </div>
//   )
// }

const Statistics = (props) => {
    return (
    <div>
      <p> {props.text} {props.result}</p>
    </div>
  )
}

const ShowStatistics = (props) => {
  if (props.all === 0) {
    return (
      <div>No feedback given</div>
    )
}
  else{
    return ( 
      <div>
        <Statistics text = 'good' result = {props.goodCounter} />
        <Statistics text = 'neutral' result = {props.neutralCounter} />
        <Statistics text = 'bad' result = {props.badCounter} />
        <Statistics text = 'all' result = {props.all} />
        <Statistics text = 'average' result = {props.average} />
        <Statistics text = 'positive' result = {props.positivereviews} />
      </div>
    )
  }
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

const all = goodCounter + neutralCounter + badCounter
const average = (all / 3)
const positivereviews = () => {
  if (all === 0) {
    return 0
  } else {
    return parseFloat((goodCounter / all) * 100).toFixed(2)
  }
}

return (
  <div>
    <h1> give feedback </h1>
    <Button onClick={handleGoodClick} text='good' />
    <Button onClick={handleNeutralClick} text = 'neutral' />
    <Button onClick={handleBadClick} text = 'bad' />

    <h1> statistics </h1>
    <ShowStatistics goodCounter = {goodCounter} neutralCounter={neutralCounter} badCounter={badCounter} all={all} average={average} positivereviews={positivereviews()} />
    
  </div>
)

}

export default App