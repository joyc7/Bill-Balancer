import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/Event.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Event = (props) => {
  const [data, setData] = useState([]);
  const isDarkMode = props.isDarkMode;
  const { eventId } = useParams();
  console.log("Event ID:", eventId); // check the eventID received

  function reformatDate(dateStr) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateStr);

    const monthName = months[date.getMonth()];
    const day = date.getDate();

    return `${monthName} ${day}`;
  }

  // This effect runs when the `isDarkMode` value changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("body-dark-mode");
    } else {
      document.body.classList.remove("body-dark-mode");
    }
    // if not in dark mode, remove this effect
    return () => {
      document.body.classList.remove("body-dark-mode");
    };
  }, [isDarkMode]);

  useEffect(() => {
    // fetch some mock data about expense
    console.log("fetching the event");
    const fetchEvent = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3001/event/${eventId}`
        );
        setData(result.data);
        console.log(result.data);
      } catch (err) {
        console.error(err);

        // make some backup fake data
        const backupData = {
          id: 2,
          name: "LA Road Trip",
          expenses: [
            {
              id: 1,
              name: "Lunch",
              amount: 358,
              creator: "Jane",
              date: "06/16/2023",
            },
            {
              id: 2,
              name: "Flights to LA",
              amount: 261,
              creator: "Tom",
              date: "01/21/2023",
            },
            {
              id: 3,
              name: "Hotels",
              amount: 170,
              creator: "David",
              date: "08/02/2023",
            },
          ],
          description: "Road trip with friends",
        };

        setData(backupData);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="event-page-container">
      {" "}
      {/* add this container to control the dark mode between the outtermost backgroud and the section box*/}
      <div id="event-page">
        <header>
          <h2>
            <Link to="/events">Events</Link>|{data.name}
          </h2>
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
          {data.expenses &&
            data.expenses.map((item) => (
              <div className="expenseItem" key={item._id}>
                <div className="date">{reformatDate(item.date)}</div>
                <div className="name">
                  <Link to={`/expense/${item._id}`}>
                    <div>{item.name}</div>
                  </Link>
                </div>
                <div className="amount">${item.totalAmount}</div>
                <div className="checkbox">
                  <input type="checkbox" name={item.id} />
                </div>
              </div>
            ))}
        </section>

        <div className="addExpenseBtnDiv">
          <Link to={`/add-expense/${eventId}`} className="btn addExpenseBtn"> {/* <Link to="/add-expense" className="btn addExpenseBtn"> */}
            Add Expense
          </Link>
        </div>

        <div className="space-to-scroll"></div>

        <Navbar />
      </div>
    </div>
  );
};

export default Event;
