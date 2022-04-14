const App = () => {
  const course = {
    name: 'Half Stack application development',
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
      <Header course={course.name} />
      <Content content= {course.parts} />
      <Total parts={course.parts}/>
      
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Content = ({content}) => {
  return (
    <div>
      {content.map((part, index) => <Part name={part.name} exercises={part.exercises} key={index} />)}
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
      <br />
    </p>
  )
}

const Total = (props) => {
  
  return (
  <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

export default App