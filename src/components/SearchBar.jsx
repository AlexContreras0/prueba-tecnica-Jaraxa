import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

export default function SearchBar({ onSearch, onClearResult }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      onClearResult();
    }
  };

  const handleClearClick = () => {
    setSearchTerm("");
    onClearResult();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={searchTerm}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        fullWidth
        placeholder="Buscar medicamento"
        sx={{
          backgroundColor: "#fff",
          border: "none",
          borderRadius: "36px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "36px",
          },
          "& .MuiOutlinedInput-input": {
            paddingLeft: "20px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ paddingLeft: "10px" }}>
              <IconButton type="submit" edge="start" disabled={!searchTerm}>
                <SearchIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end" sx={{ paddingRight: "10px" }}>
              <IconButton onClick={handleClearClick} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
