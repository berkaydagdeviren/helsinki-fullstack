import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

const OneCountryInfo = ({ country }) => {
  return (

    <div>
      <h1 >{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages: </h3>
      <p>{Object.keys(country.languages).map(lang => <li>{lang}</li>)}</p>
      <img src={country.flags.svg} alt='flag' width='200'></img>

    </div>
  )
}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${API_KEY}&units=metric`
  ).then(
    response => { setWeather([response.data.name, response.data.main.temp, response.data.weather[0].icon, response.data.wind.speed], console.log(response.data)) }
  )}, [])
  console.log(weather)

  return (
    <div>
      <h3>Weather in {weather[0]}</h3>
      <p>temprature {weather[1]} Celcius</p>
      <img width={100} src={`http://openweathermap.org/img/w/${weather[2]}.png`}></img>
      <p>wind {weather[3]}  m/s </p>
    </div>
  )
}

function App() {

  const [data, setData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');
  const [showCountries, setShowCountries] = useState([false, 0]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setData(response.data);
    })
    
    
  }, []);


  const handleFilterChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSearch = () => {

    console.log(search)
    const countries = data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
    return countries;
  }


  return (
    <div>
      find countries <input value={search} onChange={handleFilterChange} />
      {search === '' ?
        data.map(country => <p key={country.cca2}>{country.name.common}</p>) :
        handleSearch().length > 10 && handleSearch().length > 1 ? <p>Too many matches, specify another filter</p> :
          handleSearch().length === 1 ? handleSearch().map(country => 
          <div>
            <OneCountryInfo country={country} /> 
            <Weather country={country} />
          </div>)
          :
            handleSearch().map((country, i) =>
              <div>
                <div key={country.cca3}>{country.name.common}
                  <button onClick={() => setShowCountries([!showCountries[0], i])}>show</button>
                  {showCountries[0] && showCountries[1] === i ? 
                  <div>
                  <OneCountryInfo country={country}>  </OneCountryInfo> 
                  <Weather country={country} />
                  </div>
                  : null}
                </div>
              </div>)
              
      }
      {weather}
    </div>
  );
}

export default App;
