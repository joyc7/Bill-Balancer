import React, { useState } from "react";
import "../styles/Home.css";

const Home = () => {
  const [totalSpending, setTotalSpending] = useState(1000);

  return (
    <div className="home-container">
      <div className="box">
        <h2 className="total-spending">Total Spending</h2>
        <p className="home-money">${totalSpending}</p>
      </div>
      <div className="box">
        <h2>Groups</h2>
      </div>
    </div>
  );
};

export default Home;
