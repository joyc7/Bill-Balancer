/* UserInfo.jsx - components of User Info(Account) Page */

import React from "react";
import '../styles/UserInfo.css';
import Navbar from "./Navbar";

function UserInfo() {
    return (
        <div className="UserInfo">
            <h1 className="title">Account</h1>

            <div className="User_Detail_Section">
                <img src="https://robohash.org/pariaturipsumculpa.png?size=50x50&set=set1" alt="User's Avatar" className="avatar" /> 
                <div className="user-name-email">
                    <div className="name">Mary </div> {/* the user's name (hardcode here) */}
                    <div className="email">mary0917@gmail.com</div> {/* the user's email (hardcode here) */}
                </div>
            </div>

            <div className="settings-list">
                {/* the buttons in the User Info Page, will be clickable with additional components later */}
                <ul>
                    <li className="setting-item">Preferences</li>
                    <li className="setting-item">Passcode</li>
                    <li className="setting-item">Language</li>
                    <li className="setting-item">Feedback</li>
                    <li className="setting-item">Contact us</li>
                </ul>
            </div>

            <Navbar />
        </div>
    );
}

export default UserInfo;
