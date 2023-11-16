/* UserInfo.jsx - components of User Info(Account) Page */

import React, { useState, useEffect } from "react";
import '../styles/UserInfo.css';
import Navbar from "./Navbar";
import axios from 'axios';

function UserInfo({ isDarkMode, toggleDarkMode }) {
    const [userData, setUserData] = useState(null);
    const [randomUser, setRandomUser] = useState(null);
    const [message, setMessage] = useState('');


    const sendMessage = () => {
        console.log(message);
        setMessage('');
    };

    const backupData = {
        "id": 1,
        "name": "Bryn",
        "email": "btaylot0@booking.com",
        "avatar": "https://robohash.org/utetquibusdam.png?size=50x50\u0026set=set1",
        "user": [
            {
                "id": 5,
                "name": "Jdavie",
                "email": "jzecchinii0@yahoo.co.jp"
            },
            {
                "id": 2,
                "name": "Emmie",
                "email": "esworder1@xinhuanet.com"
            }
        ]
    };

    // This effect runs when the `isDarkMode` value changes
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('body-dark-mode');
        } else {
            document.body.classList.remove('body-dark-mode');
        }
        // if not in dark mode, remove this effect
        return () => {
            document.body.classList.remove('body-dark-mode');
        };
    }, [isDarkMode]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3001/user-info");
                const data = response.data;
                setUserData(data);

                // handle potential undefined data.user
                const userArray = data.user || [];
                if (userArray.length > 0) {
                    const randomIdx = Math.floor(Math.random() * userArray.length);
                    setRandomUser(userArray[randomIdx]);
                } else {
                    console.error("User data or user array is empty.");
                    setRandomUser(null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserData(backupData);
                const randomIdx = Math.floor(Math.random() * backupData.user.length);
                setRandomUser(backupData.user[randomIdx]);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={`UserInfo-full-height ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="UserInfo">
                <h1 className="page-title">Account</h1>
                {randomUser && (
                    <>
                        <div className="user-detail-section">
                            <img src={userData.avatar} alt="User's Avatar" className="avatar" />
                            <div className="user-name-email">
                                <div className="name">{randomUser.name}</div>
                                <div className="email">{randomUser.email}</div>
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
                                <li className="setting-item">Passcode</li>
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
                                        <button onClick={sendMessage} className="send-button">Send</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
                <Navbar isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}

export default UserInfo;
