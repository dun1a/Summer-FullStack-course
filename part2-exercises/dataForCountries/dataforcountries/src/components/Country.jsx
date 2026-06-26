const Country = ({ countriesToShow }) => {

    if(countriesToShow.length === 1) {
        return (
            <div>
                <h1>{countriesToShow[0].name.common}</h1>
                <p>Capital: {countriesToShow[0].capital}</p>
                <p>Area: {countriesToShow[0].area}</p>

                <h2>Languages</h2>
                <ul>
                    {Object.values(countriesToShow[0].languages).map((language, index) =>
                    <li key={index}> {language} </li>
                    )}
                </ul>
                <img src={countriesToShow[0].flags.png} alt="flag" />
            </div>
        )
    } else{
        return (

        <div>
            {countriesToShow.map((country, index) => 
            <p key={index}> {country.name.common} </p> 
            )}
        </div>
    
    )}

}

export default Country