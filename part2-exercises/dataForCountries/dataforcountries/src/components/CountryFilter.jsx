const CountryFilter = ({ filter, handleFilter }) => {
    return (
        <div>
            Find countries: <input value={filter} onChange={handleFilter}/>
        </div>
    )
}

export default CountryFilter