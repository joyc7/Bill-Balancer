import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Event from "./components/Event";
import "./index.css";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import FriendsPage from "./components/FriendsPage";
import Events from "./components/Events"
import Expense from "./components/Expense"; 
import UserInfo from "./components/UserInfo"; 
import AddExpense from "./components/AddExpense";

export const DarkModeContext = createContext();


function App() {
  // used to keep track of which specific event the user choose to see
  const [event, setEvent] = useState({});
  // used to control Dark Mode for each page
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle the dark mode state
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };


  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event" element={<Event event={event} />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/expense/" element={<Expense />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/add-expense" element={<AddExpense />} />
          

        </Routes>
      </Router>
    </div>
    </DarkModeContext.Provider>
  );
}

export default App;