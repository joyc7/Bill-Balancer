const express = require("express");
const router = express.Router();

const tripData = {
  id: 1,
  name: "LA Road Trip",
  expenses: [
    { id: 1, name: "Lunch", amount: 358, creator: "Jane", date: "06/16/2023" },
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
    {
      id: 4,
      name: "Dinner",
      amount: 120,
      creator: "David",
      date: "08/02/2023",
    },
    {
      id: 5,
      name: "Souvenirs",
      amount: 570,
      creator: "David",
      date: "08/02/2023",
    },
    { id: 6, name: "Gifts", amount: 200, creator: "David", date: "08/02/2023" },
  ],
  description: "Road trip with friends",
};

const userData = {
  id: 2,
  name: "Jackie",
  email: "jlennarde1@chron.com",
  avatar: "https://robohash.org/adquiearum.png?size=50x50&set=set1",
  friends: [
    { id: 1, name: "Gram" },
    { id: 3, name: "Guglielma" },
    { id: 4, name: "Rayshell" },
    { id: 5, name: "Abram" },
    { id: 6, name: "Tommi" },
    { id: 7, name: "Nicolai" },
  ],
};

// Endpoint to get home data
router.get("/", async (req, res) => {
  res.json(tripData);
});

// Endpoint to get user data with friends
router.get("/", (req, res) => {
  res.json(userData);
});

module.exports = router;
