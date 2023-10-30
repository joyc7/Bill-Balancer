import React, { useState, useEffect } from 'react';
import '../styles/Expense.css';
import Navbar from "./Navbar";
import AddExpenseModal from './AddExpenseModal';

function Expense() {
    const [expenseData, setExpenseData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    const backupExpenseData = {
        "tripTitle": "LA Roadtrip > Chick-Fill-A",
        "participants": [
            {"name": "Alice", "share": "+$11.27"},
            {"name": "Ben", "status": "Settled up"},
            {"name": "David", "share": "+$11.27"},
            {"name": "James", "status": "Settled up"},
            {"name": "Jojo", "share": "+$11.27"},
            {"name": "Zoey", "share": "+$11.27"} /* hardcode the backend data */
        ]
    };

    useEffect(() => {
        setExpenseData(backupExpenseData);
    }, []);

    if (!expenseData) return <div>Loading...</div>;

    return (
        <div className="expense-page">
            <div className="header">
                <h1>{expenseData.tripTitle}</h1>
                <button 
                    className="add-expense-btn"
                    onClick={() => setShowModal(true)}
                >
                    Add expense
                </button>
            </div>

            <div className="balance-buttons">
                <button className="balance-btn">Balance</button>
                <button className="total-btn">Total</button>
            </div>
            
            <div className="expense-list">
            {expenseData.participants.map((participant, index) => (
                    <div key={index} className="participant-item">
                        <span>{participant.name}</span>
                        {participant.share ? (
                            <span className="participant-share">
                                {participant.share}
                            </span>
                        ) : (
                            <span className="settled-up">
                                {participant.status}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Expense button*/ }               
            {showModal && (
                <AddExpenseModal showModal={showModal} onClose={() => setShowModal(false)} />
            )}

            <Navbar />
        </div>
    );
}

export default Expense;
