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
        peopleSplit: [],
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

    const handleAmountsChange = (amounts) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            amountDetails: amounts
        }));
    };

    const handleAddExpense = async () => {
        const submissionData = {
            ...formData,
            peopleSplit: formData.peopleSplit.map(person => person.id)
        };
        try {
            console.log(formData);
            const response = await axios.post('http://localhost:3001/add-expense', formData);
            console.log(response.data);
            navigate('/event');
        } catch (error) {
            console.error('Failed to submit expense:', error);
        }
    };

    const [people, setPeople] = useState([]); 

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axios.get('http://localhost:3001/addExpensePayer'); 
                setPeople(response.data);
            } catch (error) {
                console.error('Failed to fetch people:', error);
            }
        };

        fetchPeople();
    }, []);

    const handlePaidByChange = (event) => {
        // Update your form data state accordingly
        setFormData({ ...formData, personPaid: event.target.value });
    };

    const [selectedPeople, setSelectedPeople] = useState([]); 
    const [availablePeople, setAvailablePeople] = useState([]); 

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            peopleSplit: selectedPeople
        }));
    }, [selectedPeople]);

    useEffect(() => {
        const fetchAvailablePeople = async () => {
            try {
                const response = await axios.get('http://localhost:3001/addExpensePayer'); 
                setAvailablePeople(response.data);
            } catch (error) {
                console.error('Failed to fetch people:', error);
            }
        };
        fetchAvailablePeople();
    }, []);


    const handleSelectPerson = personId => {
        const person = availablePeople.find(p => p.id === personId);
        if (person) {
            setAvailablePeople(availablePeople.filter(p => p.id !== personId));
            setSelectedPeople([...selectedPeople, person]);
        }
    };
    
    const handleRemovePerson = personId => {
        const person = selectedPeople.find(p => p.id === personId);
        if (person) {
            setSelectedPeople(selectedPeople.filter(p => p.id !== personId));
            setAvailablePeople([...availablePeople, person]);
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
                    <select name="personPaid" value={formData.personPaid} onChange={handlePaidByChange}>
                        <option value="">Select who paid</option>
                        {people.map(person => (
                            <option key={person.id} value={person.id}>
                                {person.first_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div id="split">
                    <label>Available People:</label><br/>
                    <div>
                    <select id="available-container" size="5">
                        {availablePeople.map(person => (
                            <option key={person.id} onClick={() => handleSelectPerson(person.id)}>
                                {person.first_name}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>
                <div>
                    <label>Selected People:</label><br/>
                    <div id="selected-container">
                        {selectedPeople.map(person => (
                            <div key={person.id} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                                <img src={person.avatar} alt={person.first_name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                <span>{person.first_name}</span>
                                <button className="remove-button" onClick={() => handleRemovePerson(person.id)}> x </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="splitMethods">
                    <button onClick={(e) => {e.preventDefault(); setShowModal(true)}}>{splitMethod === "equally" ? "Equally": "By "+splitMethod}</button>
                </div>
                <div className="submitBtn">
                    <button type="submit">Done</button>
                </div>
            </form>
            </div>

            <SplitModal 
                onMethodChange={handleMethodChange} 
                onAmountsChange={handleAmountsChange}
                showModal={showModal} 
                totalAmount={formData.amount} 
                participants={formData.peopleSplit} 
                onClose={() => setShowModal(false)} 
            />

            <Navbar />
        </div>
      )
}

export default AddExpense;