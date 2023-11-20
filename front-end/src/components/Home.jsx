import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ isDarkMode }) => {
  const [backendData, setBackendData] = useState({});
  const [userName, setUserName] = useState("");

  const backupNames = {
    "id": 1,
    "name": "Bryn",
    "email": "btaylot0@booking.com",
    "avatar": "https://robohash.org/utetquibusdam.png?size=50x50\u0026set=set1",
    "user": [
        {
            "id": 5,
            "name": "Jdavie",
        },
        {
            "id": 2,
            "name": "Emmie",
        }
    ]
  };

  function calculateTotalSpending(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  useEffect(() => {
    if (isDarkMode) {
        document.body.classList.add('body-dark-mode');
    } else {
        document.body.classList.remove('body-dark-mode');
    }
    // if not in dark mode, remove this effect
    return () => {
        document.body.classList.remove('body-dark-mode');
    };
  }, [isDarkMode]);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const result = await axios.get("http://localhost:3001/home");
        setBackendData(result.data);
      } catch (err) {
        console.error(err);

        const backupData = {
          id: 2,
          name: "LA Road Trip",
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
          description: "Road trip with friends",
        };

        setBackendData(backupData);
      }
    };

    fetchHome();
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const result = await axios.get("http://localhost:3001/user");
        setUserName(result.data.name); // Assuming the user object has a 'name' property
      } catch (err) {
        console.error(err);
        setUserName(backupNames.name); // Use name from backupData
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="greeting">
        <h1>Good Morning, {userName}</h1>
      </div>
      <div className="dashboard">
        <div className="box total-spending">
          <div className="total-spending-header">
            <h2 className="heading2">Total Spending:</h2>
            <p className="heading2 total-amount">${calculateTotalSpending(backendData.expenses || [])}</p>
          </div>
          <div className="expenses-list-container">
            {backendData && backendData.expenses && backendData.expenses.length > 0 ? (
              <ul className="home-list">
                {backendData.expenses.map((expense) => (
                  <li key={expense.id} className="small">
                    <div className="center">
                      <p className="home-expense-text">{expense.name}</p>
                      <p className="home-expense-amount">${expense.amount}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="home-expense-amount">No expenses available.</p>
            )}
          </div>
        </div>
        <div className="box events-pending">
          <h2>Events Pending Payment</h2>
          <Link to="/events">View All Events</Link>
          {/* Implement event mapping */}
        </div>
        <div className="box friends-pending">
          <h2>Friends Pending Payment</h2>
          <Link to="/friends">View All Friends</Link>
          {/* Implement friend mapping */}
        </div>
      </div>
    </div>
  );
  
  
};

export default Home;