import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/AddExpense.css';

const AddExpense = props => {

    const navigate = useNavigate();

    const handleAddExpense = () => {
        // submit the form information
        navigate('/event');
    };

    return (
        <div>
            <header>
                <h2><Link to='/event'>Event</Link>|Add New Expense</h2>
            </header>
            <div id="addExpense">
            <form onSubmit={e => { e.preventDefault(); handleAddExpense(); }}>
                <div id="nameInput">
                    <label>Name:</label><br/>
                    <input name="name" placeholder="Enter a name"/>
                </div>
                <div id="amountInput">
                    <label>Amount:</label><br/>
                    <input name="amount" placeholder="Enter the amount"/>
                </div>
                <div id="dateInput">
                    <label>Date:</label><br/>
                    <input type="date" name="date"/>
                </div>
                <div id="paid">
                    <label>Paid by:</label><br/>
                    <select name="people">
                        {/* fetch data to get the list of people participated in this event */}
                    </select>
                </div>
                <div id="split">
                    <label>Split by:</label><br/>
                    <select name="people" multiple size="5">
                        {/* fetch data to get the list of people participated in this event */}
                    </select>
                </div>
                <div className="splitMethods">
                    Equally
                </div>
                <div className="formBtn">
                    <button type="submit">Done</button>
                </div>
            </form>
            </div>

            <Navbar />
        </div>
      )
}

export default AddExpense;