import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/FriendsPage.css";
import AddFriendModal from "./AddFriendModal";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";

function FriendsPage({ isDarkMode }) {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("body-dark-mode");
    } else {
      document.body.classList.remove("body-dark-mode");
    }
    // Cleanup function to remove dark mode class
    return () => {
      document.body.classList.remove("body-dark-mode");
    };
  }, [isDarkMode]); // Depend on isDarkMode prop

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const currentUser = jwtDecode(token);
        const userId = currentUser.id;
        const result = await axios.get(
          `http://localhost:3001/friends/${userId}`
        );
        setUserData(result.data);
        console.log(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const [settlements, setSettlements] = useState([]);
  const fetchSettlementsForFriends = async () => {
    if (!userData || !userData.friends) return;

    let settlements = [];
    for (const friend of userData.friends) {
      try {
        const fromUserToFriend = await axios.get(
          `http://localhost:3001/settlement/from/${userData._id}/to/${friend._id}`
        );
        const fromFriendToUser = await axios.get(
          `http://localhost:3001/settlement/from/${friend._id}/to/${userData._id}`
        );

        settlements.push({
          friend: friend,
          fromUserToFriend: fromUserToFriend.data,
          fromFriendToUser: fromFriendToUser.data,
        });
      } catch (error) {
        console.error(
          "Error fetching settlements for friend:",
          friend._id,
          error
        );
        // Optionally, you can push a default value or skip the friend
        settlements.push({
          friend: friend,
          fromUserToFriend: [],
          fromFriendToUser: [],
        });
      }
    }

    console.log(settlements);
    setSettlements(settlements);
  };

  useEffect(() => {
    fetchSettlementsForFriends();
  }, [userData]);

  const calculateBalances = (items) => {
    return items.map((item) => {
      const balance =
        item.fromUserToFriend.reduce(
          (acc, settlement) => acc - settlement.amount,
          0
        ) +
        item.fromFriendToUser.reduce(
          (acc, settlement) => acc + settlement.amount,
          0
        );

      const settlementIds = [
        ...item.fromUserToFriend.map((settlement) => settlement._id),
        ...item.fromFriendToUser.map((settlement) => settlement._id),
      ];

      return {
        ...item.friend,
        balance: balance,
        settlementIds: settlementIds,
      };
    });
  };

  const totalBalance = settlements.reduce((acc, item) => {
    return (
      acc +
      item.fromUserToFriend.reduce(
        (sum, settlement) => sum - settlement.amount,
        0
      ) +
      item.fromFriendToUser.reduce(
        (sum, settlement) => sum + settlement.amount,
        0
      )
    );
  }, 0);

  if (!userData) return <div>Loading...</div>;

  // const totalBalance = userData.friends && userData.friends.length ? userData.friends.reduce((acc, friend) => acc + parseFloat(friend.balance.replace('$', '')), 0) : 0;

  return (
    <div className="friends-page">
      <h1 className="page-title">Friends</h1>
      <div className="balance-section">
        <img src={userData.avatar} alt="User Avatar" className="user-avatar" />
        <div>
          <div className="balance-title">Total balance</div>
          <div className="balance-details">
            {totalBalance < 0 ? (
              <div> You owe ${Math.abs(totalBalance).toFixed(2)}</div>
            ) : totalBalance > 0 ? (
              <div> You are owed ${totalBalance.toFixed(2)}</div>
            ) : (
              <div> All Balances are Settled!</div>
            )}
          </div>
        </div>
      </div>

      <div className="friends-list">
        <ul className="p-6 divide-y divide-slate-200">
          {calculateBalances(settlements).map((friend) => (
            <li key={friend._id} className="friend-item">
              <span className="item-name-avatar">
                <img
                  src={friend.avatar}
                  alt={`${friend.username}'s avatar`}
                  className="friend-avatar"
                />
                <span>{friend.username}</span>
              </span>
              <div>
                <span
                  className={
                    friend.balance < 0 ? "negative-balance" : "positive-balance"
                  }
                >
                  ${friend.balance.toFixed(2)}
                </span>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    name={friend.settlementIds.join(",")}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-friends-btn-div">
        <button className="add-friends-btn" onClick={() => setShowModal(true)}>
          Add Friends
        </button>
      </div>

      <div className="space-to-scroll"></div>

      {showModal && (
        <AddFriendModal
          showModal={showModal}
          onClose={() => {
            setShowModal(false);
            window.location.reload();
          }}
        />
      )}

      <Navbar />
    </div>
  );
}

export default FriendsPage;
