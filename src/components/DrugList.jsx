import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  List,
  ListItem,
  Typography,
  Container,
  ListItemText,
  Pagination,
  Stack,
} from "@mui/material";

export default function DrugList() {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(false);

  const handleSearch = async (searchTerm) => {
    if (searchTerm === "") {
      setSearchResults([]);
      setPage(1);
      setError(false);
      return;
    }

    const URL = `https://api.fda.gov/drug/ndc.json?count=generic_name.exact&search=${encodeURIComponent(
      searchTerm
    )}`;

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      setSearchResults(data.results);
      setPage(1);
      setError(data.results.length === 0);
    } catch (error) {
      console.error("Error al obtener los resultados", error);
      setSearchResults([]);
      setPage(1);
      setError(true);
    }
  };

  const handleClearClick = () => {
    setSearchResults([]);
    setPage(1);
    setError(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedResults = searchResults.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(searchResults.length / rowsPerPage);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <SearchBar onSearch={handleSearch} onClearResult={handleClearClick} />
        {error ? (
          <Typography variant="h6" mt={2}>
            No se han encontrado resultados, pruebe con otro término
          </Typography>
        ) : (
          <List
            sx={{
              marginTop: "20px",
            }}
          >
            {paginatedResults.map((result, index) => (
              <ListItem
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBlock: "5px",
                  color: "#fff",
                  fontWeight: "bold",
                }}
                key={index}
                component={Link}
                to={`/drug/${encodeURIComponent(result.term)}`}
                button
              >
                <ListItemText primary={result.term} />
              </ListItem>
            ))}
          </List>
        )}
        {searchResults.length === 0 ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBlock: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                color="primary"
                shape="rounded"
                count={totalPages}
                page={page}
                onChange={handleChangePage}
              />
            </Stack>
          </div>
        )}
      </Container>
    </Container>
  );
}
