import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/FriendDetailPage.css";

function FriendDetailPage() {
  const [settlements, setSettlements] = useState({
    fromUserToFriend: [],
    fromFriendToUser: [],
  });
  const [friend, setFriend] = useState(null);
  const { friendId } = useParams();
  const token = localStorage.getItem("token");
  const currentUser = jwtDecode(token);
  const userId = currentUser.id;

  useEffect(() => {
    const fetchSettlements = async () => {
      try {
        const friendInfo = await axios.get(
          `http://localhost:3001/search-user-info/${friendId}`
        );
        const fromUserToFriend = await axios.get(
          `http://localhost:3001/settlement/from/${userId}/to/${friendId}`
        );
        const fromFriendToUser = await axios.get(
          `http://localhost:3001/settlement/from/${friendId}/to/${userId}`
        );
        setFriend(friendInfo.data);
        setSettlements({
          fromUserToFriend: fromUserToFriend.data,
          fromFriendToUser: fromFriendToUser.data,
        });
      } catch (error) {
        console.error("Error fetching friend and settlements:", error);
      }
    };

    fetchSettlements();
  }, [friendId, userId]);

  const renderSettlements = (settlementList, isFromUser) => {
    return settlementList.map((settlement, index) => {
      const expenseName = settlement.expense?.name || "Unknown";
      return (
        <div key={index} className="settlement-item">
          <span className="settlement-label">
            {settlement.event.name}|{expenseName}
          </span>
          <span className={isFromUser ? "negative" : "positive"}>
            {isFromUser ? "-" : "+"}${Math.abs(settlement.amount).toFixed(2)}
          </span>
          <span className="settlement-status">
            {settlement.status ? "Settled" : ""}
          </span>
        </div>
      );
    });
  };

  const calculateTotalBalance = () => {
    const amountYouOwe = settlements.fromUserToFriend.reduce(
      (total, settlement) => {
        return settlement.status ? total : total + settlement.amount;
      },
      0
    );

    const amountFriendOwesYou = settlements.fromFriendToUser.reduce(
      (total, settlement) => {
        return settlement.status ? total : total + settlement.amount;
      },
      0
    );

    return { amountYouOwe, amountFriendOwesYou };
  };

  const { amountYouOwe, amountFriendOwesYou } = calculateTotalBalance();

  // Check if friend is not null before rendering
  if (!friend) {
    return <div>Loading...</div>;
  }

  return (
    <div id="friend-detail-page">
      <header>
        <h2>
          <Link to="/friends">Friends</Link>|{friend.username}
        </h2>
      </header>

      <section className="balance">
        <img src={friend.avatar} alt="Friend Avatar" className="user-avatar" />
        <div>
          <div className="balance-title">Balance Overview</div>
          <div className="balance-amounts">
            {amountYouOwe === 0 && amountFriendOwesYou === 0 ? (
              <div className="balance-settled">Your balances are settled!</div>
            ) : (
              <>
                <div className="amount-you-owe">
                  You owe: ${amountYouOwe.toFixed(2)}
                </div>
                <div className="amount-friend-owes-you">
                  {friend.username} owes: ${amountFriendOwesYou.toFixed(2)}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="settlements-section">
        <h3>Amount You Owe {friend.username}</h3>
        {renderSettlements(settlements.fromUserToFriend, true)}
      </div>
      <div className="settlements-section">
        <h3>Amount {friend.username} Owes You</h3>
        {renderSettlements(settlements.fromFriendToUser, false)}
      </div>
      <Navbar />
    </div>
  );
}

export default FriendDetailPage;
