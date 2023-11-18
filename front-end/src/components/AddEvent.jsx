import React, { useState } from "react";
import axios from "axios";

function AddEvent({addEvent, onClose}){
    const[friendsList, setfriendsList] = useState([])
    const[selectedFriends, setselectedFriends] = useState(false)
    const[addImage, setaddImage] = useState([]);
    const[loading, setLoading] = useState(false)
    const[eventData, seteventData] = useState({
        eventName: '',
        eventData: '',
        eventDescription: '',
        members: [],   
    })

    const backupData_friends = {
        "id":1,
        "name":"Gaby Coupar",
        "avatar":"https://robohash.org/temporererumomnis.png?size=50x50\u0026set=set1",
        "phone":"435-715-2899",
        "email":"gcoupar0@rakuten.co.jp"
     }
    

    //fetch mock data about a user's events list
    async function friendsCL(){
        setLoading(true);
        const API_mock_friends = "http://localhost:3001/addEvent";
        try{
            //requesting data from the mock API endpoint
            const response = await axios.get(API_mock_friends);
            //return the data
            setfriendsList(response.data)

        }catch(error){
            console.error("There was an error fetching the data:", error);
            setfriendsList(backupData_friends)
        }
        finally{
            setLoading(false);
        }
    }

    function handleAddImage(){
        console.log("Image URL Added:", addImage)
        setaddImage('')
    }

    return(
        <div className="add-event">
            <div className="add-event-content">
                <span className="close" onClick={onClose}>&times;</span>
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
                            {loading ? <p>Loading...</p> : friendsList && (
                                <div className="friend" key={friendsList.id}>
                                    <img src={friendsList.avatar}></img>
                                    <span>{friendsList.name}</span>
                                </div>
                            )}
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