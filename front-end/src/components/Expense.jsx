/* Expense.jsx - components of Expense Page */

import React, { useState, useEffect } from 'react';
import '../styles/Expense.css';
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom"; {/* useNavigate is used to direct the user to the previous page */}

function Expense({ isDarkMode }) {
    const [expensesData, setExpensesData] = useState([]);
    const navigate = useNavigate();
    const { expenseId } = useParams();
    console.log("expenseId:", expenseId)

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/expense/ExpenseDetail/${expenseId}`);
            console.log(response)
            setExpensesData(response.data);
        }catch(error){
            console.error("There was an error fetching the data:", error);
            console.log(backupData_expenses)
            setExpensesData(backupData_expenses)
        }
    };

    useEffect(() => {
        // Toggle the 'body-dark-mode' class on the body element
        if (isDarkMode) {
            document.body.classList.add('body-dark-mode');
        } else {
            document.body.classList.remove('body-dark-mode');
        }
        
        // Clean up function to remove the class when the component unmounts or when dark mode is turned off
        return () => {
            document.body.classList.remove('body-dark-mode');
        };
    }, [isDarkMode]);
    
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

    {/* navigates to the previous page */}
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
                        <span>{item.name}</span> {/* This is the first child */}
                        <span className={parseFloat(item.expense.replace('$', '')) > 0 ? 'positive' : 'negative'}>{item.expense}</span> {/* This is the second child */}
                        <div className="checkbox"><input type="checkbox" name={item.id} /></div> {/* This is the third child */}
                        </div>
                        ))}
                        
                        </div>
            </div>
            <Navbar />
        </div>
    );
}

export default Expense;
