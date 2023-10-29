import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Event from "./components/Event";
import "./index.css";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
function App() {
  // used to keep track of which specific event the user choose to see
  const [event, setEvent] = useState({});

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event" element={<Event event={event} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
