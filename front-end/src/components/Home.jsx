import React, { useState } from "react";

const Home = () => {
  const [currentSpending, setCurrentSpending] = useState(1000);

  return (
    <div>
      <h2>Current Spending</h2>
      <p>Your current spending: ${currentSpending}</p>
    </div>
  );
};

export default Home;
