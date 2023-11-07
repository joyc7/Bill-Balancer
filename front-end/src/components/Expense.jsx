/* Expense.jsx - components of Expense Page */

import React, { useState, useEffect } from 'react';
import '../styles/Expense.css';
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom"; // useNavigate is used to direct the user to the previous page

function Expense() {
    const [expensesData, setExpensesData] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch("https://my.api.mockaroo.com/expense_data.json?key=2712db60");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setExpensesData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Using backup data when API call fails
            setExpensesData(backupData_expenses.expense);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const backupData_expenses = {
        "expense": [
            {"id":1,"name":"Jolynn","expense":"$246.92"},
            {"id":2,"name":"Merv","expense":"$210.86"},
            {"id":3,"name":"Cora","expense":"$18.65"},
            {"id":4,"name":"Dwain","expense":"$200.25"},
            {"id":5,"name":"Husain","expense":"$478.25"}
        ]
    };

    // navigates to the previous page
    const handleTitleClick = () => {
        navigate(-1); 
    };
    
    return (
        <div className="expense">
            <h1 className="page-title" onClick={handleTitleClick}>LA Roadtrip | Flights to LA</h1> {/* click the title to direct to the previous page */}
            <div className="buttons">
                <button className="balance-btn">Balance</button>
                <button className="total-btn">Total</button>
                </div>
            <div className="expense-container">
                
                {/* Default: assume all expenses are positive */}
                <div className="expense-list">
                    {/* Assume a headcount limit to split the bill */}
                    {expensesData.slice(0, 7).map(item => (
                    <div key={item.id} className="expense-item">
                        <span>{item.name}</span>
                        <span className={parseFloat(item.expense.replace('$', '')) > 0 ? 'positive' : 'negative'}>{item.expense}</span>
                        <div className="checkbox"><input type="checkbox" name={item.id} /></div> {/* add checkbox to settle up */}
                        </div>
                        ))}
                        
                        </div>
            </div>
            <Navbar />
        </div>
    );
}

export default Expense;
