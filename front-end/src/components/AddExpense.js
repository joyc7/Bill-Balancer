import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SplitModal from "./SplitModal";
import '../styles/AddExpense.css';

const AddExpense = props => {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [splitMethod, setSplitMethod] = useState('Choose Split Method');

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        date: '',
        personPaid: '',  
        // remove this after we can fetch api from backend to get the peopleSplit in the form 
        peopleSplit: [
            {
                "id": 1,
                "first_name": "Maressa",
                "avatar": "https://robohash.org/quiaperiamrem.png?size=50x50&set=set1"
            }, 
            {
                "id": 2,
                "first_name": "Fredric",
                "avatar": "https://robohash.org/quaeetcorrupti.png?size=50x50&set=set1"
            }, 
            {
                "id": 3,
                "first_name": "Rosina",
                "avatar": "https://robohash.org/officiismaximecorrupti.png?size=50x50&set=set1"
            }, 
            {
                "id": 4,
                "first_name": "Sim",
                "avatar": "https://robohash.org/animidoloribusomnis.png?size=50x50&set=set1"
            }, 
            {
                "id": 5,
                "first_name": "Olenka",
                "avatar": "https://robohash.org/rerumsaepeculpa.png?size=50x50&set=set1"
            }
        ],
        splitMethod: ''   
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

    // function handle the split method
    const handleMethodChange = (method) => {
        setSplitMethod(method);
        setFormData(prevFormData => ({
            ...prevFormData,
            splitMethod: method
        }));
        setShowModal(false); 
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
                    <button onClick={(e) => {e.preventDefault(); setShowModal(true)}}>{splitMethod === "equally" ? "Equally": "By "+splitMethod}</button>
                </div>
                <div className="submitBtn">
                    <button type="submit">Done</button>
                </div>
            </form>
            </div>

            <SplitModal onMethodChange={handleMethodChange} showModal={showModal} totalAmount={formData.amount} participants={formData.peopleSplit} onClose={() => setShowModal(false)} />

            <Navbar />
        </div>
      )
}

export default AddExpense;