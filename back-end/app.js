// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object

// we will put some server logic here later...

app.get("/", (req, res) => {
    res.send("Hello!")
})

app.get("/event", async (req, res) => {
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

// export the express app we created to make it available to other modules
module.exports = app