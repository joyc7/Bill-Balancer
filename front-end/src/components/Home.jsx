import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ isDarkMode }) => {
  const [backendData, setBackendData] = useState({
    expenses: [],
    friends: [],
    events: [] 
  });
  const [userName, setUserName] = useState("");

  /* backupData for name in greeting */
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

  const backupData = {"id":1,"name":"Bryn","email":"btaylot0@booking.com","phone":"850-479-2094","avatar":"https://robohash.org/utetquibusdam.png?size=50x50\u0026set=set1","friends":[{"id":5,"name":"Jdavie","email":"jzecchinii0@yahoo.co.jp","phone":"967-156-0272","balance":"$57.06"},{"id":2,"name":"Emmie","email":"esworder1@xinhuanet.com","phone":"832-141-0597","balance":"$60.04"}]}; 

  const backupEventsData = {
    id: 2,
    name: "LA Road Trip",
    events: [
      {"id":1, "name":"Lunch", "amount":358, "creator":"Jane", "date":"06/16/2023"},
      {"id":2, "name":"Flights to LA", "amount":261, "creator":"Tom", "date":"01/21/2023"},
      {"id":3, "name":"Hotels", "amount":170, "creator":"David", "date":"08/02/2023"}
    ],
    description: "Road trip with friends",
  }


  function calculateTotalSpending(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  const eventsWithTotalExpenses = backendData.events ? backendData.events.map(event => ({
    ...event,
    totalExpense: calculateTotalSpending(event.expenses || [])
  })) : [];

  /* useEffect for controlling DarkMode of the margin around the page */
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

  /* useEffect for fetching total spending expenses */
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

  /* useEffect for fetching events and their expenses */
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const eventsResult = await axios.get("http://localhost:3001/events");
        if (Array.isArray(eventsResult.data)) {
          setBackendData(prevData => ({
            ...prevData,
            events: eventsResult.data,
          }));
        } else {
          // If it's not an array, log the structure to understand what's being returned
          console.error('Data fetched is not an array:', eventsResult.data);
          throw new Error('Data fetched is not an array.');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Use the array within backupEventsData, not the object itself
        setBackendData(prevData => ({
          ...prevData,
          events: backupEventsData.events, // Ensure this is an array
        }));
      }
    };
    
    fetchEventsData();
  }, []);
  
  

  /* useEffect for fetching friends and their expenses */
  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const friendsResult = await axios.get("http://localhost:3001/friends");
        setBackendData(prevData => ({
          ...prevData,
          friends: friendsResult.data.friends
        }));
      } catch (err) {
        console.error(err);
        setBackendData(prevData => ({
          ...prevData,
          friends: backupData.friends
        }));
      }
    };

    fetchFriendsData();
  }, []);

  

  /* since spaces are limited, only display 2 event expenses/friends, the user can access the rest by clicking "view more" */
  const friendsPendingPayment = backendData.friends ? backendData.friends.slice(0, 2) : [];
  const eventsPending = backupEventsData.events ? backupEventsData.events.slice(0, 2) : [];

   /* useEffect for fetching name for greeting */
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const result = await axios.get("http://localhost:3001/user");
        setUserName(result.data.name); 
      } catch (err) {
        console.error(err);
        setUserName(backupNames.name); 
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="home-container">
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
      <h2>Expenses Pending Payment</h2>
      <ul className="home-list">
  {eventsPending.map(event => (
    <li key={event.id} className="small">
      <div className="center">
        <p className="home-expense-text">{event.name}</p>
        <p className="home-expense-amount">${event.amount.toFixed(2)}</p>
      </div>
    </li>
  ))}
</ul>
      <Link to="/event" className="view-all">View All</Link>
          {/* Implement event mapping */}
        </div>
        <div className="box friends-pending">
        <h2 className="heading2">Friends Pending Payment</h2>
        <ul className="home-list">
          {friendsPendingPayment.map((friend) => (
            <li key={friend.id} className="small">
              <div className="center">
                <p className="home-expense-text">{friend.name}</p>
                <p className="home-expense-amount">{friend.balance}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/friends" className="view-all">View All</Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
  
  
};

export default Home;