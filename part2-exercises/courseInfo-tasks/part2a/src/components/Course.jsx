const Course = ({courses}) => {
    return (
        <div>
            {courses.map( course => {
                const total = course.parts.reduce((a,b) => a + b.exercises,0)
                return (
                    <div key={course.id}>
                        <h1>{course.name}</h1>
                        {course.parts.map(part => 
                            <p key={part.id}> {part.name} {part.exercises}</p>
                        )}
                        <h4>
                            Number of exercises {total}
                        </h4>
                    </div>
                )
            })}
            
        </div>
    )
}

export default Course