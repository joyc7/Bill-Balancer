import React, { useState } from 'react';

function AddExpenseModal({ showModal, onClose }) {
    const [expenseData, setExpenseData] = useState(null);
    const [loading, setLoading] = useState(false);

    const backupExpenseData = {
        "description": "Chick-Fil-A",
        "amount": "$45.69"
    };

    async function handleAddClick() {
        setLoading(true);
        try {
            const response = await fetch("https://my.api.mockaroo.com/addExpenses.json?key=04d5ee10");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setExpenseData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setExpenseData(backupExpenseData);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span c
                lassName="close" onClick={onClose}>&times;
                </span>

                <h2>Add a new expense</h2>

                <input type="text" placeholder="People" className='input-content'/>
                <input type="text" placeholder="Amount" className='input-content'/>
                
                <button 
                onClick={handleAddClick}>Done
                </button>

                {loading && <div>Loading...</div>}
                {expenseData && (
                    <div className="expense-item">
                        <span>
                            {expenseData.description}
                        </span>
                        <span>
                            {expenseData.amount}
                            </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddExpenseModal;
