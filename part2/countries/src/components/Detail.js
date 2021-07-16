import axios from "axios";
import { useState, useEffect, useRef } from "react";

function Detail({ name, capital, population, languages, flag }) {
  const [weather, setWeather] = useState([]);
  const hasFetchedData = useRef(false);

  const accessKey = process.env.REACT_APP_WEATHER_KEY;

  useEffect(() => {
    if (!hasFetchedData.current) {
      axios
        .get("http://api.weatherstack.com/current", {
          params: {
            access_key: accessKey,
            query: capital,
          },
        })
        .then(response => setWeather(response.data.current));
    }
  }, [accessKey, capital]);

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
