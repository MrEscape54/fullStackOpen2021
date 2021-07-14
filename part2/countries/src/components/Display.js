//import { useState } from "react";
import Detail from "./Detail";

const Display = ({ searchResult, search, handleShow }) => {
  // No filter applied
  if (search === "") {
    return <p>Enter text to search countries</p>;
  }
  // Result of more than 10 countries
  else if (searchResult.length > 10) {
    return <p>Too many countries, specify another filter</p>;
  }
  // Result of between 2 and 10 countries
  else if (searchResult.length <= 10 && searchResult.length > 1) {
    return (
      <div>
        {searchResult.map(country => (
          <div key={country.alpha2Code}>
            <label>{country.name} </label>
            <button
              onClick={() => {
                handleShow(country);
              }}
            >
              show
            </button>
          </div>
        ))}
      </div>
    );
  }
  // Result of only 1 country
  else if ((searchResult.length = 1)) {
    return (
      <div>
        {searchResult.map(country => (
          <Detail
            key={country.alpha2Code}
            name={country.name}
            code={country.alpha2Code}
            capital={country.capital}
            population={country.population}
            languages={country.languages}
            flag={country.flag}
          />
        ))}
      </div>
    );
  }
};

export default Display;
