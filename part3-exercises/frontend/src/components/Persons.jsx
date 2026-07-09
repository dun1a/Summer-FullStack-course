const Persons = (props) => {

    return (
        <div>
            {props.personsToShow.map((person, index) => 
            <p key={index}>
                {person.name}: {person.number}
                <button onClick={() =>{
                 console.log('button clicked')
                 props.deletePerson(person.id)}
                 }>delete</button>
            </p>)}
        </div>
    )
}

export default Persons