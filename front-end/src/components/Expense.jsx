/* Expense.jsx - components of Expense Page */

import React, { useState, useEffect } from 'react';
import '../styles/Expense.css';
import Navbar from "./Navbar";
import AddExpenseModal from './AddExpenseModal';

function Expense() {
    const [expenseData, setExpenseData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const backupExpenseData = {
        "id": 1,
        "name": "LA Roadtrip > Chick-Fill-A",
        "totalAmount": "$45.69",
        "participants": [
            {"id": 1, "name": "Alice", "share": "+$11.27"},
            {"id": 2, "name": "Ben", "status": "Settled up"},
            {"id": 3, "name": "David", "share": "+$11.27"},
            {"id": 4, "name": "James", "status": "Settled up"},
            {"id": 5, "name": "Jojo", "share": "+$11.27"},
            {"id": 6, "name": "Zoey", "share": "+$11.27"}
        ]
    }; 

    useEffect(() => {
        // set the backup data directly, real data will be implentment when working on back-end
        setExpenseData(backupExpenseData);
    }, []);

    if (!expenseData) return <div>Loading...</div>;

    return (
        <div className="expense-page">
            <Navbar />
            <h1 className="page-title">{expenseData.name}</h1>
            <div className="header">
            <div className="header-info">
                <span>7 people</span>
                <span>Created Aug 2023</span>
            </div>
            </div>
            <div className="owed-amount">
                Alice owed you {expenseData.totalAmount}
            </div>
            <div className="buttons">
                <button className="bg-light-blue-200 text-light-blue-800">Settle up</button>
                <button className="bg-light-blue-200 text-light-blue-800">Balance</button>
                <button className="bg-light-blue-200 text-light-blue-800">Total</button>
            </div>

            <button onClick={() => setShowModal(true)} className="add-expense-btn">
                Add Expense
            </button>

            <h1 className="page-title">{expenseData.name}</h1>


            <div className="expense-list">
                <ul className='p-6 divide-y divide-slate-200'>
                    {expenseData.participants.map((participant) => (
                    <li key={participant.id} className="participant-item">
                        <span>{participant.name}</span>
                        <span className={`participant-detail ${participant.share ? "text-blue-500" : "text-orange-500"}`}>
                            {participant.share ? participant.share : participant.status}
                            </span>
                    </li>
                    ))}
                </ul>
            </div>
            
            {showModal && (
                <AddExpenseModal showModal={showModal} onClose={() => setShowModal(false)} /> )}
        </div>
    );
}

export default Expense;
