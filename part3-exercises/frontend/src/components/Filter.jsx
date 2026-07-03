const Filter = (props) => {
    return (
        <div>
            <p>Filter shown with: <input value={props.nameFilter} onChange={(e) => props.setNameFilter(e.target.value)}/></p>
        </div>
    )
}

export default Filter