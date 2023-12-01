import React, { useState, useEffect } from "react";
import '../styles/Events.css';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import AddEvent from "./AddEvent";
import EventsFilter from "../images/filter.png"; 
import { jwtDecode } from "jwt-decode";

function Events({ isDarkMode }) {
    const[eventData, setEventData] = useState([])
    const[addEvent, setaddEvent] = useState(false)
    const[showFilter, setShowFilter] = useState(false);
    const[selectedFilter, setSelectedFilter] = useState('all');
    const[filteredEvents, setFilteredEvents] = useState([]);
    
    function reformatDate(dateStr) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateStr);
      
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
    
        return `${monthName} ${day} ${year}`;
    }

    const backupData_events = 
    {
        "id":1, 
        "username": "Karlotte Flewett", 
        "email": "kflewett0@skyrock.com", 
        //"phone": "669-280-7758", 
        "avatar":"https://robohash.org/pariaturipsumculpa.png?size=50x50&set=set1", 
        "events":[
            {"id":1,
            "name":"Coromoro Trip",
            "date":"3/12/2023",
            //"balance":"$48.03",
            "description":"March Break trip to Coromoro with two friends",
            "participants":[
                {"names":"April Gosker"},
                {"names":"Viva Rilings"}],
            "expenses":[]
            },
            {"id":2,
            "name":"Kobe",
            "date":"4/17/2023",
            //"balance":"$-69.91",
            "description":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
            "participants":[
                {"names":"Nisse Kearton"},
                {"names":"Helen-elizabeth Corpe"},
                {"names":"Arther Parffrey"}],
            "expenses":[]
            },
            {"id":3,
            "name":"Ratchathewi",
            "date":"10/30/2022",
            //"balance":"$96.06",
            "description":"Fusce consequat. Nulla nisl. Nunc nisl.",
            "participants":[
                {"names":"Annis Badrick"}],
            "expenses": []
            },
            {"id":4,
            "name":"Cuijiamatou",
            "date":"11/1/2022",
            //"balance":"$79.17",
            "description":"In congue. Etiam justo. Etiam pretium iaculis justo.",
            "participants":[
                {"names":"Emyle McGonigal"},
                {"names":"Gwennie McClory"},
                {"names":"Arleen Bilson"}],
            "expenses": []
            },
            {"id":5,
            "name":"Cotabato",
            "date":"6/10/2023",
            //"balance":"$0.00",
            "description":"Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
            "participants":[
                {"names":"Lazaro Atterbury"},
                {"names":"Harriette Hicks"},
                {"names":"Cosette Wallsworth"}],
            "expenses": []
            },
            {"id":6,
            "name":"Krajan",
            "date":"04/25/2023",
            //"balance":"$37.27",
            "description":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
            "participants":[{"names":"Kevina Birth"},
            {"names":"Javier Wraight"},
            {"names":"Sollie Hankinson"}],
            "expenses": []
        }]
    }

        // Toggle the 'body-dark-mode' class on the body element
    useEffect(() => {
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

    useEffect(()=>{
        //fetch mock data about a user's events list
        async function dataFetch(){ 
            try{
                const token = localStorage.getItem("token");
                const decode = jwtDecode(token);
                if (!decode || !decode.id) {
                    console.error("No current user found in local storage.");
                    return;
                } else {
                    console.log(decode.id);
                }
                //requesting data from the mock API endpoint
                const response = await axios.get(`http://localhost:3001/events/for/${decode.id}`);
                console.log(response)
                //return the data
                setEventData(response.data)

            }catch(error){
                console.error("There was an error fetching the data:", error);
                console.log(backupData_events)
                setEventData(backupData_events)
            }
        }
        dataFetch();
    },[]);

    /*
    let clearedEvents = [];
    let otherEvents = [];
    if (eventData.events && eventData.events.length){
        eventData.events.forEach(event => {
            const eventBalance = parseFloat(event.balance.replace('$', '')) 
            if(eventBalance === 0){
                clearedEvents.push(event);
            }else{
                otherEvents.push(event);
            }
        });
    }

    useEffect(() => {
        let filtered = [];
        if (eventData.events) {
            switch (selectedFilter) {
                case 'owe':
                    filtered = eventData.events.filter(event => parseFloat(event.balance.replace('$', '')) < 0);
                    break;
                case 'owed':
                    filtered = eventData.events.filter(event => parseFloat(event.balance.replace('$', '')) > 0);
                    break;
                case 'cleared':
                    filtered = eventData.events.filter(event => parseFloat(event.balance.replace('$', '')) === 0);
                    break;
                case 'all':
                default:
                    filtered = eventData.events;
                    break;
            }
        }
        setFilteredEvents(filtered);
    }, [selectedFilter, eventData.events]);

    const handleFilterChange = (newFilter) => {
        setSelectedFilter(newFilter.target.value);
        setShowFilter(false); // Hide filter options
    };

    const handleDropdownClick = (event) =>{
        event.stopPropagation();
    }

    const totalOwed = eventData && eventData.events && eventData.events.length 
    ? eventData.events.reduce((acc, event) => {
        const balance = parseFloat(event.balance.replace('$', ''));
        return balance < 0 ? acc + balance : acc;
    }, 0) 
    : 0;

    const totalOwedToYou = eventData && eventData.events && eventData.events.length 
    ? eventData.events.reduce((acc, event) => {
        const balance = parseFloat(event.balance.replace('$', ''));
        return balance > 0 ? acc + balance : acc;
    }, 0) 
    : 0;

    //const totalBalance = eventData && eventData.events && eventData.events.length ? eventData.events.reduce((acc, event) => acc + parseFloat(event.balance.replace('$', '')), 0): 0;
    
    let sortedEvents = [];
    if (eventData.events && eventData.events.length) {
        sortedEvents = eventData.events.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    */
   
    function EventClick(eventId){
        console.log(`Event ${eventId} was clicked`)
    }
    

    return(
        <div className = "Events">
            <h1 className = "title">Events</h1>
            <button className="add_events_button" onClick={() => setaddEvent(true)}>
                Add Events
            </button>

{/* total balance Section + Filter Icon

            <div className="Total_Balance_Section">
                <img src={eventData.avatar} alt="User's Avatar" className="Total_Balance_avatar"></img>
                <div>
                    <div className="Total_Balance_title">Total Balance</div>
                    <div className="balance_details">
                        {totalOwed < 0 && (
                            <div> You owe ${Math.abs(totalOwed).toFixed(2)}</div>
                        )}
                        {totalOwedToYou > 0 && (
                            <div> You are owed ${totalOwedToYou.toFixed(2)}</div>
                        )}
                        {totalOwed === 0 && totalOwedToYou === 0 && (
                            <div> All Balances are Settled!</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="filter-icon" onClick={() => setShowFilter(!showFilter)}>
                <img 
                    src={EventsFilter}
                    alt="EventsList"
                    className="EventsFilter"
                    style={{ width: "25px", height: "25px"}}
                />
                 {showFilter && (
                    <select 
                        className="filter-menu" 
                        onChange={handleFilterChange} 
                        onClick={handleDropdownClick}
                        value = {selectedFilter}
                    >
                        <option value="all">All Events</option>
                        <option value="cleared">Cleared</option>
                        <option value="owe">I Owe</option>
                        <option value="owed">Owed To Me</option>
                    </select>
                )} <s></s>
            </div>

                 */}

{/*
            <div className="events-list">
                <ul>
                    {filteredEvents.map(event =>(
                        <li key = {event.id} className="event-list">
                            <div className="Event-date">
                                {reformatDate(event.date)}
                            </div>
                            <div className="Event-name" style={{ marginBottom: '5px' }}>
                                <span>{event.name}</span>
                            </div>
                            <Link to='/event'>
                            <button onClick={() => EventClick(event.id)}>View Event</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            */}

            <div className="events-list">
                <ul>
                    {eventData.events && eventData.events.map(event =>(
                        <li key = {event._id} className="event-list">
                            <div className="Event-date">
                                {reformatDate(event.date)}
                            </div>
                            <div className="Event-name" style={{ marginBottom: '5px' }}>
                                <span>{event.name}</span>
                            </div>
                            <Link to={`/event/${event._id}`}>
                            <button onClick={() => EventClick(event.id)}>View Event</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>


            {addEvent && (
                <AddEvent addEvent = {addEvent} onClose={() => {setaddEvent(false); window.location.reload();}} />
            )}
            <div className="navbar-placeholder" style={{ height: '4rem' }}></div>
            <div className="mt-6"><Navbar/></div>

        </div>
    )
}

export default Events