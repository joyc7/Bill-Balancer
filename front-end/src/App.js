import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Event from "./components/Event";
import "./index.css";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import FriendsPage from "./components/FriendsPage";
import Event_main from "./components/Event_main"
import Expense from "./components/Expense"; 
import UserInfo from "./components/UserInfo"; 


function App() {
  // used to keep track of which specific event the user choose to see
  const [event, setEvent] = useState({});

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event/:id" element={<Event event={event} />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/event_main" element={<Event_main />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/user-info" element={<UserInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
