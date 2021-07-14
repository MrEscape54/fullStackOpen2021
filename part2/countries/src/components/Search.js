const Search = ({ handleSearch, search }) => {
  return (
    <div>
      Find Countries: <input onChange={handleSearch} value={search} />
    </div>
  );
};

export default Search;
