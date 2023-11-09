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
    <div className="home-container bg-gray-100 min-h-screen p-4">
      <div className="box bg-white p-6 rounded-md shadow-md">
        <div>
          <h2 className="text-center text-2xl mb-4">
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
                <li key={expense.id} className="home-list-item mb-4">
                  <div className="flex justify-between items-center">
                    <p className="home-expense-text">{expense.name}</p>
                    <p className="home-expense-amount">${expense.amount}</p>
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
