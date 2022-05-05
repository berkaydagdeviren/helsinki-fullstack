const Course = ({ courses }) => {
    { console.log(courses) }
    return (
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>)}
      </div>
    )
  }
  const Header = ({ course }) => <h1>{course}</h1>

  const Total = ({ parts }) => {
  
    return (
      <div>
        <h3><b>Number of exercises {"> "}   
          {
                parts.reduce((acc, part) => acc + part.exercises, 0)
          }
        </b></h3>
      </div>
    )
  }
  
  const Part = ({ part }) =>
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map(part => <Part key={part.id} part={part} />)
        }
  
      </div>
    )
  }


export default Course;