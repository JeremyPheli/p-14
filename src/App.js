import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CurrentEmployees from "./pages/CurrentEmployees";
import { EmployeeProvider } from "./context/context";

function App() {
  return (
    <Router>
      <EmployeeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<CurrentEmployees />} />
        </Routes>
      </EmployeeProvider>
    </Router>
  );
}

export default App;
