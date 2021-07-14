import { useState, useEffect } from "react";
import axios from "axios";

import Search from "./components/Search";
import Display from "./components/Display";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = e => setSearch(e.target.value);
  const handleShow = country => setSearch(country.name.toLowerCase());

  const searchResult =
    search === "" ? countries : countries.filter(country => country.name.toLowerCase().includes(search));

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Search handleSearch={handleSearch} value={search} />
      <Display searchResult={searchResult} search={search} handleShow={handleShow} />
    </div>
  );
}

export default App;
