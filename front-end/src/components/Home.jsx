import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";
import axios from "axios";

const Home = () => {
  const [backendData, setBackendData] = useState({});

  function calculateTotalSpending(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

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

  return (
    <div className="home-container">
      <div className="box">
        <div>
          <h2 className="text-center">
            {backendData &&
              Array.isArray(backendData.expenses) &&
              backendData.expenses.length > 0 && (
                <p>
                  Total Spending: $
                  {calculateTotalSpending(backendData.expenses)}
                </p>
              )}
          </h2>
          <ul className="home-list">
            {backendData &&
            backendData.expenses &&
            backendData.expenses.length > 0 ? (
              backendData.expenses.map((expense) => (
                <li key={expense.id} className="home-list2">
                  <div className="mr-64">
                    <p className="home-expense-text">{expense.name}</p>
                  </div>
                  <div>
                    <p className="home-expense-amount">
                      Amount: ${expense.amount}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="home-expense-amount">No expenses available.</p>
            )}
          </ul>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;