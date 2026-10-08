import React from "react";

function SearchBar({ search, setSearch, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;