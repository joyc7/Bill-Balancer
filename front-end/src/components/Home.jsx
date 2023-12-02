import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Home = ({ isDarkMode }) => {
  const [data, setData] = useState({
    userName: "",
    totalSpending: 0,
    expenses: [],
    friends: [],
    events: [],
  });
  const [expenseSummary, setExpenseSummary] = useState([]);

  /* backupData from Expenses, Events, Friends.jsx */
  const backupData = {
    userName: "Bryn",
    totalSpending: 0,
    expenses: [
      {
        id: 1,
        name: "Lunch",
        amount: 358,
        creator: "Jane",
        date: "06/16/2023",
      },
      {
        id: 2,
        name: "Flights to LA",
        amount: 261,
        creator: "Tom",
        date: "01/21/2023",
      },
      {
        id: 3,
        name: "Hotels",
        amount: 170,
        creator: "David",
        date: "08/02/2023",
      },
    ],
    events: [
      {
        id: 1,
        EventName: "Cooro",
        Date: "06/16/2023",
        balance: "$358.00",
        description: "Lunch at local restaurant",
        members: [{ names: "Jane" }, { names: "John" }],
      },
      {
        id: 2,
        EventName: "Kobe",
        Date: "01/21/2023",
        balance: "$262.00",
        description: "Flight tickets for LA trip",
        members: [{ names: "Tom" }, { names: "Lucy" }],
      },
      {
        id: 3,
        EventName: "Cuiji",
        Date: "08/02/2023",
        balance: "$170.00",
        description: "Accommodation expenses",
        members: [{ names: "David" }, { names: "Sarah" }],
      },
    ],
    friends: [
      {
        id: 2,
        name: "Jdavie",
        email: "jzecchinii0@yahoo.co.jp",
        phone: "967-156-0272",
        balance: "$57.06",
      },
      {
        id: 4,
        name: "Emmie",
        email: "esworder1@xinhuanet.com",
        phone: "832-141-0597",
        balance: "$60.04",
      },
      {
        id: 5,
        name: "Jason",
        email: "jsathep@pehisbd.com",
        phone: "212-121-0437",
        balance: "$70.41",
      },
    ],
  };

  function reformatDate(dateStr) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateStr);

    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName} ${day} ${year}`;
  }

  function calculateExpenseSummary(expenses) {
    const summary = expenses.reduce((acc, expense) => {
      // If the event is already in the accumulator, add to its totalAmount
      if (acc[expense.event._id]) {
        acc[expense.event._id].totalAmount += expense.amount;
      } else {
        // Otherwise, create a new entry in the accumulator
        acc[expense.event._id] = {
          event: expense.event,
          totalAmount: expense.amount,
        };
      }
      return acc;
    }, {});
    // Convert the summary object back into an array
    return Object.values(summary);
  }

  useEffect(() => {
    const getTokenFromLocalStorage = () => {
      const token = localStorage.getItem("token");
      return token;
    };

    const decodeToken = (token) => {
      try {
        const currentUser = jwtDecode(token);
        if (!currentUser || !currentUser.id) {
          console.error("No current user found in local storage.");
          return null;
        }
        return currentUser;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };

    const fetchData = async () => {
      try {
        const token = getTokenFromLocalStorage();
        const currentUser = decodeToken(token);

        if (currentUser) {
          console.log("Current User:", currentUser);

          const expenseRes = await axios.get(
            `http://localhost:3001/settlement/from/${currentUser.id}`
          );
          console.log("Response:", expenseRes.data);
          const newTotalSpending = calculateTotalSpending(expenseRes.data);
          const newExpenses = expenseRes.data.map((settlement) => {
            return {
              event: settlement.event,
              amount: settlement.amount,
            };
          });

          // Fetch events data
          const eventsRes = await axios.get(
            `http://localhost:3001/events/for/${currentUser.id}`
          );
          const events = eventsRes.data.events || [];

          // Fetch friends data
          const friendsRes = await axios.get(
            `http://localhost:3001/friends/${currentUser.id}`
          );
          const friends = friendsRes.data.friends || [];

          const userName = currentUser.username || "";

          setData({
            userName,
            totalSpending: newTotalSpending,
            expenses: newExpenses,
            friends,
            events,
          });
        } else {
          console.error("No valid user found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(backupData); // set to backup data in case of error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newExpenseSummary = calculateExpenseSummary(data.expenses);
    setExpenseSummary(newExpenseSummary);
  }, [data.expenses]);

  function calculateTotalSpending(settlements) {
    let total = 0;
    settlements.forEach((settlement) => {
      total += settlement.amount;
    });
    return total;
  }

  /* useEffect for controlling DarkMode of the margin around the page */
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("body-dark-mode");
    } else {
      document.body.classList.remove("body-dark-mode");
    }
    // if not in dark mode, remove this effect
    return () => {
      document.body.classList.remove("body-dark-mode");
    };
  }, [isDarkMode]);

  /* since spaces are limited, only display 3 event expenses/friends, the user can access the rest by clicking "view more" */
  const friendsPendingPayment = data.friends ? data.friends.slice(0, 3) : [];
  const eventsPending = data.events ? data.events.slice(0, 3) : [];

  return (
    <div className="home-container">
      <div className="greeting">
        <h1>Welcome, {data.userName}</h1>
      </div>
      <div className="dashboard">
        <div className="box events-pending">
          <h2>Expenses Summary</h2>
          {/* <p className="heading2 total-amount">${calculateTotalSpending(data.expenses || [])}</p> */}
          <ul className="home-list">
            {expenseSummary.map((item) => (
              <li key={item.event._id} className="small">
                <div className="center">
                  <p className="home-expense-text">{item.event.name}</p>
                  <p className="home-expense-amount">
                    ${item.totalAmount.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="box events-summary">
          <h2 className="heading2">Events Summary</h2>
          <ul className="home-list">
            {eventsPending.length > 0 ? (
              eventsPending.map((event) => (
                <li key={event._id} className="small">
                  <div className="center">
                    <p className="home-expense-text">{event.name}</p>
                    <p className="home-expense-amount">
                      {reformatDate(event.date)}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <div>No Events Added Yet.</div>
            )}
          </ul>
          <Link to="/events" className="view-all">
            View All
          </Link>
        </div>
        <div className="box friends-pending">
          <h2 className="heading2">Friends Summary</h2>
          <ul className="home-list">
            {friendsPendingPayment.length > 0 ? (
              friendsPendingPayment.map((friend) => (
                <li key={friend._id} className="small">
                  <div className="center">
                    <p className="home-expense-text">{friend.username}</p>
                    <p className="home-expense-amount">{friend.balance}</p>
                  </div>
                </li>
              ))
            ) : (
              <div>No Friends Added Yet.</div>
            )}
          </ul>
          <Link to="/friends" className="view-all">
            View All
          </Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
