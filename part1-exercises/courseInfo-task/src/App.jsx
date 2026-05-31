const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}
const Content = () => {
  const part1 = 'Fundementals of React'
  const exercises1 = 10

  const part2 = 'Using props to pass data'
  const exercises2 = 7

  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Part part={part1} exercises = {exercises1}/>
      <Part part={part2} exercises = {exercises2}/>
      <Part part={part3} exercises = {exercises3}/>
    </div>
  )
}

const Total = (props) => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  return (
    <div>
      <p>
        Number of exercises {exercises1 + exercises2 + exercises3}
      </p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application developement'
  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total />
    </div>
  )
}

export default App