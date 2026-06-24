const PersonForm = (props) => {
    const {addPerson, newName, setNewName, newNumber, setNewNumber} = props

    return(
        <form onSubmit={addPerson}>
            <div>
                <p>name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/></p>
                <p>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/></p>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

export default PersonForm