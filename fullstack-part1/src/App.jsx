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
const Hello = (props) => {
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
}

export default App