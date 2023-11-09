const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    // assemble an object with the data we want to send
    const body = {
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
    };
    // send the response as JSON to the client
    res.json(body);
  });

module.exports = router;