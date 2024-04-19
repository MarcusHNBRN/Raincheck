import React, { useState } from "react";
import { css } from "@emotion/react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="planet"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
