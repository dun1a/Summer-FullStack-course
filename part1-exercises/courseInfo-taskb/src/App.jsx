const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1> {props.course.name} </h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
} 
const App = () => {
  
  const course = {
    name: 'Half Stack application developement',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
       <Content parts={course.parts}/>
      {<Total parts={course.parts}/>}
    </div>
  )
}

export default App