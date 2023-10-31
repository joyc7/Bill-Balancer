/* UserInfo.jsx - components of User Info(Account) Page */

import React from "react";
import '../styles/UserInfo.css';
import Navbar from "./Navbar";

function UserInfo() {
    return (
        <div className="flex flex-col items-center p-20 bg-e6fff9 min-h-screen font-sans">
            <h1 className="text-4xl mb-20 font-bold">Account</h1>

            <div className="flex items-center w-full p-4 bg-f0f0f0 rounded-xl mb-20">
                <img src="avatar-url" alt="User's Avatar" className="w-12 h-12 rounded-full mr-4" /> 
                <div className="flex flex-col">
                    <div className="text-xl mb-2">User Name</div>
                    <div className="text-xl mb-2">user@email.com</div>
                </div>
            </div>

            <div className="w-full">
                <ul>
                    <li className="bg-white p-4 mb-2 rounded-md text-xl text-333">Preference</li>
                    <li className="bg-white p-4 mb-2 rounded-md text-xl text-333">Passcode</li>
                    <li className="bg-white p-4 mb-2 rounded-md text-xl text-333">Language</li>
                    <li className="bg-white p-4 mb-2 rounded-md text-xl text-333">Feedback</li>
                    <li className="bg-white p-4 mb-2 rounded-md text-xl text-333">Contact us</li>
                </ul>
            </div>

            <Navbar />
        </div>
    );
}

export default UserInfo;
