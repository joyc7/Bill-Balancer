// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require('cors');

const eventRoute = require('./routes/eventRoute');
const addExpenseRoute = require('./routes/addExpenseRoute');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello!")
});

app.use('/event', eventRoute);
app.use('/add-expense', addExpenseRoute);

// export the express app we created to make it available to other modules
module.exports = app;