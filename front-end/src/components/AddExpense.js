import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/AddExpense.css';

const AddExpense = props => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        date: '',
        personPaid: '',   
        peopleSplit: []   
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "peopleSplit" && e.target.multiple) {
            // Handle the selection of multiple options for 'peopleSplit'
            const selectedOptions = [...e.target.options].filter(o => o.selected).map(o => o.value);
            setFormData(prevFormData => ({
                ...prevFormData,
                peopleSplit: selectedOptions
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleAddExpense = async () => {
        try {
            const response = await axios.post('http://localhost:3001/add-expense', formData);
            console.log(response.data);
            navigate('/event');
        } catch (error) {
            console.error('Failed to submit expense:', error);
        }
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
                    <input name="name" placeholder="Enter a name" value={formData.name} onChange={handleInputChange}/>
                </div>
                <div id="amountInput">
                    <label>Amount:</label><br/>
                    <input name="amount" placeholder="Enter the amount" value={formData.amount} onChange={handleInputChange}/>
                </div>
                <div id="dateInput">
                    <label>Date:</label><br/>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange}/>
                </div>
                <div id="paid">
                    <label>Paid by:</label><br/>
                    <select name="personPaid" value={formData.personPaid} onChange={handleInputChange}>
                        {/* fetch data to get the list of people participated in this event */}
                    </select>
                </div>
                <div id="split">
                    <label>Split by:</label><br/>
                    <select name="peopleSplit" multiple size="5" value={formData.peopleSplit} onChange={handleInputChange}>
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