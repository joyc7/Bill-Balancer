import React, { useState } from 'react';

function AddFriendModal({ showModal, onClose }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const backupUserData = {
        "avatar": "https://robohash.org/facerevoluptasconsequatur.png?size=50x50\u0026set=set1",
        "name": "Ulberto Crow"
    };

    async function handleSearchClick() {
        setLoading(true);
        try {
            const response = await fetch("https://my.api.mockaroo.com/addFriends.json?key=04d5ee10");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
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
                    <div className="friend-item">
                        <img src={userData.avatar} alt={`${userData.name}'s avatar`} className="friend-avatar"/>
                        <span>{userData.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddFriendModal;

