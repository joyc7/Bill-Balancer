import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./components/Home"; // Import your Home component

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul></ul>
        </nav>
        <Routes>
          {" "}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
