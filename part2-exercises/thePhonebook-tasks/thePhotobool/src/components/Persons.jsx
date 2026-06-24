const Persons = (props) => {
    return (
        <div>
            {props.personsToShow.map((person, index) => <p key={index}>{person.name}: {person.number}</p>)}
        </div>
    )
}

export default Persons