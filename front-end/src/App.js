import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FriendsPage from './components/FriendsPage';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/friends">Friends</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {" "}
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
