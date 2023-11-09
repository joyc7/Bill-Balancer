// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const cors = require("cors");

const eventRoute = require("./routes/eventRoute");
const homeRoute = require("./routes/homeRoute");
const FriendsPageRoute = require('./routes/FriendsPageRoute'); 
const AddFriendRoute = require('./routes/AddFriendRoute'); 

app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Hello!")
// })

app.use("/event", eventRoute);
app.use("/home", homeRoute);
app.use('/friends', FriendsPageRoute); 
app.use('/addFriends', AddFriendRoute); 

// export the express app we created to make it available to other modules
module.exports = app;
