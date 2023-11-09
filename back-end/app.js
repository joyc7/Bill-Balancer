// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const cors = require("cors");

const eventRoute = require("./routes/eventRoute");
const homeRoute = require("./routes/homeRoute");
const friendsPageRoute = require('./routes/friendsPageRoute'); 
const addFriendRoute = require('./routes/addFriendRoute'); 

app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Hello!")
// })

app.use("/event", eventRoute);
app.use("/home", homeRoute);
app.use('/friends', friendsPageRoute); 
app.use('/addFriends', addFriendRoute); 

// export the express app we created to make it available to other modules
module.exports = app;
