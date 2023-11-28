import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/FriendsPage.css';
import AddFriendModal from './AddFriendModal';
import Navbar from "./Navbar";
import { jwtDecode } from 'jwt-decode';

function FriendsPage({ isDarkMode }) {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false); 

    const backupData = {"id":1,"name":"Bryn","email":"btaylot0@booking.com","phone":"850-479-2094","avatar":"https://robohash.org/utetquibusdam.png?size=50x50\u0026set=set1","friends":[{"id":5,"name":"Jdavie","email":"jzecchinii0@yahoo.co.jp","phone":"967-156-0272","balance":"$57.06"},{"id":2,"name":"Emmie","email":"esworder1@xinhuanet.com","phone":"832-141-0597","balance":"$60.04"}]}; 

    // useEffect for dark mode
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('body-dark-mode');
        } else {
            document.body.classList.remove('body-dark-mode');
        }
        // Cleanup function to remove dark mode class
        return () => {
            document.body.classList.remove('body-dark-mode');
        };
    }, [isDarkMode]); // Depend on isDarkMode prop

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const currentUser = jwtDecode(token); 
                const userId = currentUser.id; 
                const result = await axios.get(`http://localhost:3001/friends/${userId}`);
                setUserData(result.data); 
            } catch (err) {
                console.error(err); 
                setUserData(backupData);
            }
        }
        fetchData();
    }, []);

    if (!userData) return <div>Loading...</div>;

    // const totalBalance = userData.friends && userData.friends.length ? userData.friends.reduce((acc, friend) => acc + parseFloat(friend.balance.replace('$', '')), 0) : 0;

    return (
        <div className="friends-page">
            <h1 className="page-title">Friends</h1>
            <div className="balance-section">
                <img src={`https://robohash.org/${userData.username}.png?size=50x50&set=set1`} alt="User Avatar" className="user-avatar"/>
                <div>
                    <div className="balance-title">Total balance</div>
                    {/* <div className="balance-details">
                        {totalBalance < 0 && (
                            <div> You owe ${Math.abs(totalBalance).toFixed(2)}</div>
                        )}
                        {totalBalance > 0 && (
                            <div> You are owed ${totalBalance.toFixed(2)}</div>
                        )}
                        {totalBalance === 0 && (
                            <div> All Balances are Settled!</div>
                        )}
                    </div> */}
                </div>
            </div>

            <div className="friends-list">
                <ul className='p-6 divide-y divide-slate-200'>
                    {userData.friends.map((friend) => (
                        <li key={friend.username} className="friend-item">
                            <span className='item-name-avatar'>
                                <img src={`https://robohash.org/${friend.username}.png?size=50x50&set=set1`} alt={`${friend.username}'s avatar`} className="friend-avatar"/>
                                <span>{friend.username}</span>
                            </span>
                            {/* <span className={parseFloat(friend.balance.replace('$', '')) < 0 ? "negative-balance" : "positive-balance"}>
                                 {friend.balance}
                            </span> */}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className='add-friends-btn-div'>
                <button className="add-friends-btn" onClick={() => setShowModal(true)}>
                    Add Friends
                </button>
            </div>

            <div className="space-to-scroll"></div>

            {showModal && (
                <AddFriendModal showModal={showModal} onClose={() => setShowModal(false)} />
            )}

            <Navbar />

        </div>
    );
}

export default FriendsPage;