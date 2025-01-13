import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [searchBy, setSearchBy] = useState("name"); // Added state for searchBy

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query, searchBy, category);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onSearch(query, searchBy, e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    onSearch(query, e.target.value, category);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
        className="form-control"
      />
      <select
        value={searchBy}
        onChange={handleSearchByChange}
        className="form-select"
      >
        <option value="name">Search by Name</option>
        <option value="ingredients">Search by Ingredients</option>
      </select>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="form-select"
      >
        <option value="all">All Categories</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="dessert">Dessert</option>
      </select>
      <button type="submit" className="btn btn-secondary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
