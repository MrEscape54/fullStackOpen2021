import { useState, useEffect } from "react";

import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(personsData => setPersons(personsData));
  }, []);

  const handleNewName = e => setNewName(e.target.value);
  const handleNewNumber = e => setNewNumber(e.target.value);
  const handleFilter = e => setFilter(e.target.value);

  const filterContacts = filter === "" ? persons : persons.filter(x => x.name.toLowerCase().includes(filter));

  const handleDeletePerson = id => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} `)) {
      personService.remove(id).then(res => setPersons(persons.filter(person => person.id !== res)));
    }
  };

  const addPerson = e => {
    e.preventDefault();
    // Returns true if the element is in the array
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the new number woth yhe new one?`)) {
        const id = persons.find(person => person.name === newName).id;
        const newPersonObject = {
          name: newName,
          number: newNumber,
        };
        personService
          .update(newPersonObject, id)
          .then(response => setPersons(persons.map(person => (person.id !== id ? person : response))));
        setNewName("");
        setNewNumber("");
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPersonObject).then(response => setPersons(persons.concat(response)));
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
      <Persons filterContacts={filterContacts} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
