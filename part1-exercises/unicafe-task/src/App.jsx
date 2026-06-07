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

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.result}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
    return (
    <div>
      <StatisticLine text = 'good' result = {props.goodCounter} />
      <StatisticLine text = 'neutral' result = {props.neutralCounter} />
      <StatisticLine text = 'bad' result = {props.badCounter} />
      <StatisticLine text = 'all' result = {props.all} />
      <StatisticLine text = 'average' result = {props.average} />
      <StatisticLine text = 'positive' result = {props.positivereviews} />
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
        <Statistics goodCounter = {props.goodCounter} neutralCounter={props.neutralCounter} badCounter={props.badCounter} all={props.all} average={props.average} positivereviews={props.positivereviews} />
      </div>
    )
  }
}

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
// const positivereviews = () => {
//   if (all === 0) {
//     return 0
//   } else {
//     return parseFloat((goodCounter / all) * 100).toFixed(2)
//   }
// }

// return (
//   <div>
//     <h1> give feedback </h1>
//     <Button onClick={handleGoodClick} text='good' />
//     <Button onClick={handleNeutralClick} text = 'neutral' />
//     <Button onClick={handleBadClick} text = 'bad' />

//     <h1> statistics </h1>
    
//     <ShowStatistics goodCounter = {goodCounter} neutralCounter={neutralCounter} badCounter={badCounter} all={all} average={average} positivereviews={positivereviews()} />
//   </div>
//   )
// }

const App = () => {

const [selected, setSelected] = useState(0)
const [anecdoteVotes, setAnecdoteVotes] = useState(Array(8).fill(0))


const handleVoteClick = () => {
  const copy = [...anecdoteVotes]
  copy[selected] += 1
  setAnecdoteVotes(copy)
}



// task 1.12
const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
]
const handleAnecdoteClick = () => {
  const randomNum = Math.floor((Math.random()) * anecdotes.length)
  setSelected(randomNum)
}
return (
  <div>
   <p>{anecdotes[selected]}</p>
   <p> has {anecdoteVotes[selected]} votes </p>
   <Button onClick={handleVoteClick} text = 'vote' />
    <Button onClick={handleAnecdoteClick} text = 'next anecdote' />
    </div>
  )
}

export default App