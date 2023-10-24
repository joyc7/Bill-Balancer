import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar"; // Import the Navbar component

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Include the Navbar component here */}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
