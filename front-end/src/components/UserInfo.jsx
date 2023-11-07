/* UserInfo.jsx - components of User Info(Account) Page */

import React, { useState, useEffect } from "react";
import '../styles/UserInfo.css';
import Navbar from "./Navbar";

function UserInfo() {
    const [userData, setUserData] = useState(null);
    const [randomUser, setRandomUser] = useState(null); {/* to fetch random user info */}
    const [isDarkMode, setIsDarkMode] = useState(false); {/* to control dark mode */}
    const [message, setMessage] = useState(''); {/* to input contact us messages */}

    {/* dark mode function */}
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    {/* contact us function */}
    const sendMessage = () => {
        console.log(message);
        {/* can add an API call here to send the message to the backend */}
        {/* reset the message input after sending */}
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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://my.api.mockaroo.com/user_info.json?key=2712db60");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data);
                {/* pick a random user from the user array */}
                const randomIdx = Math.floor(Math.random() * data.user.length);
                setRandomUser(data.user[randomIdx]);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserData(backupData);
                {/* pick a random user from the backup data */}
                const randomIdx = Math.floor(Math.random() * backupData.user.length);
                setRandomUser(backupData.user[randomIdx]);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={`UserInfo ${isDarkMode ? 'dark-mode' : ''}`}> 
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
                                    <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                                    <span className="slider round"></span>
                                    </label>
                                    </li>
                            <li className="setting-item">Passcode</li>
                        </ul>
                    </div>
                    
                    <div className="settings-list-feedback">
                    <ul>
                    <li className="setting-title">Feedback</li>
                    <li className="setting-item">
                        Contact us
                        <div className="chatbox-container">
                            <textarea
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
            <Navbar />
        </div>
    );

   
   
}

export default UserInfo;
