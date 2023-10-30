import React, { useState, useEffect } from 'react';
import '../styles/FriendsPage.css';
import AddFriendModal from './AddFriendModal';
import Navbar from "./Navbar";

function FriendsPage() {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false); 

    const backupData = {"id":1,"name":"Bryn","email":"btaylot0@booking.com","phone":"850-479-2094","avatar":"https://robohash.org/utetquibusdam.png?size=50x50\u0026set=set1","friends":[{"id":5,"name":"Jdavie","email":"jzecchinii0@yahoo.co.jp","phone":"967-156-0272","balance":"$57.06"},{"id":2,"name":"Emmie","email":"esworder1@xinhuanet.com","phone":"832-141-0597","balance":"$60.04"}]}; 

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://my.api.mockaroo.com/users.json?key=04d5ee10");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data); 
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
            <a className="add-friends-btn" onClick={() => setShowModal(true)}>
                Add Friends
            </a>
            <div className="balance-section rounded-full">
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
                <ul className='p-6 divide-y divide-slate-200'>
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
                <AddFriendModal showModal={showModal} onClose={() => setShowModal(false)} />
            )}

            <Navbar />

        </div>
    );
}

export default FriendsPage;