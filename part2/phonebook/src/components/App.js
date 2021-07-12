import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => setPersons(response.data));
  }, []);

  const handleNewName = e => setNewName(e.target.value);
  const handleNewNumber = e => setNewNumber(e.target.value);
  const handleFilter = e => setFilter(e.target.value);

  const filterContacts = filter === "" ? persons : persons.filter(x => x.name.toLowerCase().includes(filter));

  const addPerson = e => {
    e.preventDefault();
    // Returns true if the element is in the array
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPersonObject));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filter={filter} />
      <h3>Add a new Contact</h3>
      <PersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        newName={newName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filterContacts={filterContacts} />
    </div>
  );
};

export default App;
