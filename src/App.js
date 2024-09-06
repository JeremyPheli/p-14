import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrentEmployees from "./pages/CurrentEmployees";
import "./styles/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<CurrentEmployees />} />
      </Routes>
    </Router>
  );
}

export default App;
