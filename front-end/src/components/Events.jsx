import React, { useState, useEffect } from "react";
import '../styles/Events.css';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Events() {
    const[eventData, setEventData] = useState([])
    const[addEvent, setaddEvent] = useState(false)
    const[friendsList, setfriendsList] = useState([])
    const[selectedFriends, setselectedFriends] = useState(false)
    const[loading, setLoading] = useState(false)
    
    const backupData_events = {"id":1, "name": "Karlotte Flewett", "email": "kflewett0@skyrock.com", "phone": "669-280-7758", 
    "avatar":"https://robohash.org/pariaturipsumculpa.png?size=50x50&set=set1", 
    "events":[{"id":1,"EventName":"Coromoro","Date":"3/12/2023","balance":"$48.03","description":"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.","members":[{"names":"April Gosker"},{"names":"Viva Rilings"}]},
    {"id":2,"EventName":"Kobe","Date":"4/17/2023","balance":"$69.91","description":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.","members":[{"names":"Nisse Kearton"},{"names":"Helen-elizabeth Corpe"},{"names":"Arther Parffrey"}]},
    {"id":3,"EventName":"Ratchathewi","Date":"10/30/2022","balance":"$96.06","description":"Fusce consequat. Nulla nisl. Nunc nisl.","members":[{"names":"Annis Badrick"}]},
    {"id":4,"EventName":"Cuijiamatou","Date":"11/1/2022","balance":"$79.17","description":"In congue. Etiam justo. Etiam pretium iaculis justo.","members":[{"names":"Emyle McGonigal"},{"names":"Gwennie McClory"},{"names":"Arleen Bilson"}]},
    {"id":5,"EventName":"Cotabato","Date":"6/10/2023","balance":"$28.00","description":"Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.","members":[{"names":"Lazaro Atterbury"},{"names":"Harriette Hicks"},{"names":"Cosette Wallsworth"}]},
    {"id":6,"EventName":"Krajan","Date":"4/25/2023","balance":"$37.27","description":"Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.","members":[{"names":"Kevina Birth"},{"names":"Javier Wraight"},{"names":"Sollie Hankinson"}]}]};

    useEffect(()=>{
        //fetch mock data about a user's events list
        async function dataFetch(){
            const API_mock_event = "https://my.api.mockaroo.com/users.json?key=0413d6f0";
            try{
                //requesting data from the mock API endpoint
                const response = await fetch(API_mock_event);

                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                //return the data
                setEventData(data)

            }catch(error){
                console.error("There was an error fetching the data:", error);
                console.log(backupData_events)
                setEventData(backupData_events)
            }
        }
        dataFetch();
    })

    const backupData_friends = {"friends":[{"id":1,"name":"Gaby Coupar","avatar":"https://robohash.org/temporererumomnis.png?size=50x50\u0026set=set1","phone":"435-715-2899","email":"gcoupar0@rakuten.co.jp"}]}

    //fetch mock data about a user's events list
    async function friendsCL(){
        setLoading(true);
        const API_mock_friends = "https://my.api.mockaroo.com/users.json?key=0413d6f0";
        try{
            //requesting data from the mock API endpoint
            const response = await fetch(API_mock_friends);
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            //return the data
            setfriendsList(data)

        }catch(error){
            console.error("There was an error fetching the data:", error);
            setfriendsList(backupData_friends)
        }
        finally{
            setLoading(false);
        }
    }
        
    const totalBalance = eventData && eventData.events && eventData.events.length ? eventData.events.reduce((acc, event) => acc + parseFloat(event.balance.replace('$', '')), 0): 0;
    
    let sortedEvents = [];
    if (eventData.events && eventData.events.length) {
        sortedEvents = eventData.events.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    }
    
    function EventClick(eventId){
        console.log('Event ${eventId} was clicked')
    }
    function friendsClick(friendName){
        if(friendsList.includes(friendName.toString())){
            setfriendsList(prev => prev.filter(name => name !== friendName.toString()));
        }else{
            setfriendsList(prev => [...prev, friendName.toString()]);
        }
    }
    

    return(
        <div className = "Events">
            <h1 className = "title">Events</h1>
            <button className="add_events_button" onClick={() => setaddEvent(true)}>
                Add Events
            </button>

            <div className="Total_Balance_Section">
                <img src={eventData.avatar} alt="User's Avatar" className="Total_Balance_avatar"></img>
                <div>
                    <div className="Total_Balance_title">Total Balance</div>
                    <div className="balance_details">
                        {totalBalance < 0 && (
                            <div> You owe ${Math.abs(totalBalance).toFixed(2)}</div>
                        )}
                        {totalBalance > 0 && (
                            <div> You are owed ${totalBalance.toFixed(2)}</div>
                        )}
                        {totalBalance === 0 && (
                            <div> All Balances are Settled!</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="events_list">
                <ul>
                    {eventData && eventData.events && sortedEvents.map(event =>(
                        <li key = {event.id} className="event-list">
                            <span>{event.EventName}</span>
                            <Link to='/event'>
                            <button onClick={() => EventClick(event.id)}>View Event</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {addEvent && (
                <div className="add-event">
                    <div className="add-event-content">
                        <span className="close" onClick={() => setaddEvent(false)}>&times;</span>
                        <h2>Add Event</h2>
                        <input type="text" placeholder="Event Name" />
                        <input type="date" placeholder="Event Date"/>
                        <input type="text" placeholder="Event Description"/>
                        <button onClick={() => {
                            setselectedFriends(true)
                        }}
                        >
                            Select Members
                        </button>
                        {selectedFriends && (
                            <div className="select-members-popup">
                                <div className="select-members-content">
                                    <span className="close" onClick={() => setselectedFriends(false)}>&times;</span>
                                    <input 
                                        type="text" 
                                        placeholder="Member's Name" 
                                        className="member-name"     
                                    />
                                    <button onClick={friendsCL}>Search</button>
                                    {loading && friendsList && friendsList.friends && friendsList.friends.map(friend => (
                                        <div className="friend" key={friend.name}>
                                            <img src={friend.avatar} alt={`&{friend.name}'s avatar`}></img>
                                            <span>{friend.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => {
                                        setselectedFriends(false)
                                        }}
                                >
                                        done
                                </button>
                            </div>
                        )}
                        <div className="formBtn">
                            <button onClick={() => {setaddEvent(false)}}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            <Navbar/>

        </div>
    )
}

export default Events