import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios("https://my.api.mockaroo.com/users.json?key=0aec1ff0")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(`Sorry, buster. No more requests allowed today!`);
        console.error(err);

        const backupData = {
          id: 1,
          first_name: "Leslie",
          last_name: "Woodman",
          total_spending: "$1250",
        };
        setUserData(backupData);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="box">
        <h2 className="total-spending">Total Spending:</h2>
        <h2>{userData.total_spending}</h2>
      </div>
      <div className="box">
        <h2>Groups</h2>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
