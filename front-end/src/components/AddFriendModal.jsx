import React, { useState } from 'react';
import addFriendButton from "../images/plus-button.png"; 

function AddFriendModal({ showModal, onClose }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const backupUserData = {
        "avatar": "https://robohash.org/facerevoluptasconsequatur.png?size=50x50\u0026set=set1",
        "name": "Ulberto Crow"
    };

    async function handleSearchClick() {
        setError('');
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3001/addFriends");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError('Failed to fetch data. Please try again.');
            setUserData(backupUserData); // Using the backup data on error
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add a new friend</h2>
                <input type="text" placeholder="Email or Phone" className='input-content'/>
                <button onClick={handleSearchClick}>Search</button>
                {loading && <div>Loading...</div>}
                {userData && (
                    <div className="add-friend-item">
                        <img src={userData.avatar} alt={`${userData.name}'s avatar`} className="friend-avatar"/>
                        <span className="add-friend-name">{userData.name}</span>
                        <img 
                            src={addFriendButton}
                            alt="Add friend"
                            className="add-friend-button"
                            style={{ width: "50px", height: "50px" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddFriendModal;

