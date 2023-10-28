import React, { useState, useEffect } from 'react';
import './FriendsPage.css';

function FriendsPage() {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false); 

    const backupData = {"id":1,"name":"Carmon Stickel","email":"cstickel0@shutterfly.com","phone":"574-505-0071","avatar":"https://robohash.org/expeditaautemlaudantium.png?size=50x50\u0026set=set1","friends":[{"id":4,"name":"Leeanne Dunrige","email":"ldunrige0@comcast.net","phone":"594-821-5418","balance":"$62.71"},{"id":2,"name":"Doti Sorrel","email":"dsorrel1@google.com.hk","phone":"852-501-6560","balance":"$55.97"},{"id":5,"name":"Hobart Sallan","email":"hsallan2@cnet.com","phone":"476-640-9589","balance":"$-36.35"},{"id":3,"name":"Anetta Heningam","email":"aheningam3@networksolutions.com","phone":"180-587-2730","balance":"$-54.82"}]}; 

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://my.api.mockaroo.com/users.json?key=04d5ee10");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                console.log(backupData); 
                // Setting backup data when API call fails
                setUserData(backupData);
            }
        }
        fetchData();
    }, []);

    if (!userData) return <div>Loading...</div>;

    const totalBalance = userData.friends && userData.friends.length ? userData.friends.reduce((acc, friend) => acc + parseFloat(friend.balance.replace('$', '')), 0) : 0;

    return (
        <div className="friends-page">
            <h1 className="page-title">Friends</h1>
            <div className="navbar">
                Navigation Bar
            </div>
            <button className="add-friends-btn" onClick={() => setShowModal(true)}>
                Add Friends
            </button>
            <div className="balance-section">
                <img src={userData.avatar} alt="User Avatar" className="avatar"/>
                <div>
                    <div className="balance-title">Total balance</div>
                    <div className="balance-details">
                        {totalBalance > 0 ? (
                            <div>You are owed ${totalBalance.toFixed(2)}</div>
                        ) : (
                            <div>You owe ${Math.abs(totalBalance).toFixed(2)}</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="friends-list">
                <ul>
                    {userData.friends.map((friend) => (
                        <li key={friend.id} className="friend-item">
                            <img src={`https://robohash.org/${friend.name}.png?size=50x50&set=set1`} alt={`${friend.name}'s avatar`} className="friend-avatar"/>
                            <span>{friend.name}</span>
                            <span className={parseFloat(friend.balance.replace('$', '')) < 0 ? "negative-balance" : "positive-balance"}>
                                 {friend.balance}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>


            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Add Friends</h2>
                        <input type="text" placeholder="Email or Phone" />
                        <button>Search</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default FriendsPage;