import React, { useState } from "react";
import { StyledInput, StyledButton } from "./FormComponents";

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
      <StyledInput
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Location"
      />
      <StyledButton type="submit">Search</StyledButton>
    </form>
  );
};

export default SearchBar;
