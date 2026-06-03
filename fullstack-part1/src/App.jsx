// is a React component file with the name App
// it is rendered in the main.jsx file

/* const Hello = () => {

  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (

    <div>
      <p>This is Hello component</p>
      <p>Hello world, it is {now.toISOString()} </p>
      <p>
        {a} plus {b} is {a+b}
      </p>
    </div>

  )
}
 */

// using props (passing data to components)
/* const Hello = (props) => {
  console.log(props)
  return (

    <div>
      <p>This is Hello component</p>
      <p>Hello, {props.name}</p>
      <p>{props.greeting}</p>
    </div>

  )
}

const App = () => {
  console.log('Hello from component')
  const greeting = 'Horanghaeee'
  const name = 'Hyunjin'

  const friends = [
    {name: 'Hoshi', greeting: greeting},
    {name: 'Hyunjin'}
  ]

  return (
    <div>
      
      <p> This is App component</p>
      <Hello name='Hoshi' greeting={greeting}/>
      <br />
      <Hello name={name} />
      <br />
      <p>Friends found</p>
      <p>Name of freind 1: {friends[0].name}, greeting: {friends[0].greeting} </p>
      <p>Name of friend 2: {friends[1].name}, greeting: {friends[1].greeting ?? 'no greeting'} </p>
       
    </div>
  )
} */


//////// Component state, event handlers

/* const Hello = (props) => {
  // adding helper function for guessing age from current year
  // function invoced when component is rendered 
  // this helper function can access all the props of the component
  const yearBorn = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old.
            </p>
            <p>
              So you were probably born in {yearBorn()}.
            </p>
        </div>
    )
}

const App = () => {
    const name = 'Hoshi'
    const age = 29

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name = {name} age = {age} />
            <Hello name = 'Jungwon' age = {22} />
        </div>
    )
} */


/* const Hello = (props) => {
  // adding helper function for guessing age from current year
  // function invoced when component is rendered 
  // this helper function can access all the props of the component
  const name = props.name
  const age = props.age
  const yearBorn = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - age
  }
    return (
        <div>
            <p>
                Hello {name}, you are {age} years old.
            </p>
            <p>
              So you were probably born in {yearBorn()}.
            </p>
        </div>
    )
}

const App = () => {
  const props = {
    name: 'Hoshi',
    age: 29
  } 
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name = {props.name} age = {props.age} />
            <Hello name = 'Jungwon' age = {22} />
        </div>
    )
} */

/////// pre rendering
/*
const App = (props) =>{
  const {counter} = props // destructuring props object to get counter value
  // or in <div> {props.counter} </div> without destructuring
  return (
    <div>
      {counter}  // rendering the counter value, is used in 
    </div>
  )
}*/

////// state component, state hook

/* import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0) // state variable

  const handleClick = () => {
    console.log('Button clicked')
    setCounter(counter + 1) // update state variable when button is clicked
  }
  //setTimeout(() => setCounter(counter + 1), 1000) // update state variable after 1 second

  return (
    <div>
      {counter}
      <button onClick = {handleClick}> event handler
        Click me
      </button>
      <button onClick = {() => setCounter(0)}>
        Reset
      </button>
      
    </div>
  )
} */


  //////  passing state t child components

// import { useState } from 'react'
//   // component to display counter value
// const Display = (props) => {
//   return (
//     <div>
//       {props.counter}
//     </div>
//   )
// }

// const Button = (props) => {

//   return (
//     <button onClick = {props.onClick} > {props.text} </button>
//   )
// }

// const App = () => {

//   const [counter, setCounter] = useState(0) // sets initial value when the App component is rendered

//   const setToZero = () => setCounter(0)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const increaseByOne = () => setCounter(counter + 1)

//   return (
//     <div>
//       <Display counter = {counter} />
//       {/* <button onClick= {increaseByOne} >increment</button>
//       <button onClick = {setToZero}>reset</button> */}
//       <Button onClick={increaseByOne} text="increment"/>
//       <Button onClick = {setToZero} text = "reset"/>
//       <Button onClick = {decreaseByOne} text = "decrease"/>
//     </div>
//   )
// }

///////// complex state
import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      {left}
      <button onClick= {() => setLeft(left+1)}>left</button>
      <button onClick= {() => setRight(right+1)}>right</button>
      {right}
    </div>
  )
}


export default App