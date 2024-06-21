import "./App.css";
import DrugList from "./components/DrugList";
import DrugDetails from "./components/DrugDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DrugList />} />
        <Route path="/drug/:id" element={<DrugDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
