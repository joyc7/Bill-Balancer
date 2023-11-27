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
        selectedPeople: [],
        splitMethod: ''   
    }); 

    const [validationMessages, setValidationMessages] = useState({
        name: '',
        amount: '',
        date: '',
        personPaid: '',
        selectedPeople: ''
    });    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "selectedPeople" && e.target.multiple) {
            const selectedOptions = [...e.target.options].filter(o => o.selected).map(o => o.value);
            console.log("People Split Changed:", selectedOptions); // Debugging
    
            setFormData(prevFormData => ({
                ...prevFormData,
                selectedPeople: selectedOptions
            }));
    
            if (selectedOptions.length > 0) {
                setValidationMessages(prevMessages => {
                    console.log("Clearing selectedPeople validation message"); // Debugging
                    return { ...prevMessages, selectedPeople: '' };
                });
            }
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }

        // Validation logic
        let message = '';
        if (name === 'name') {
            message = value.length < 3 ? '<3 characters' : '';
        } else if (name === 'amount') {
            const number = parseFloat(value);
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: isNaN(number) ? '' : number
            }));
            if (isNaN(number)) {
                message = 'Invalid entry';
            } else if (number <= 0) {
                message = 'Invalid amount';
            }
        } else if (name === 'date') {
            if (!value) {
                message = ' Enter a date';
            } else if (new Date(value) > new Date()){
                message = 'Invalid date';
            }
        } else if (name === 'personPaid') {
            if (!value) {
                message = ' Selection required'; 
            }
        } else if (name === 'selectedPeople') {
            if (value.length === 0) {
                message = ' Selection required'; 
            }
        }

        setValidationMessages(prevMessages => ({
            ...prevMessages,
            [name]: message
        }));
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
        let newValidationMessages = {
            name: '',
            amount: '',
            date: '',
            personPaid: '',
            selectedPeople: ''
        };
    
        let isValid = true;

        if (formData.name.length < 3) {
            newValidationMessages.name = ' <3 characters';
            isValid = false;
        }
    
        if (!(typeof formData.amount === 'number') || isNaN(formData.amount)) {
            newValidationMessages.amount = ' Invalid entry';
            isValid = false;
        } else if (formData.amount <= 0) {
            newValidationMessages.amount = ' Invalid amount';
            isValid = false;
        }

        if (!formData.date) {
            newValidationMessages.date = ' Enter a date';
            isValid = false;
        } else if (new Date(formData.date) > new Date()) {
            newValidationMessages.date = ' Invalid date';
            isValid = false;
        }

        if (!formData.personPaid) {
            newValidationMessages.personPaid = ' Selection required';
            isValid = false;
        }

        if (formData.selectedPeople.length === 0) {
            newValidationMessages.selectedPeople = ' Selection required';
            isValid = false;
        }
    
        setValidationMessages(newValidationMessages);
    
        if (!isValid) {
            return; // prevent form submission
        }

        const submissionData = {
            ...formData,
            selectedPeople: formData.selectedPeople.map(person => person.id)
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
        const selectedValue = event.target.value;

        setFormData({ ...formData, personPaid: selectedValue });

        if (selectedValue) {
            setValidationMessages(prevMessages => {
                return { ...prevMessages, personPaid: '' };
            });
        }
    };

    const [selectedPeople, setSelectedPeople] = useState([]); 
    const [availablePeople, setAvailablePeople] = useState([]); 

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            selectedPeople: selectedPeople
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
            const updatedSelectedPeople = [...selectedPeople, person];
            setSelectedPeople(updatedSelectedPeople);
    
            if (updatedSelectedPeople.length > 0) {
                setValidationMessages(prevMessages => ({
                    ...prevMessages,
                    selectedPeople: ''
                }));
            }
        }
    };
    
    const handleRemovePerson = personId => {
        const person = selectedPeople.find(p => p.id === personId);
        if (person) {
            const updatedSelectedPeople = selectedPeople.filter(p => p.id !== personId);
            setSelectedPeople(updatedSelectedPeople);
            setAvailablePeople([...availablePeople, person]);
    
            if (updatedSelectedPeople.length === 0) {
                setValidationMessages(prevMessages => ({
                    ...prevMessages,
                    selectedPeople: 'Selection required'
                }));
            }
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
                    <label>Name:</label> 
                    {validationMessages.name && <span style={{color: 'red'}}>{validationMessages.name}</span>}
                    <br/>
                    <input name="name" placeholder="Enter a name" value={formData.name} onChange={handleInputChange}/>
                </div>
                <div id="amountInput">
                    <label>Amount:</label>
                    {validationMessages.amount && <span style={{color: 'red'}}>{validationMessages.amount}</span>}
                    <br/>
                    <input name="amount" placeholder="Enter the amount" value={formData.amount} onChange={handleInputChange}/>
                </div>
                <div id="dateInput">
                    <label>Date:</label>
                    {validationMessages.date && <span style={{color: 'red'}}>{validationMessages.date}</span>}
                    <br/>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange}/>
                </div>
                <div id="paid">
                    <label>Payer:</label><br/>
                    {validationMessages.personPaid && <span style={{color: 'red'}}>{validationMessages.personPaid}</span>}
                    <br/>
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
                    <label>Available People:</label>
                    {validationMessages.selectedPeople && <span style={{color: 'red'}}>{validationMessages.selectedPeople}</span>}
                    <br/>
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
                <div className="space-to-scroll"></div>
            </form>
            </div>

            <SplitModal 
                onMethodChange={handleMethodChange} 
                onAmountsChange={handleAmountsChange}
                showModal={showModal} 
                totalAmount={formData.amount} 
                participants={formData.selectedPeople} 
                onClose={() => setShowModal(false)} 
            />

            <Navbar />
        </div>
      )
}

export default AddExpense;