import React, { useState } from "react";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Event from "./components/Event";
import "./index.css";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import FriendsPage from "./components/FriendsPage";
import FriendDetailPage from "./components/FriendDetailPage";
import Events from "./components/Events";
import Expense from "./components/Expense";
import UserInfo from "./components/UserInfo";
import AddExpense from "./components/AddExpense";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Logout from "./components/Logout";

function App() {
  // used to keep track of which specific event the user choose to see
  const [event, setEvent] = useState({});
  // save dark mode into local storage
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () =>
    setIsDarkMode(
      (prevMode) => !prevMode
    );
  console.log("Dark mode:", isDarkMode);

  return (
      <Router>
        <AppContainer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          <Route
            path="/event/:eventId"
            element={
              <Event
                event={event}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route
            path="/friends"
            element={
              <FriendsPage
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route
            path="/events"
            element={
              <Events isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            }
          />
          <Route
            path="/expense/:expenseId"
            element={
              <Expense
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route
            path="/user-info"
            element={
              <UserInfo
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route
            path="/add-expense/:eventId"
            element={
              <AddExpense
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
          <Route
            path="/friend/:friendId"
            element={
              <FriendDetailPage
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
        </Routes>
        </AppContainer>
      </Router>
  );
}

// dark mode should not affect Login and ForgotPassword page
function AppContainer({ isDarkMode, children }) {
  const location = useLocation();
  // check if the current route is either the login page or the forgot password page
  const isLoginPage = location.pathname === "/";
  const isForgotPasswordPage = location.pathname === "/forgot-password";
  // disable dark mode on Login and ForgotPassword page
  const containerClass = isDarkMode && !isLoginPage && !isForgotPasswordPage ? "container dark-mode" : "container";
  return <div className={containerClass}>{children}</div>;
}


export default App;
