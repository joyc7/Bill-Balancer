import React, { useEffect, useState } from "react";
import axios from "axios";
import addMemberButton from "../images/addMember.png"; 

function AddEvent({addEvent, onClose}){
    const[friendsList, setfriendsList] = useState([])
    const[selectedFriends, setselectedFriends] = useState(false)
    const[searchQuery, setSearchQuery] = useState('');
    const[searchPerformed, setSearchPerformed] = useState(false);
    const[selectedMember, setselectedMember] = useState([])
    const[loading, setLoading] = useState(false)
    const[eventData, seteventData] = useState({
        eventName: '',
        Date: '',
        Description: '',
        Members: [],   
    })

    const backupData_friends = [{
        "id":1,
        "name":"Gaby Coupar",
        "avatar":"https://robohash.org/temporererumomnis.png?size=50x50\u0026set=set1",
        "phone":"435-715-2899",
        "email":"gcoupar0@rakuten.co.jp"
      }, {
        "id": 2,
        "name": "Andy Gaber",
        "avatar": "https://robohash.org/quaeetcorrupti.png?size=50x50&set=set1",
        "phone":"425-712-2309",
        "email":"gmember0@rakuten.co.jp"
      }]
    
    const handleInputChange =(e) =>{
        const{name, value} = e.target;
        seteventData(prev => ({...prev,[name]:value}))
    }
    const handleAddEvent = async () =>{
        const submitData = {
            eventName: eventData.eventName,
            eventDate: eventData.Date,
            eventDescription: eventData.Description,
            members: selectedMember
        }
        try{
            const response = await axios.post("http://localhost:3001/addEvent")
            console.log(response.data)
        }catch(error){
            seteventData(submitData)
            console.error('Failed to submit event:', error);
        }
    }

    //fetch friends' data for the member list
    async function friendsCL(){
        setLoading(true);
        setSearchPerformed(true);
        const API_mock_friends = "http://localhost:3001/addEventMember";
        try{
            //requesting data from the mock API endpoint
            const response = await axios.get(API_mock_friends);
            //return the data
            setfriendsList(Array.isArray(response.data) ? response.data : [response.data]);

        }catch(error){
            console.error("There was an error fetching the data:", error);
            setfriendsList(backupData_friends)
        }
        finally{
            setLoading(false);
        }
    }

    const handleSearchChange = (e) =>{
        setSearchQuery(e.target.value)
    }
    const filteredFriends = searchQuery?friendsList.filter(friend => friend.name.toLowerCase().includes(searchQuery.toLowerCase())): friendsList;


    const handleSelectedMember = (memberId) =>{
        if(selectedMember.find(member => member.id === memberId)){
            return;
        }
        const member = friendsList.find(p => p.id === memberId)
        if(member){
            setselectedMember([...selectedMember, member]);
        }
    }

    useEffect(()=>{
        seteventData(prev => ({
            ...prev,
            Members:selectedMember
        }));
    },[selectedMember])

    return(
        <div className="add-event">
            <div className="add-event-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={e => {e.handleAddEvent();}}>
                    <div className="EventName">
                        <input 
                            type="text" 
                            placeholder="Event Name" 
                            className="mt-4 block w-full p-2 border border-gray-300 rounded-md"
                            name = "eventName"
                            value={eventData.eventName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="EventDate">
                        <input 
                            type="date" 
                            placeholder="Event Date"
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            name = "Date"
                            onChange={handleInputChange}
                            value={eventData.Date}
                        />
                    </div>
                    <div className="EventDescription">
                        <input 
                            type="text" 
                            placeholder="Event Description"
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            name = "Description"
                            onChange={handleInputChange}
                            value={eventData.Description}
                        />
                    </div>
                   
                </form>
                
                <button className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => {
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
                                onChange={handleSearchChange}    
                            />
                            <button onClick={friendsCL}>Search</button>
                            {loading ? (<p>Loading...</p> 
                            ):  filteredFriends.length>0?(
                                filteredFriends.map(friend =>(
                                    <div className="flex items-center justify-between p-2 friend" key={friend.id}>
                                        <img src={friend.avatar}></img>
                                        <span>{friend.name}</span>
                                        <img
                                            src = {addMemberButton}
                                            alt = "Add Member"
                                            className = "add-Member-Button"
                                            onClick={() =>handleSelectedMember(friend.id)}
                                            style = {{ width: "40px", height: "40px" }}
                                        />
                                    </div>
                                ))
                            ) : searchPerformed?(
                                <p>No Friend Found</p>
                            ): null}
                        </div>
                        <button onClick={() => setselectedFriends(false)}>done</button>
                    </div>
                )}

                <div className="formBtn">
                    <button onClick={() => onClose()}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddEvent;