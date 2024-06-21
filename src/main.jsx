import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7F3E",
      mainHover: "#e36f34",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#80C4E9",
    },
    terciary: {
      main: "#604CC3",
    },
    white: {
      main: "#FFF",
    },
    gray: {
      main: "#5c5c5c",
    },
    background: {
      default: "#FFF",
      paper: "#FFF",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
