/* UserInfo.jsx - components of User Info(Account) Page */

import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../styles/UserInfo.css";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function UserInfo({ isDarkMode, toggleDarkMode }) {
  const [data, setData] = useState([]);
  const { userId } = useParams();
  console.log("User ID:", userId); // check the userId received

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendMessage = () => {
    console.log(message);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    console.log("fetching the event");
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/");
        return null;
      }

      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      // const userName = decoded.username;
      // const userID = decoded.id;
      // const userEmail = decoded.email;
      console.log(userId)

      try {
        const result = await axios.get(
          `http://localhost:3001/user-info/${userId}`
        );
        setData({
          ...result.data,
          name: decoded.username // override `name` from the response data with `userName` from the token
        });
      } catch (err) {
        console.error(err);

        const backupData = {
          id: 1,
          name: "Bryn",
          email: "btaylot0@booking.com",
          avatar: "https://robohash.org/utetquibusdam.png?size=50x50\u0026set=set1",
          user: [
            {
              id: 5,
              name: "Jdavie",
              email: "jzecchinii0@yahoo.co.jp",
            },
            {
              id: 2,
              name: "Emmie",
              email: "esworder1@xinhuanet.com",
            },
          ],
        };
        setData(backupData);
      }
    };

    fetchData();
  }, []);

  

  // This effect runs when the `isDarkMode` value changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("body-dark-mode");
    } else {
      document.body.classList.remove("body-dark-mode");
    }
    // if not in dark mode, remove this effect
    return () => {
      document.body.classList.remove("body-dark-mode");
    };
  }, [isDarkMode]);

  if (!data) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className={`UserInfo-full-height ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="UserInfo">
        <h1 className="page-title">Account</h1>
        
            <div className="user-detail-section">
              <img
                src={`https://robohash.org/.png?size=50x50&set=set1`} // the user may change the avatar
                alt="User's Avatar"
                className="avatar"
              />
              <div className="user-name-email">
                <div className="name">{data.name}</div>
                <div className="email">{data.email}</div>
              </div>
            </div>
            <div className="settings-list-general">
              <ul>
                <li className="setting-title">Settings</li>
                <li className="setting-item">
                  Dark Mode
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="darkModeToggle"
                      name="darkModeToggle"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <span className="slider round"></span>
                  </label>
                </li>
                <li className="setting-item">Password</li>
                <button onClick={handleLogout} className="logout">
                  Logout
                </button>
                {/* Add additional settings here */}
              </ul>
            </div>
            <div className="settings-list-feedback">
              <ul>
                <li className="setting-title">Feedback</li>
                <li className="setting-item setting-item-feedback">
                  <div className="contact-us-title">Contact us</div>
                  <div className="chatbox-container">
                    <textarea
                      id="userMessage"
                      name="userMessage"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="chatbox-input"
                    />
                    <button onClick={sendMessage} className="send-button">
                      Send
                    </button>
                  </div>
                </li>
              </ul>
            </div>
        <Navbar isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default UserInfo;
