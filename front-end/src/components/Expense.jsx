/* Expense.jsx - components of Expense Page */

import React, { useState, useEffect } from 'react';
import '../styles/Expense.css';
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom"; 


function Expense({ isDarkMode }) {
    const [expensesData, setExpensesData] = useState([]);
    const navigate = useNavigate();
    const { expenseId } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/expense/ExpenseDetail/${expenseId}`);
            console.log(response.data); 
            setExpensesData(response.data);
        }catch(error){
            console.error("There was an error fetching the data:", error);
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

    {/* navigates to the previous page */}
    const handleTitleClick = () => {
        navigate(-1); 
    };
    
    return (
        <div className="expense">
            <h1 className="page-title" onClick={handleTitleClick}>
                {expensesData.event ? expensesData.event.name : 'Loading...'} | 
                {expensesData.name ? expensesData.name : 'Loading...'}            
            </h1>
            <div className="buttons">
                <button className="balance-btn">Balance</button>
                <button className="total-btn">Total</button>
                </div>
            <div className="expense-container">
                
                {expensesData && (
                    <div className="expense-list">
                        {expensesData.splitDetails && expensesData.splitDetails.map(split => (
                            <div className="expense-item" key={split.settlement._id}>
                                <span>{split.user.username}</span>
                                <span className={parseFloat(split.settlement.amount) > 0 ? 'positive' : 'negative'}>{split.settlement.amount}</span>
                                <div className="checkbox"><input type="checkbox" name={split.settlement._id} /></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Navbar />
        </div>
    );
}

export default Expense;