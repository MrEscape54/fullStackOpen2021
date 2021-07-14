import axios from "axios";
import { useState, useEffect } from "react";

function Detail({ name, capital, population, languages, flag }) {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (capital) {
      axios
        .get(`http://api.weatherstack.com/current?access_key=e26bcb551deeb70ca310d892f8cdbb29&query=${capital}`)
        .then(response => {
          if (response.status === 200) setWeather(response.data.current);
        });
    }
  }, [capital]);

  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((l, i) => (
          <li key={i}>{l.name}</li>
        ))}
      </ul>
      <img src={flag} alt={name} height='100' />
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.temperature} celcius</p>
      <img src={weather.weather_icons} alt={name} height='50' />
      <p>
        Wind: {weather.wind_speed} mph directions {weather.wind_dir}
      </p>
    </div>
  );
}

export default Detail;
