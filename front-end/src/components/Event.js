import axios from "axios"
import React, { useState, useEffect } from "react"
import '../styles/Event.css';
import { Link } from "react-router-dom";

const Event = props => {

    const [data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    // handle the form
    const handleAddExpense = () => {
      setIsModalOpen(false);
    };

    function reformatDate(dateStr) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const date = new Date(dateStr);
    
      const monthName = months[date.getMonth()];
      const day = date.getDate();
    
      return `${monthName} ${day}`;
    }

    useEffect(() => {
        // fetch some mock data about expense 
        console.log("fetching the event")
        axios("https://my.api.mockaroo.com/event/123.json?key=483e37e0")
          .then(response => {
            // extract the data from the server response
            setData(response.data)
          })
          .catch(err => {
            console.log(`Sorry, buster.  No more requests allowed today!`)
            console.error(err) 
    
            // make some backup fake data
            const backupData = {
                id: 1,
                name: "LA Road Trip",
                expenses: [
                  {"id":1,
                  "name":"Dinner",
                  "amount":358,
                  "creator":"Jane",
                  "date":"06/16/2023"},
                  {"id":2,
                  "name":"Flights to LA",
                  "amount":261,
                  "creator":"Tom",
                  "date":"01/21/2023"},
                  {"id":3,
                  "name":"Hotels",
                  "amount":170,
                  "creator":"David",
                  "date":"08/02/2023"}],
                description: "Road trip with friends",
            }
            
            setData(backupData)
          })
      }, []) 

      return (
        <div id="event-page">
            <header>
                <h2><Link to='events'>Events</Link>|{data.name}</h2>
            </header>

            <section className="description">
              <p>{data.description}</p>
            </section>
            
            <section className="operations">
              {/* to see the remaining unsettled balance */}
              <button>Balance</button>
              {/* to see the history of all bill/transaction */}
              <button>Total</button>
            </section>

            <section className="expenses">
              {data.expenses && data.expenses.map(item => (
                <div className="expenseItem" key={item.id}>
                  <div className="date">{reformatDate(item.date)}</div>
                  <div className="name">
                    <Link to='/expense'>
                      <div>{item.name}</div>
                    </Link>
                  </div>
                  <div className="amount">${item.amount}</div>
                  <div className="checkbox"><input type="checkbox" name={item.id} /></div>
                </div>
              ))}
            </section>

            <button className="addExpenseBtn" onClick={() => setIsModalOpen(true)}>Add Expense</button>
            {isModalOpen && (
              <div id="addExpense">
                <h2>Add New Expense</h2>
                <form onSubmit={e => { e.preventDefault(); handleAddExpense(); }}>
                  <div id="nameInput">
                    <label>Name:</label><br/>
                    <input name="name" placeholder="Enter a name"/>
                  </div>
                  <div id="amountInput">
                    <label>Amount:</label><br/>
                    <input name="amount" placeholder="Enter the amount"/>
                  </div>
                  <div id="dateInput">
                    <label>Date:</label><br/>
                    <input type="date" name="date"/>
                  </div>
                  <div id="selectInput">
                    <label for="people">Select people:</label><br/>
                    <select name="people" multiple size="5">
                        
                    </select>
                  </div>
                  <div className="formBtn">
                    <button type="submit">Submit</button>
                    <button onClick={() => {setIsModalOpen(false)}}>Close</button>
                  </div>
                </form>
              </div>
            )}

        </div>
      )

}

export default Event;