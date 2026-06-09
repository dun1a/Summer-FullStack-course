const Course = ({course}) => {

    return (
        <div>
            <h1>{course.name}</h1>
            <p>
                {course.parts.map(part => 
                    <li key ={part.id}>{part.name} {part.exercises}</li>
                )}
           </p>

            
        </div>
    )
}

export default Course