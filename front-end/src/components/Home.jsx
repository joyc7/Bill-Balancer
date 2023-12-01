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
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(dateStr);
  
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName} ${day} ${year}`;
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

          const homeRes = await axios.get("http://localhost:3001/home");
          console.log("Home Response:", homeRes.data);
          const expenses = homeRes.data.expenses || [];
          const totalSpending = calculateTotalSpending(expenses);

          // Fetch events data
          const eventsRes = await axios.get(`http://localhost:3001/events/for/${currentUser.id}`);
          const events = eventsRes.data.events || [];

          // Fetch friends data
          const friendsRes = await axios.get(`http://localhost:3001/friends/${currentUser.id}`);
          const friends = friendsRes.data.friends || [];

          const userName = currentUser.username || "";

          setData({ userName, friends, events, expenses, totalSpending });
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

  function calculateTotalSpending(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  const eventsWithTotalExpenses = data.events
    ? data.events.map((event) => ({
        ...event,
        totalExpense: calculateTotalSpending(event.expenses || []),
      }))
    : [];

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
  const expensesPending = data.expenses ? data.expenses.slice(0, 3) : [];
  const eventsPending = data.events ? data.events.slice(0, 3) : [];
  console.log(eventsPending);

  return (
    <div className="home-container">
      <div className="greeting">
        <h1>Welcome, {data.userName}</h1>
      </div>
      <div className="dashboard">
        <div className="box events-summary">
          <h2 className="heading2">Events Summary</h2>
          <ul className="home-list">
            {eventsPending.length > 0 ? (
              eventsPending.map((event) => (
              <li key={event.id} className="small">
                <div className="center">
                  <p className="home-expense-text">{event.name}</p>
                  <p className="home-expense-amount">{reformatDate(event.date)}</p>
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
        <div className="box events-pending">
          <h2>Expenses Summary</h2>
          {/* <p className="heading2 total-amount">${calculateTotalSpending(data.expenses || [])}</p> */}
          <ul className="home-list">
            {expensesPending.map((event) => (
              <li key={event.id} className="small">
                <div className="center">
                  <p className="home-expense-text">{event.name}</p>
                  <p className="home-expense-amount">
                    ${event.amount.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/event" className="view-all">
            View All
          </Link>
        </div>
        <div className="box friends-pending">
          <h2 className="heading2">Friends Summary</h2>
          <ul className="home-list">
            {friendsPendingPayment.length > 0 ? (
              friendsPendingPayment.map((friend) => (
              <li key={friend.id} className="small">
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
