function Persons({ filterContacts }) {
  return (
    <ul>
      {filterContacts.map((person, i) => (
        <li key={i}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
}

export default Persons;
