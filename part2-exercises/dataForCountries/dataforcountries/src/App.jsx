import { useState, useEffect } from 'react'
import CountryData from './service/CountryData.js'
import CountryFilter from './components/CountryFilter.jsx'
import Country from './components/Country.jsx'

function App() {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    CountryData
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  
  const handleCountryChange = (event) => {
    event.preventDefault()
    setCountryName(event.target.value)

  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()))

  const showChosenCountry = (countryName) => {
    setCountryName(countryName)
  }
 
  return (
    <div>
      <form>
       <CountryFilter filter={countryName} handleFilter={handleCountryChange} />
       <Country countriesToShow={countriesToShow} showChosenCountry={setCountryName} />
      </form>
    </div>
  )
}

export default App
